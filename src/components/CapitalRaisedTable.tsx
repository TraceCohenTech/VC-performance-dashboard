import { motion } from "framer-motion";
import type { CapitalRaisedRow } from "../types";
import { FIRM_COLORS } from "./chartColors";

type Props = { data: CapitalRaisedRow[] };

export default function CapitalRaisedTable({ data }: Props) {
  const sorted = [...data].sort((a, b) => b.totalB - a.totalB);
  const maxTotal = Math.max(...sorted.map((r) => r.totalB));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6 overflow-x-auto"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        Capital Raised Comparison
      </h3>
      <p className="text-xs text-slate-500 mb-1">
        How much LP capital each firm raised in the recent boom (2023–Feb 2026) vs. the prior 20 years. The bar shows total raised with the dark portion representing the recent period.
      </p>
      <p className="text-[11px] text-slate-400 mb-4">
        Firms that raised more recently than historically are scaling fast — but rapid AUM growth can pressure returns. Watch for mismatches with performance data above.
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-2 px-2 font-medium text-slate-500">Firm</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">2023–2026</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">2002–2022</th>
            <th className="text-right py-2 px-2 font-medium text-slate-500">Total</th>
            <th className="py-2 px-2 font-medium text-slate-500 w-40"></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => {
            const recentPct = (r.raised2023to2026B / r.totalB) * 100;
            return (
              <tr
                key={r.firm}
                className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-2.5 px-2">
                  <span
                    className="inline-block w-2 h-2 rounded-full mr-1.5"
                    style={{ backgroundColor: FIRM_COLORS[r.firm] || "#94a3b8" }}
                  />
                  <span className="font-medium text-slate-800">{r.firm}</span>
                </td>
                <td className="py-2.5 px-2 text-right text-slate-600">${r.raised2023to2026B}B</td>
                <td className="py-2.5 px-2 text-right text-slate-600">${r.raised2002to2022B}B</td>
                <td className="py-2.5 px-2 text-right font-medium text-slate-900">${r.totalB}B</td>
                <td className="py-2.5 px-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                        style={{ width: `${(r.totalB / maxTotal) * 100}%` }}
                      >
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-700"
                          style={{ width: `${recentPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}
