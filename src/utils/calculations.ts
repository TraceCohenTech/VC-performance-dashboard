import type {
  FundRow,
  DerivedFundRow,
  PerfRegime,
  MacroRegime,
  FirmSummary,
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
