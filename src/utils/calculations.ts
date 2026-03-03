import type {
  FundRow,
  DerivedFundRow,
  PerfRegime,
  MacroRegime,
  FirmSummary,
  JCurvePoint,
  JCurveResult,
  WaterfallRow,
} from "../types";

const CURRENT_YEAR = 2026;

export function performanceRegime(netTVPI: number | null): PerfRegime {
  if (netTVPI == null) return "Unknown";
  if (netTVPI >= 5) return "Generational (5x+)";
  if (netTVPI >= 3) return "Strong (3-5x)";
  if (netTVPI >= 2) return "Institutional (2-3x)";
  if (netTVPI >= 1) return "Capital Preservation (1-2x)";
  return "Value Destruction (<1x)";
}

export function macroRegime(vintage: number): MacroRegime {
  if (vintage >= 2022) return "Rate Reset";
  if (vintage >= 2019) return "ZIRP Bubble";
  if (vintage >= 2013) return "SaaS Expansion";
  if (vintage >= 2009) return "Post-GFC Recovery";
  return "Pre-2009 / Other";
}

export function deriveFundRows(rows: FundRow[]): DerivedFundRow[] {
  return rows.map((r) => {
    const age = CURRENT_YEAR - r.vintage;
    const alphaPerBillion =
      r.netTVPI != null && r.fundSizeUSDm != null && r.fundSizeUSDm > 0
        ? r.netTVPI / (r.fundSizeUSDm / 1000)
        : null;
    const dpiRatio =
      r.netDPI != null && r.netTVPI != null && r.netTVPI > 0
        ? r.netDPI / r.netTVPI
        : null;
    return {
      ...r,
      age,
      alphaPerBillion,
      dpiRatio,
      performanceRegime: performanceRegime(r.netTVPI),
      macroRegime: macroRegime(r.vintage),
    };
  });
}

function nums(arr: (number | null | undefined)[]): number[] {
  return arr.filter((v): v is number => v != null);
}

export function mean(arr: (number | null | undefined)[]): number | null {
  const valid = nums(arr);
  if (valid.length === 0) return null;
  return valid.reduce((s, v) => s + v, 0) / valid.length;
}

export function median(arr: (number | null | undefined)[]): number | null {
  const valid = nums(arr).sort((a, b) => a - b);
  if (valid.length === 0) return null;
  const mid = Math.floor(valid.length / 2);
  return valid.length % 2 === 0
    ? (valid[mid - 1] + valid[mid]) / 2
    : valid[mid];
}

export function modePerformanceRegime(rows: DerivedFundRow[]): PerfRegime {
  const counts = new Map<PerfRegime, number>();
  for (const r of rows) {
    counts.set(r.performanceRegime, (counts.get(r.performanceRegime) || 0) + 1);
  }
  let best: PerfRegime = "Unknown";
  let bestCount = 0;
  for (const [regime, count] of counts) {
    if (count > bestCount) {
      best = regime;
      bestCount = count;
    }
  }
  return best;
}

export function computeFirmSummary(rows: DerivedFundRow[]): FirmSummary[] {
  const byFirm = new Map<string, DerivedFundRow[]>();
  for (const r of rows) {
    const arr = byFirm.get(r.firm) || [];
    arr.push(r);
    byFirm.set(r.firm, arr);
  }
  return Array.from(byFirm.entries()).map(([firm, funds]) => ({
    firm,
    fundCount: funds.length,
    totalCapitalM: funds.reduce((s, f) => s + (f.fundSizeUSDm || 0), 0),
    avgNetTVPI: mean(funds.map((f) => f.netTVPI)),
    medianNetTVPI: median(funds.map((f) => f.netTVPI)),
    avgDPI: mean(funds.map((f) => f.netDPI)),
    avgIRR: mean(funds.map((f) => f.irrToLP)),
    topRegime: modePerformanceRegime(funds),
  }));
}

export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

/* ── J-Curve simulation ────────────────────────────────────── */

