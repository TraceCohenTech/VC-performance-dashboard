import { Filter, X } from "lucide-react";

type Props = {
  firms: string[];
  strategies: string[];
  selectedFirm: string;
  selectedStrategy: string;
  hideNullDPI: boolean;
  hideNullIRR: boolean;
  onFirmChange: (v: string) => void;
  onStrategyChange: (v: string) => void;
  onHideNullDPIChange: (v: boolean) => void;
  onHideNullIRRChange: (v: boolean) => void;
};

export default function FilterBar({
  firms,
  strategies,
  selectedFirm,
  selectedStrategy,
  hideNullDPI,
  hideNullIRR,
  onFirmChange,
  onStrategyChange,
  onHideNullDPIChange,
  onHideNullIRRChange,
}: Props) {
  const hasFilters =
    selectedFirm !== "All" ||
    selectedStrategy !== "All" ||
    hideNullDPI ||
    hideNullIRR;

  return (
    <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap items-center gap-3">
      <Filter className="w-4 h-4 text-slate-400" />

      <select
        value={selectedFirm}
        onChange={(e) => onFirmChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
      >
        <option value="All">All Firms</option>
        {firms.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      <select
        value={selectedStrategy}
        onChange={(e) => onStrategyChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
      >
        <option value="All">All Strategies</option>
        {strategies.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={hideNullDPI}
          onChange={(e) => onHideNullDPIChange(e.target.checked)}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
        />
        Hide null DPI
      </label>

      <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={hideNullIRR}
          onChange={(e) => onHideNullIRRChange(e.target.checked)}
          className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-200"
        />
        Hide null IRR
      </label>

      {hasFilters && (
        <button
          onClick={() => {
            onFirmChange("All");
            onStrategyChange("All");
            onHideNullDPIChange(false);
            onHideNullIRRChange(false);
          }}
          className="ml-auto flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
        >
          <X className="w-3 h-3" />
          Clear
        </button>
      )}
    </div>
  );
}
