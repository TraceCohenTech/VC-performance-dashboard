import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DerivedFundRow, WaterfallRow } from "../types";
import { computeWaterfall, computeFirmWaterfall } from "../utils/calculations";
import { fmtUSDm } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

export default function WaterfallChart({ rows }: Props) {
  const [viewMode, setViewMode] = useState<"firm" | "fund">("firm");
  const [showFees, setShowFees] = useState(false);

  const fundRows = useMemo(() => {
    return rows
      .map((r) => computeWaterfall(r))
      .filter((w): w is WaterfallRow => w !== null)
      .sort((a, b) => b.totalValue - a.totalValue);
  }, [rows]);

  const firmRows = useMemo(() => {
    return computeFirmWaterfall(rows).sort(
      (a, b) => b.totalValue - a.totalValue
    );
  }, [rows]);

  const data = viewMode === "firm" ? firmRows : fundRows;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        LP/GP Economics Waterfall
      </h3>
      <p className="text-xs text-slate-500 mb-1">
        How fund profits split between LPs and GPs — return of capital first,
        then 80/20 profit share above 1x.
      </p>
      <p className="text-[11px] text-slate-400 mb-4">
        GPs earn 2% annual management fees from committed capital regardless of
        performance, plus 20% carry on profits above 1x return. A 0.8x fund
        still pays ~20% in fees.
      </p>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {/* Firm / Fund toggle */}
        <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden">
          <button
            onClick={() => setViewMode("firm")}
            className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
              viewMode === "firm"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            By Firm
          </button>
          <button
            onClick={() => setViewMode("fund")}
            className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
              viewMode === "fund"
                ? "bg-slate-900 text-white"
                : "bg-white text-slate-500 hover:bg-slate-50"
            }`}
          >
            By Fund
          </button>
        </div>

        {/* Show fees toggle */}
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={showFees}
            onChange={(e) => setShowFees(e.target.checked)}
            className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
          />
          <span className="text-[11px] text-slate-500">Show Mgmt Fees</span>
        </label>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
            interval={0}
            angle={viewMode === "fund" ? -35 : 0}
            textAnchor={viewMode === "fund" ? "end" : "middle"}
            height={viewMode === "fund" ? 70 : 30}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => fmtUSDm(v)}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0]?.payload as WaterfallRow;
              if (!d) return null;
              return (
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
                  <p className="font-semibold text-slate-900">{d.label}</p>
                  <p className="text-slate-500 mb-1">
                    Committed: {fmtUSDm(d.committed)}
                  </p>
                  <div className="space-y-0.5 text-slate-600">
                    <p>
                      <span className="inline-block w-2 h-2 rounded-sm bg-slate-400 mr-1" />
                      Return of Capital: {fmtUSDm(d.returnOfCapital)}
                    </p>
                    <p>
                      <span className="inline-block w-2 h-2 rounded-sm bg-emerald-500 mr-1" />
                      LP Profit: {fmtUSDm(d.lpProfit)}
                    </p>
                    <p>
                      <span className="inline-block w-2 h-2 rounded-sm bg-amber-500 mr-1" />
                      GP Carry: {fmtUSDm(d.gpCarry)}
                    </p>
                    {showFees && (
                      <p>
                        <span className="inline-block w-2 h-2 rounded-sm bg-red-500 mr-1" />
                        Mgmt Fees: {fmtUSDm(d.managementFees)}
                      </p>
                    )}
                    <p className="pt-1 border-t border-slate-100 font-medium text-slate-800">
                      GP Total Take: {(d.gpTakePercent * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
          />
          <Bar
            dataKey="returnOfCapital"
            name="Return of Capital"
            stackId="stack"
            fill="#94a3b8"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="lpProfit"
            name="LP Profit"
            stackId="stack"
            fill="#10b981"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="gpCarry"
            name="GP Carry"
            stackId="stack"
            fill="#f59e0b"
            radius={[2, 2, 0, 0]}
          />
          {showFees && (
            <Bar
              dataKey="managementFees"
              name="Mgmt Fees"
              stackId="stack"
              fill="#ef4444"
              radius={[2, 2, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>

      <div className="chart-insight">
        <strong>Insight:</strong> Even on sub-1x funds, GPs collect ~20% of
        committed capital in management fees. Toggle "Show Mgmt Fees" to see the
        full GP economics — on a 0.8x fund, the GP still earns while LPs lose
        money.
      </div>
    </motion.div>
  );
}
