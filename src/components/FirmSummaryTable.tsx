import { motion } from "framer-motion";
import type { FirmSummary } from "../types";
import { fmtX, fmtUSDm, fmtPct } from "../utils/format";
import { FIRM_COLORS, REGIME_COLORS } from "./chartColors";

type Props = { summaries: FirmSummary[] };

export default function FirmSummaryTable({ summaries }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        Firm-Level Summary
      </h3>
      <p className="text-xs text-slate-500 mb-1">
        Aggregates all funds per firm into a single row. Shows average and median TVPI, total capital deployed, and the most common performance regime.
      </p>
      <p className="text-[11px] text-slate-400 mb-4">
        Median TVPI is more robust than average for firms with outlier funds. Compare Avg DPI to see which firms actually return cash vs. hold paper gains.
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 px-2 font-medium text-slate-500">Firm</th>
            <th className="text-center py-2 px-2 font-medium text-slate-500">Funds</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Total Capital</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Avg TVPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Median TVPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Avg DPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Avg IRR</th>
            <th className="text-center py-2 px-2 font-medium text-slate-500">Top Regime</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s) => (
            <tr
              key={s.firm}
              className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-2.5 px-2">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1.5"
                  style={{ backgroundColor: FIRM_COLORS[s.firm] || "#94a3b8" }}
                />
                <span className="font-medium text-slate-800">{s.firm}</span>
              </td>
              <td className="py-2.5 px-2 text-center text-slate-600">{s.fundCount}</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtUSDm(s.totalCapitalM)}</td>
              <td className="py-2.5 px-2 text-right font-medium text-slate-900">{fmtX(s.avgNetTVPI)}</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtX(s.medianNetTVPI)}</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtX(s.avgDPI)}</td>
              <td className="py-2.5 px-2 text-right text-slate-600">{fmtPct(s.avgIRR)}</td>
              <td className="py-2.5 px-2 text-center">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    backgroundColor: `${REGIME_COLORS[s.topRegime] || "#94a3b8"}15`,
                    color: REGIME_COLORS[s.topRegime] || "#94a3b8",
                  }}
                >
                  {s.topRegime.split(" (")[0]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
