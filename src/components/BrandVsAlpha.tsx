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
import type { CapitalRaisedRow } from "../types";
import type { DerivedFundRow } from "../types";
import { mean } from "../utils/calculations";
import { fmtX } from "../utils/format";

type Props = {
  rows: DerivedFundRow[];
  capitalRaised: CapitalRaisedRow[];
};

export default function BrandVsAlpha({ rows, capitalRaised }: Props) {
  const firmAvg = new Map<string, number>();
  const byFirm = new Map<string, DerivedFundRow[]>();
  for (const r of rows) {
    const arr = byFirm.get(r.firm) || [];
    arr.push(r);
    byFirm.set(r.firm, arr);
  }
  for (const [firm, funds] of byFirm) {
    const avg = mean(funds.map((f) => f.netTVPI));
    if (avg != null) firmAvg.set(firm, avg);
  }

  const data = capitalRaised
    .map((cr) => ({
      firm: cr.firm,
      totalRaisedB: cr.totalB,
      avgTVPI: firmAvg.get(cr.firm) ?? null,
    }))
    .sort((a, b) => b.totalRaisedB - a.totalRaisedB);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        Brand vs. Alpha Proxy
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Total capital raised vs. average TVPI (where performance data available)
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="firm"
            tick={{ fontSize: 10, fill: "#94a3b8" }}
            tickLine={false}
          />
          <YAxis
            yAxisId="left"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => `$${v}B`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => `${v}x`}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload;
              return (
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
                  <p className="font-semibold text-slate-900">{d.firm}</p>
                  <p className="text-slate-600 mt-1">
                    Capital Raised: ${d.totalRaisedB}B
                  </p>
                  <p className="text-slate-600">
                    Avg TVPI: {d.avgTVPI != null ? fmtX(d.avgTVPI) : "N/A"}
                  </p>
                </div>
              );
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Bar
            yAxisId="left"
            dataKey="totalRaisedB"
            name="Total Raised ($B)"
            fill="#c7d2fe"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            yAxisId="right"
            dataKey="avgTVPI"
            name="Avg Net TVPI"
            radius={[6, 6, 0, 0]}
            fill="#818cf8"
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-insight">
        <strong>Insight:</strong> a16z raised the most capital ($54B) but Founders Fund delivers the highest average TVPI — brand and alpha don't always correlate.
      </div>
    </motion.div>
  );
}
