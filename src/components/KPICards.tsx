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
  if (r.startsWith("Institutional")) return "text-indigo-600";
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
      color: "from-indigo-500 to-blue-500",
    },
    {
      label: "Median Net TVPI",
      value: fmtX(medTVPI),
      icon: Target,
      color: "from-purple-500 to-indigo-500",
    },
    {
      label: "Avg Fund Size",
      value: fmtUSDm(avgSize),
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
    },
    {
      label: "Avg Alpha / $1B",
      value: avgAlpha != null ? fmt(avgAlpha, 1) : "—",
      icon: Zap,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Avg DPI / TVPI",
      value: avgDPIRatio != null ? fmt(avgDPIRatio, 2) : "—",
      icon: PieChart,
      color: "from-rose-500 to-pink-500",
    },
    {
      label: "Top Regime",
      value: topRegime.split(" (")[0],
      icon: Award,
      color: "from-slate-600 to-slate-800",
      textClass: regimeColor(topRegime),
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
        </motion.div>
      ))}
    </motion.div>
  );
}
