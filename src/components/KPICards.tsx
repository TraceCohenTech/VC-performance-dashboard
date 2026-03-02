import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  DollarSign,
  Zap,
  PieChart,
  Award,
} from "lucide-react";
import type { DerivedFundRow, PerfRegime } from "../types";
import { mean, median, modePerformanceRegime } from "../utils/calculations";
import { fmtX, fmtUSDm, fmt } from "../utils/format";

type Props = {
  rows: DerivedFundRow[];
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function regimeColor(r: PerfRegime): string {
  if (r.startsWith("Generational")) return "text-emerald-600";
  if (r.startsWith("Strong")) return "text-blue-600";
  if (r.startsWith("Institutional")) return "text-purple-600";
  if (r.startsWith("Capital")) return "text-amber-600";
  return "text-red-500";
}

export default function KPICards({ rows }: Props) {
  const avgTVPI = mean(rows.map((r) => r.netTVPI));
  const medTVPI = median(rows.map((r) => r.netTVPI));
  const avgSize = mean(rows.map((r) => r.fundSizeUSDm));
  const avgAlpha = mean(rows.map((r) => r.alphaPerBillion));
  const avgDPIRatio = mean(rows.map((r) => r.dpiRatio));
  const topRegime = modePerformanceRegime(rows);

  const cards = [
    {
      label: "Avg Net TVPI",
      value: fmtX(avgTVPI),
      icon: TrendingUp,
      color: "from-blue-600 to-blue-400",
      desc: "Mean net multiple across all filtered funds. Above 3x is strong.",
    },
    {
      label: "Median Net TVPI",
      value: fmtX(medTVPI),
      icon: Target,
      color: "from-emerald-600 to-emerald-400",
      desc: "Middle fund multiple — less skewed by outliers than the average.",
    },
    {
      label: "Avg Fund Size",
      value: fmtUSDm(avgSize),
      icon: DollarSign,
      color: "from-amber-500 to-amber-400",
      desc: "Mean capital per fund. Larger funds typically face return compression.",
    },
    {
      label: "Avg Alpha / $1B",
      value: avgAlpha != null ? fmt(avgAlpha, 1) : "—",
      icon: Zap,
      color: "from-purple-600 to-purple-400",
      desc: "Net TVPI normalized by $1B deployed — capital efficiency score.",
    },
    {
      label: "Avg DPI / TVPI",
      value: avgDPIRatio != null ? fmt(avgDPIRatio, 2) : "—",
      icon: PieChart,
      color: "from-rose-500 to-rose-400",
      desc: "What % of paper gains have been distributed back to LPs as cash.",
    },
    {
      label: "Top Regime",
      value: topRegime.split(" (")[0],
      icon: Award,
      color: "from-slate-700 to-slate-500",
      textClass: regimeColor(topRegime),
      desc: "Most common performance bucket among filtered funds.",
    },
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8"
    >
      {cards.map((c) => (
        <motion.div
          key={c.label}
          variants={item}
          className="glass rounded-2xl p-4 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center`}
            >
              <c.icon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              {c.label}
            </span>
          </div>
          <span
            className={`text-2xl font-bold tracking-tight ${c.textClass || "text-slate-900"}`}
          >
            {c.value}
          </span>
          <span className="text-[10px] text-slate-400 leading-tight">
            {c.desc}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
