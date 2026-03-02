import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import type { DerivedFundRow } from "../types";
import { FIRM_COLORS } from "./chartColors";
import { mean } from "../utils/calculations";
import { fmtX } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

export default function CreativeIdeas({ rows }: Props) {
  const [expanded, setExpanded] = useState(false);

  // Alpha Decay: fund sequence per firm
  const firmFunds = new Map<string, DerivedFundRow[]>();
  for (const r of rows) {
    const arr = firmFunds.get(r.firm) || [];
    arr.push(r);
    firmFunds.set(r.firm, arr);
  }

  const alphaDecayData: { firm: string; seq: number; netTVPI: number; fundName: string }[] = [];
  for (const [firm, funds] of firmFunds) {
    const sorted = [...funds].sort((a, b) => a.vintage - b.vintage);
    sorted.forEach((f, i) => {
      if (f.netTVPI != null) {
        alphaDecayData.push({ firm, seq: i + 1, netTVPI: f.netTVPI, fundName: f.fundName });
      }
    });
  }

  // Macro Regime Heatmap data
  const regimes = ["Post-GFC Recovery", "SaaS Expansion", "ZIRP Bubble", "Rate Reset", "Pre-2009 / Other"] as const;
  const firms = [...new Set(rows.map((r) => r.firm))];
  const heatmapData: { regime: string; firm: string; avgTVPI: number | null }[] = [];
  for (const regime of regimes) {
    for (const firm of firms) {
      const matching = rows.filter((r) => r.macroRegime === regime && r.firm === firm);
      const avg = mean(matching.map((r) => r.netTVPI));
      heatmapData.push({ regime, firm, avgTVPI: avg });
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-lg font-semibold text-slate-900">
            Creative Views
          </h3>
        </div>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      <p className="text-xs text-slate-400 mt-1">
        Alternative perspectives on the data
      </p>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Alpha Decay Curve */}
              <div className="bg-slate-50/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  Alpha Decay Curve
                </h4>
                <p className="text-[10px] text-slate-400 mb-3">
                  TVPI by fund sequence number (not vintage) — does alpha erode with scale?
                </p>
                <ResponsiveContainer width="100%" height={260}>
                  <ScatterChart margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis
                      dataKey="seq"
                      type="number"
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      tickLine={false}
                      label={{
                        value: "Fund #",
                        position: "insideBottom",
                        offset: -5,
                        style: { fontSize: 9, fill: "#94a3b8" },
                      }}
                    />
                    <YAxis
                      dataKey="netTVPI"
                      type="number"
                      tick={{ fontSize: 10, fill: "#94a3b8" }}
                      tickLine={false}
                      tickFormatter={(v: number) => `${v}x`}
                    />
                    <Tooltip
                      content={({ payload }) => {
                        if (!payload?.length) return null;
                        const d = payload[0].payload;
                        return (
                          <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg px-2 py-1.5 shadow-lg text-[10px]">
                            <p className="font-semibold">{d.fundName}</p>
                            <p className="text-slate-500">{d.firm} · Fund #{d.seq}</p>
                            <p>TVPI: {fmtX(d.netTVPI)}</p>
                          </div>
                        );
                      }}
                    />
                    {firms.map((firm) => (
                      <Scatter
                        key={firm}
                        name={firm}
                        data={alphaDecayData.filter((d) => d.firm === firm)}
                        fill={FIRM_COLORS[firm] || "#94a3b8"}
                        fillOpacity={0.7}
                        line={{ stroke: FIRM_COLORS[firm] || "#94a3b8", strokeWidth: 1 }}
                      />
                    ))}
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              {/* Macro Regime Heatmap */}
              <div className="bg-slate-50/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-800 mb-1">
                  Macro Regime Heatmap
                </h4>
                <p className="text-[10px] text-slate-400 mb-3">
                  Average TVPI by macro era and firm
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-[10px]">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-1.5 px-1.5 font-medium text-slate-500">Era</th>
                        {firms.map((f) => (
                          <th key={f} className="text-center py-1.5 px-1.5 font-medium text-slate-500">
                            {f}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {regimes.map((regime) => (
                        <tr key={regime} className="border-b border-slate-100">
                          <td className="py-1.5 px-1.5 font-medium text-slate-700 whitespace-nowrap">
                            {regime}
                          </td>
                          {firms.map((firm) => {
                            const cell = heatmapData.find(
                              (d) => d.regime === regime && d.firm === firm
                            );
                            const val = cell?.avgTVPI;
                            let bg = "bg-slate-50";
                            if (val != null) {
                              if (val >= 5) bg = "bg-emerald-200 text-emerald-900";
                              else if (val >= 3) bg = "bg-blue-100 text-blue-900";
                              else if (val >= 2) bg = "bg-indigo-100 text-indigo-900";
                              else if (val >= 1) bg = "bg-amber-100 text-amber-900";
                              else bg = "bg-red-100 text-red-900";
                            }
                            return (
                              <td
                                key={firm}
                                className={`py-1.5 px-1.5 text-center font-medium rounded ${bg}`}
                              >
                                {val != null ? fmtX(val) : "—"}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
