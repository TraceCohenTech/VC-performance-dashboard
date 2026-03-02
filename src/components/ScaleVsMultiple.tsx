import { motion } from "framer-motion";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { DerivedFundRow } from "../types";
import { FIRM_COLORS } from "./chartColors";
import { fmtX, fmtUSDm } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

export default function ScaleVsMultiple({ rows }: Props) {
  const firms = [...new Set(rows.map((r) => r.firm))];
  const valid = rows.filter((r) => r.netTVPI != null && r.fundSizeUSDm != null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        Scale vs. Multiple
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Fund size vs. Net TVPI — do larger funds compress returns?
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="fundSizeUSDm"
            type="number"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => (v >= 1000 ? `$${(v / 1000).toFixed(1)}B` : `$${v}M`)}
          />
          <YAxis
            dataKey="netTVPI"
            type="number"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => `${v}x`}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload as DerivedFundRow;
              return (
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
                  <p className="font-semibold text-slate-900">{d.fundName}</p>
                  <p className="text-slate-500">{d.firm} · {d.vintage}</p>
                  <p className="text-slate-600 mt-1">
                    Size: {fmtUSDm(d.fundSizeUSDm)} · TVPI: {fmtX(d.netTVPI)}
                  </p>
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{ fontSize: 11, paddingBottom: 8 }}
          />
          {firms.map((firm) => (
            <Scatter
              key={firm}
              name={firm}
              data={valid.filter((r) => r.firm === firm)}
              fill={FIRM_COLORS[firm] || "#94a3b8"}
              fillOpacity={0.7}
              strokeWidth={1}
              stroke={FIRM_COLORS[firm] || "#94a3b8"}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
      <div className="chart-insight">
        <strong>Insight:</strong> Funds under $500M cluster above 5x TVPI. Above $1B, no fund exceeds 4x — the "scale ceiling" is real.
      </div>
    </motion.div>
  );
}