export function simulateJCurve(
  row: DerivedFundRow,
  noReturnYears: number
): JCurveResult | null {
  if (row.fundSizeUSDm == null || row.netTVPI == null) return null;

  const committed = row.fundSizeUSDm;
  const fundLife = Math.max(10, row.age ?? 10);
  const feeYears = Math.min(fundLife, 10);
  const totalFees = 0.02 * committed * feeYears;
  const annualFee = 0.02 * committed;
  const finalTVPI = row.netTVPI;
  const dpi = row.netDPI ?? 0;

  const curve: JCurvePoint[] = [];
  let totalCalled = 0;
  let totalDistributions = 0;

  for (let y = 0; y <= fundLife; y++) {
    // Capital calls: evenly over years 0-2
    let callThisYear = 0;
    if (y <= 2) {
      callThisYear = committed / 3;
    }
    totalCalled += callThisYear;

    // Fee deducted from calls
    const netInvestedCumulative = totalCalled - Math.min(totalFees, annualFee * Math.min(y + 1, feeYears));

    // NAV: no appreciation until noReturnYears, then ramp to final value
    let nav: number;
    const depressedNAV = netInvestedCumulative * 0.85; // fees drag NAV below invested
    const finalNAV = finalTVPI * committed - dpi * committed; // NAV portion of final value

    if (y <= noReturnYears) {
      // Linear sag during no-return period
      const progress = y / noReturnYears;
      nav = depressedNAV * (0.7 + 0.3 * progress);
    } else {
      // Ramp from depressed to final NAV
      const rampYears = fundLife - noReturnYears;
      const rampProgress = rampYears > 0 ? (y - noReturnYears) / rampYears : 1;
      nav = depressedNAV + (Math.max(0, finalNAV) - depressedNAV) * rampProgress;
    }

    // Distributions ramp from noReturnYears to fundLife
    if (y > noReturnYears && dpi > 0) {
      const distRampYears = fundLife - noReturnYears;
      const distProgress = distRampYears > 0 ? (y - noReturnYears) / distRampYears : 1;
      totalDistributions = dpi * committed * distProgress;
    }

    const netMultiple = totalCalled > 0
      ? (nav + totalDistributions) / totalCalled
      : 0;

    curve.push({ year: y, netMultiple: Math.round(netMultiple * 100) / 100 });
  }

  // Snap final year to actual TVPI
  if (curve.length > 0) {
    curve[curve.length - 1].netMultiple = Math.round(finalTVPI * 100) / 100;
  }

  return {
    label: row.fundName,
    firm: row.firm,
    finalTVPI,
    curve,
  };
}

/* ── Waterfall (LP/GP economics) ───────────────────────────── */

export function computeWaterfall(row: DerivedFundRow): WaterfallRow | null {
  if (row.fundSizeUSDm == null || row.netTVPI == null) return null;

  const committed = row.fundSizeUSDm;
  const fundLife = Math.min(Math.max(row.age ?? 10, 5), 10);
  const managementFees = 0.02 * committed * fundLife;
  const investedCapital = committed - managementFees;
  const totalValue = row.netTVPI * committed;
  const returnOfCapital = Math.min(totalValue, committed);
  const profit = Math.max(0, totalValue - committed);
  const gpCarry = profit * 0.20;
  const lpProfit = profit * 0.80;
  const lpTotal = returnOfCapital + lpProfit;
  const gpTotal = gpCarry + managementFees;
  const gpTakePercent = (totalValue + managementFees) > 0
    ? gpTotal / (totalValue + managementFees)
    : 0;

  return {
    label: row.fundName,
    firm: row.firm,
    committed,
    managementFees,
    investedCapital,
    totalValue,
    returnOfCapital,
    lpProfit,
    gpCarry,
    lpTotal,
    gpTotal,
    gpTakePercent,
  };
}

export function computeFirmWaterfall(rows: DerivedFundRow[]): WaterfallRow[] {
  const byFirm = new Map<string, WaterfallRow[]>();
  for (const r of rows) {
    const w = computeWaterfall(r);
    if (!w) continue;
    const arr = byFirm.get(r.firm) || [];
    arr.push(w);
    byFirm.set(r.firm, arr);
  }

  return Array.from(byFirm.entries()).map(([firm, funds]) => {
    const sum = (fn: (w: WaterfallRow) => number) =>
      funds.reduce((s, f) => s + fn(f), 0);

    const committed = sum((f) => f.committed);
    const managementFees = sum((f) => f.managementFees);
    const investedCapital = sum((f) => f.investedCapital);
    const totalValue = sum((f) => f.totalValue);
    const returnOfCapital = sum((f) => f.returnOfCapital);
    const lpProfit = sum((f) => f.lpProfit);
    const gpCarry = sum((f) => f.gpCarry);
    const lpTotal = sum((f) => f.lpTotal);
    const gpTotal = sum((f) => f.gpTotal);
    const gpTakePercent = (totalValue + managementFees) > 0
      ? gpTotal / (totalValue + managementFees)
      : 0;

    return {
      label: firm,
      firm,
      committed,
      managementFees,
      investedCapital,
      totalValue,
      returnOfCapital,
      lpProfit,
      gpCarry,
      lpTotal,
      gpTotal,
      gpTakePercent,
    };
  });
}
