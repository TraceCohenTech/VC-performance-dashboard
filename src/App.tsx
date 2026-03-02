import { useState, useMemo } from "react";
import { FUNDS, CAPITAL_RAISED } from "./data";
import { deriveFundRows, computeFirmSummary, uniq } from "./utils/calculations";
import type { DerivedFundRow } from "./types";

import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import KPICards from "./components/KPICards";
import VintageChart from "./components/VintageChart";
import ScaleVsMultiple from "./components/ScaleVsMultiple";
import DPIMaturityChart from "./components/DPIMaturityChart";
import BrandVsAlpha from "./components/BrandVsAlpha";
import FundTable from "./components/FundTable";
import FirmSummaryTable from "./components/FirmSummaryTable";
import CapitalRaisedTable from "./components/CapitalRaisedTable";
import AlphaLeaderboard from "./components/AlphaLeaderboard";
import CreativeIdeas from "./components/CreativeIdeas";
import Footer from "./components/Footer";

export default function App() {
  const allDerived = useMemo(() => deriveFundRows(FUNDS), []);

  const firms = useMemo(() => uniq(FUNDS.map((f) => f.firm)), []);
  const strategies = useMemo(() => uniq(FUNDS.map((f) => f.strategyType)), []);

  const [selectedFirm, setSelectedFirm] = useState("All");
  const [selectedStrategy, setSelectedStrategy] = useState("All");
  const [hideNullDPI, setHideNullDPI] = useState(false);
  const [hideNullIRR, setHideNullIRR] = useState(false);

  const filtered = useMemo(() => {
    let rows: DerivedFundRow[] = allDerived;
    if (selectedFirm !== "All") rows = rows.filter((r) => r.firm === selectedFirm);
    if (selectedStrategy !== "All")
      rows = rows.filter((r) => r.strategyType === selectedStrategy);
    if (hideNullDPI) rows = rows.filter((r) => r.netDPI != null);
    if (hideNullIRR) rows = rows.filter((r) => r.irrToLP != null);
    return rows;
  }, [allDerived, selectedFirm, selectedStrategy, hideNullDPI, hideNullIRR]);

  const firmSummaries = useMemo(() => computeFirmSummary(filtered), [filtered]);
  const activeFirmCount = useMemo(() => uniq(filtered.map((r) => r.firm)).length, [filtered]);

  return (
    <div className="min-h-screen px-4 py-8 md:px-8 lg:px-12 max-w-[1400px] mx-auto">
      <Header fundCount={filtered.length} firmCount={activeFirmCount} />

      <FilterBar
        firms={firms}
        strategies={strategies}
        selectedFirm={selectedFirm}
        selectedStrategy={selectedStrategy}
        hideNullDPI={hideNullDPI}
        hideNullIRR={hideNullIRR}
        onFirmChange={setSelectedFirm}
        onStrategyChange={setSelectedStrategy}
        onHideNullDPIChange={setHideNullDPI}
        onHideNullIRRChange={setHideNullIRR}
      />

      <KPICards rows={filtered} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <VintageChart rows={filtered} />
        <ScaleVsMultiple rows={filtered} />
        <DPIMaturityChart rows={filtered} />
        <BrandVsAlpha rows={filtered} capitalRaised={CAPITAL_RAISED} />
      </div>

      {/* Alpha Leaderboard */}
      <div className="mb-8">
        <AlphaLeaderboard rows={filtered} />
      </div>

      {/* Tables */}
      <div className="space-y-6 mb-8">
        <FundTable rows={filtered} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FirmSummaryTable summaries={firmSummaries} />
          <CapitalRaisedTable data={CAPITAL_RAISED} />
        </div>
      </div>

      {/* Creative Views */}
      <div className="mb-8">
        <CreativeIdeas rows={filtered} />
      </div>

      <Footer />
    </div>
  );
}
