import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import type { DerivedFundRow } from "../types";
import { FIRM_COLORS } from "./chartColors";
import { fmtX, fmtUSDm, fmt } from "../utils/format";

type Props = { rows: DerivedFundRow[] };

export default function AlphaLeaderboard({ rows }: Props) {
  const ranked = rows
    .filter((r) => r.alphaPerBillion != null)
    .sort((a, b) => (b.alphaPerBillion ?? 0) - (a.alphaPerBillion ?? 0))
    .slice(0, 10);

  const maxAlpha = ranked[0]?.alphaPerBillion ?? 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-1">
        <Trophy className="w-5 h-5 text-amber-500" />
        <h3 className="text-lg font-semibold text-slate-900">
          Alpha per $1B Leaderboard
        </h3>
      </div>
      <p className="text-xs text-slate-500 mb-1">
        Ranks funds by capital efficiency: Net TVPI divided by fund size in billions. A $50M fund at 7.8x scores 156, while a $3.6B fund at 1.2x scores just 0.3.
      </p>
      <p className="text-[11px] text-slate-400 mb-4">
        Rewards smaller funds that generate outsized multiples. This metric penalizes scale — it answers "how much return per dollar of LP capital deployed?"
      </p>
      <div className="space-y-2">
        {ranked.map((r, i) => {
          const pct = ((r.alphaPerBillion ?? 0) / maxAlpha) * 100;
          return (
            <div key={r.fundName} className="flex items-center gap-3">
              <span className="w-5 text-right text-xs font-bold text-slate-400">
                {i + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: FIRM_COLORS[r.firm] || "#94a3b8" }}
                    />
                    <span className="text-xs font-medium text-slate-800">
                      {r.fundName}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {r.vintage} · {fmtUSDm(r.fundSizeUSDm)}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    {fmt(r.alphaPerBillion!, 1)} · {fmtX(r.netTVPI)}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${FIRM_COLORS[r.firm] || "#94a3b8"}, ${FIRM_COLORS[r.firm] || "#94a3b8"}88)`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
