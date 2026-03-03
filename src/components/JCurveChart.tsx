import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";
import type { DerivedFundRow } from "../types";
import type { JCurveResult } from "../types";
import { simulateJCurve, mean } from "../utils/calculations";
import { FIRM_COLORS } from "./chartColors";
import { fmtX } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

const NO_RETURN_OPTIONS = [5, 7, 10] as const;

export default function JCurveChart({ rows }: Props) {
  const [noReturnYears, setNoReturnYears] = useState<number>(7);
  const [showFirmAvg, setShowFirmAvg] = useState(false);

  // Simulate all valid funds
  const allCurves = useMemo(() => {
    return rows
      .map((r) => simulateJCurve(r, noReturnYears))
      .filter((c): c is JCurveResult => c !== null);
  }, [rows, noReturnYears]);

  // Firm-averaged curves
  const firmCurves = useMemo(() => {
    const byFirm = new Map<string, JCurveResult[]>();
    for (const c of allCurves) {
      const arr = byFirm.get(c.firm) || [];
      arr.push(c);
      byFirm.set(c.firm, arr);
    }

    return Array.from(byFirm.entries()).map(([firm, curves]) => {
      // Find max year across all curves for this firm
      const maxYear = Math.max(...curves.map((c) => c.curve.length - 1));
      const avgCurve: { year: number; netMultiple: number }[] = [];

      for (let y = 0; y <= maxYear; y++) {
        const multiples = curves
          .filter((c) => y < c.curve.length)
          .map((c) => c.curve[y].netMultiple);
        const avg = mean(multiples);
        if (avg != null) {
          avgCurve.push({ year: y, netMultiple: Math.round(avg * 100) / 100 });
        }
      }

      return {
        firm,
        label: firm,
        finalTVPI: mean(curves.map((c) => c.finalTVPI)) ?? 0,
        curve: avgCurve,
      };
    });
  }, [allCurves]);

  const displayCurves = showFirmAvg ? firmCurves : allCurves;

  // Build unified dataset: each row = { year, firm1: val, firm2: val, ... }
  const chartData = useMemo(() => {
    const maxYear = Math.max(...displayCurves.map((c) => c.curve.length - 1), 0);
    const data: Record<string, number>[] = [];

    for (let y = 0; y <= maxYear; y++) {
      const point: Record<string, number> = { year: y };
      for (const c of displayCurves) {
        if (y < c.curve.length) {
          point[c.label] = c.curve[y].netMultiple;
        }
      }
      data.push(point);
    }
    return data;
  }, [displayCurves]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        J-Curve Simulation
      </h3>
      <p className="text-xs text-slate-500 mb-1">
        Simulated net multiple to LPs over time — showing how management fees
        erode value early before returns compound.
      </p>
      <p className="text-[11px] text-slate-400 mb-4">
        LPs commit $100M but ~20% goes to fees. Early years show multiples below
        1.0x as capital is called but not yet returning. The "no-return period"
        controls how long before appreciation kicks in.
      </p>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {/* No-return period toggle */}
        <div className="flex items-center gap-1">
          <span className="text-[11px] text-slate-500 mr-1">No-return:</span>
          <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden">
            {NO_RETURN_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setNoReturnYears(n)}
                className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  noReturnYears === n
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {n}yr
              </button>
            ))}
          </div>
        </div>

        {/* Firm average toggle */}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showFirmAvg}
            onChange={(e) => setShowFirmAvg(e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          <span className="text-[11px] text-slate-500">
            Average by firm
          </span>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="year"
            type="number"
            domain={[0, "dataMax"]}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            label={{
              value: "Fund Year",
              position: "insideBottom",
              offset: -5,
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => `${v.toFixed(1)}x`}
            domain={[0, "auto"]}
          />
          <ReferenceLine
            y={1}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            label={{
              value: "Breakeven",
              position: "insideTopRight",
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <Tooltip
            content={({ payload, label }) => {
              if (!payload?.length) return null;
              return (
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs max-w-[220px]">
                  <p className="font-semibold text-slate-900 mb-1">
                    Year {label}
                  </p>
                  {payload.map((entry) => (
                    <p key={entry.dataKey as string} className="text-slate-600">
                      <span
                        className="inline-block w-2 h-2 rounded-full mr-1"
                        style={{ backgroundColor: entry.color }}
                      />
                      {entry.dataKey}: {fmtX(entry.value as number)}
                    </p>
                  ))}
                </div>
              );
            }}
          />
          {showFirmAvg && (
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
            />
          )}
          {displayCurves.map((c) => (
            <Line
              key={c.label}
              type="monotone"
              dataKey={c.label}
              stroke={FIRM_COLORS[c.firm] || "#94a3b8"}
              strokeWidth={showFirmAvg ? 2 : 1.5}
              strokeOpacity={showFirmAvg ? 1 : 0.7}
              dot={false}
              activeDot={{ r: 4 }}
              connectNulls
            />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div className="chart-insight">
        <strong>Insight:</strong> Management fees drag LP multiples below 1.0x
        for the first 3–5 years. Top-performing firms like Founders Fund and
        Thrive break even faster, while Tiger Global's 0.8x fund never recovers
        past breakeven.
      </div>
    </motion.div>
  );
}
