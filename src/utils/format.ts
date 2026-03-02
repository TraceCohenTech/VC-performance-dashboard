export function fmt(n: number | null | undefined, digits = 1): string {
  if (n == null) return "—";
  return n.toFixed(digits);
}

export function fmtInt(n: number | null | undefined): string {
  if (n == null) return "—";
  return Math.round(n).toLocaleString();
}

export function fmtUSDm(n: number | null | undefined): string {
  if (n == null) return "—";
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}B`;
  return `$${Math.round(n).toLocaleString()}M`;
}

export function fmtPct(n: number | null | undefined): string {
  if (n == null) return "—";
  return `${(n * 100).toFixed(0)}%`;
}

export function fmtX(n: number | null | undefined): string {
  if (n == null) return "—";
  return `${n.toFixed(1)}x`;
}
