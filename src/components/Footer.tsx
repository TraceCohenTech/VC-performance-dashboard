import { Twitter, Mail } from "lucide-react";

const SOURCES = [
  { name: "CalPERS PEP Fund Performance Review", url: "https://www.calpers.ca.gov/page/investments/asset-classes/private-equity/pep-fund-performance", note: "Insight, Khosla, Tiger Global, Lightspeed (2022 vintage)" },
  { name: "Lightspeed Venture Partners", url: "https://lsvp.com", note: "Early-stage fund track record (as of Sep 30, 2024)" },
  { name: "The Information", url: "https://www.theinformation.com", note: "USV fund performance (IRR data)" },
  { name: "Cambridge Associates", url: "https://www.cambridgeassociates.com", note: "VC quartile benchmarks" },
  { name: "Newcomer", url: "https://www.newcomer.co", note: "Thrive, a16z, Founders Fund performance data" },
];

export default function Footer() {
  return (
    <footer className="mt-16 pb-8">
      {/* Sources */}
      <div className="border-t border-slate-200 pt-6 mb-6">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Data Sources
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SOURCES.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
            >
              <span className="font-medium text-slate-500">{s.name}</span>
              {" — "}
              {s.note}
            </a>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
        <a
          href="https://x.com/Trace_Cohen"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
        >
          <Twitter className="w-4 h-4" />
          @Trace_Cohen
        </a>
        <a
          href="mailto:t@nyvp.com"
          className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
        >
          <Mail className="w-4 h-4" />
          t@nyvp.com
        </a>
      </div>
    </footer>
  );
}
