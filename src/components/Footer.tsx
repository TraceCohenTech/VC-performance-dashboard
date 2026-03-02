import { Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 pb-8 text-center">
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
