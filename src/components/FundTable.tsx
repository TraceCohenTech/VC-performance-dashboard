import { motion } from "framer-motion";
import type { DerivedFundRow } from "../types";
import { fmtX, fmtUSDm, fmtPct, fmt } from "../utils/format";
import { FIRM_COLORS, REGIME_COLORS } from "./chartColors";

type Props = { rows: DerivedFundRow[] };

export default function FundTable({ rows }: Props) {
  const sorted = [...rows].sort((a, b) => {
    if (a.firm !== b.firm) return a.firm.localeCompare(b.firm);
    return a.vintage - b.vintage;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        Fund Performance Detail
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        {sorted.length} funds across {[...new Set(sorted.map((r) => r.firm))].length} firms
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 px-2 font-medium text-slate-500">Fund</th>
            <th className="text-left py-2 px-2 font-medium text-slate-500">Firm</th>
            <th className="text-center py-2 px-2 font-medium text-slate-500">Vintage</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Size</th>
            <th className="text-center py-2 px-2 font-medium text-slate-500">Strategy</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Net TVPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Net DPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Gross TVPI</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">IRR</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Alpha/$1B</th>
            <th className="text-center py-2 px-2 font-medium text-slate-500">Regime</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr
              key={r.fundName}
              className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
            >
              <td className="py-2 px-2 font-medium text-slate-800">{r.fundName}</td>
              <td className="py-2 px-2">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1.5"
                  style={{ backgroundColor: FIRM_COLORS[r.firm] || "#94a3b8" }}
                />
                <span className="text-slate-600">{r.firm}</span>
              </td>
              <td className="py-2 px-2 text-center text-slate-600">{r.vintage}</td>
              <td className="py-2 px-2 text-right text-slate-600">{fmtUSDm(r.fundSizeUSDm)}</td>
              <td className="py-2 px-2 text-center">
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                  {r.strategyType}
                </span>
              </td>
              <td className="py-2 px-2 text-right font-medium text-slate-900">{fmtX(r.netTVPI)}</td>
              <td className="py-2 px-2 text-right text-slate-600">{fmtX(r.netDPI)}</td>
              <td className="py-2 px-2 text-right text-slate-600">{fmtX(r.grossTVPI)}</td>
              <td className="py-2 px-2 text-right text-slate-600">{fmtPct(r.irrToLP)}</td>
              <td className="py-2 px-2 text-right text-slate-600">
                {r.alphaPerBillion != null ? fmt(r.alphaPerBillion, 1) : "—"}
              </td>
              <td className="py-2 px-2 text-center">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ backgroundColor: REGIME_COLORS[r.performanceRegime] || "#94a3b8" }}
                  title={r.performanceRegime}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
