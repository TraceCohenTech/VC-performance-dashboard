export type StrategyType = "Early" | "Core" | "Growth" | "Unknown";

export type FundRow = {
  firm: string;
  fundName: string;
  vintage: number;
  fundSizeUSDm: number | null;
  grossTVPI: number | null;
  netTVPI: number | null;
  netDPI: number | null;
  irrToLP: number | null;
  strategyType: StrategyType;
};

export type PerfRegime =
  | "Generational (5x+)"
  | "Strong (3-5x)"
  | "Institutional (2-3x)"
  | "Capital Preservation (1-2x)"
  | "Value Destruction (<1x)"
  | "Unknown";

export type MacroRegime =
  | "Post-GFC Recovery"
  | "SaaS Expansion"
  | "ZIRP Bubble"
  | "Rate Reset"
  | "Pre-2009 / Other";

export type DerivedFundRow = FundRow & {
  age: number | null;
  alphaPerBillion: number | null;
  dpiRatio: number | null;
  performanceRegime: PerfRegime;
  macroRegime: MacroRegime;
};

export type CapitalRaisedRow = {
  firm: string;
  raised2023to2026B: number;
  raised2002to2022B: number;
  totalB: number;
};

export type FirmSummary = {
  firm: string;
  fundCount: number;
  totalCapitalM: number;
  avgNetTVPI: number | null;
  medianNetTVPI: number | null;
  avgDPI: number | null;
  avgIRR: number | null;
  topRegime: PerfRegime;
};
