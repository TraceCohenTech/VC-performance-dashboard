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
  ReferenceLine,
} from "recharts";
import type { DerivedFundRow } from "../types";
import { FIRM_COLORS } from "./chartColors";
import { fmtX, fmt } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

export default function DPIMaturityChart({ rows }: Props) {
  const firms = [...new Set(rows.map((r) => r.firm))];
  const valid = rows.filter(
    (r) => r.dpiRatio != null && r.age != null
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass rounded-2xl p-6"
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        DPI Maturity Curve
      </h3>
      <p className="text-xs text-slate-400 mb-4">
        Fund age vs. DPI/TVPI ratio — how fast do funds return capital?
      </p>
      <ResponsiveContainer width="100%" height={360}>
        <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="age"
            type="number"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            label={{
              value: "Fund Age (years)",
              position: "insideBottom",
              offset: -5,
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <YAxis
            dataKey="dpiRatio"
            type="number"
            domain={[0, 1]}
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            tickLine={false}
            tickFormatter={(v: number) => `${(v * 100).toFixed(0)}%`}
          />
          <ReferenceLine
            y={0.5}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            label={{
              value: "50% realized",
              position: "insideTopRight",
              style: { fontSize: 10, fill: "#94a3b8" },
            }}
          />
          <Tooltip
            content={({ payload }) => {
              if (!payload?.length) return null;
              const d = payload[0].payload as DerivedFundRow;
              return (
                <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-xl px-3 py-2 shadow-lg text-xs">
                  <p className="font-semibold text-slate-900">{d.fundName}</p>
                  <p className="text-slate-500">
                    {d.firm} · Age: {d.age}y · {d.strategyType}
                  </p>
                  <p className="text-slate-600 mt-1">
                    DPI/TVPI: {fmt(d.dpiRatio! * 100, 0)}% · TVPI: {fmtX(d.netTVPI)} · DPI: {fmtX(d.netDPI)}
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
        <strong>Insight:</strong> Founders Fund achieves {">"}90% DPI on mature funds — exceptional liquidity. Newer growth funds from all firms sit near 0% realized.
      </div>
    </motion.div>
  );
}
