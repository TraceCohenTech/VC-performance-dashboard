import type { FundRow } from "../types";

export const FUNDS: FundRow[] = [
  // Thrive Capital (12 funds)
  { firm: "Thrive", fundName: "Thrive II", vintage: 2011, fundSizeUSDm: 40, grossTVPI: null, netTVPI: 5.7, netDPI: 1.3, irrToLP: null, strategyType: "Early" },
  { firm: "Thrive", fundName: "Thrive III", vintage: 2012, fundSizeUSDm: 148, grossTVPI: null, netTVPI: 6.1, netDPI: 1.5, irrToLP: null, strategyType: "Early" },
  { firm: "Thrive", fundName: "Thrive IV", vintage: 2014, fundSizeUSDm: 404, grossTVPI: null, netTVPI: 5.4, netDPI: 2.3, irrToLP: null, strategyType: "Early" },
  { firm: "Thrive", fundName: "Thrive V", vintage: 2016, fundSizeUSDm: 714, grossTVPI: null, netTVPI: 3.5, netDPI: 2.4, irrToLP: null, strategyType: "Early" },
  { firm: "Thrive", fundName: "Thrive VI", vintage: 2018, fundSizeUSDm: 408, grossTVPI: null, netTVPI: 2.5, netDPI: null, irrToLP: null, strategyType: "Core" },
  { firm: "Thrive", fundName: "Thrive VI-G", vintage: 2018, fundSizeUSDm: 612, grossTVPI: null, netTVPI: 2.3, netDPI: 0.2, irrToLP: null, strategyType: "Growth" },
  { firm: "Thrive", fundName: "Thrive VII", vintage: 2021, fundSizeUSDm: 519, grossTVPI: null, netTVPI: 1.3, netDPI: null, irrToLP: null, strategyType: "Core" },
  { firm: "Thrive", fundName: "Thrive VII-G", vintage: 2021, fundSizeUSDm: 1560, grossTVPI: null, netTVPI: 1.2, netDPI: null, irrToLP: null, strategyType: "Growth" },
  { firm: "Thrive", fundName: "Thrive VIII", vintage: 2022, fundSizeUSDm: 516, grossTVPI: null, netTVPI: 2.2, netDPI: null, irrToLP: null, strategyType: "Core" },
  { firm: "Thrive", fundName: "Thrive VIII-G", vintage: 2022, fundSizeUSDm: 2900, grossTVPI: null, netTVPI: 1.8, netDPI: 0.2, irrToLP: null, strategyType: "Growth" },
  { firm: "Thrive", fundName: "Thrive IX", vintage: 2024, fundSizeUSDm: 1000, grossTVPI: null, netTVPI: 0.9, netDPI: null, irrToLP: null, strategyType: "Core" },
  { firm: "Thrive", fundName: "Thrive IX-G", vintage: 2024, fundSizeUSDm: 3600, grossTVPI: null, netTVPI: 1.2, netDPI: null, irrToLP: null, strategyType: "Growth" },

  // a16z / Andreessen Horowitz (6 funds)
  { firm: "a16z", fundName: "AH I", vintage: 2009, fundSizeUSDm: 300, grossTVPI: 9.3, netTVPI: 6.9, netDPI: 6.0, irrToLP: null, strategyType: "Early" },
  { firm: "a16z", fundName: "AH II", vintage: 2010, fundSizeUSDm: 656, grossTVPI: 4.9, netTVPI: 3.7, netDPI: 3.5, irrToLP: null, strategyType: "Early" },
  { firm: "a16z", fundName: "AH Annex", vintage: 2011, fundSizeUSDm: 204, grossTVPI: 7.2, netTVPI: 5.4, netDPI: 5.1, irrToLP: null, strategyType: "Early" },
  { firm: "a16z", fundName: "AH III", vintage: 2012, fundSizeUSDm: 997, grossTVPI: 15.7, netTVPI: 11.3, netDPI: 5.5, irrToLP: null, strategyType: "Early" },
  { firm: "a16z", fundName: "AH IV", vintage: 2014, fundSizeUSDm: 1173, grossTVPI: 5.5, netTVPI: 4.1, netDPI: 3.0, irrToLP: null, strategyType: "Core" },
  { firm: "a16z", fundName: "AH V", vintage: 2017, fundSizeUSDm: 1189, grossTVPI: 4.0, netTVPI: 3.1, netDPI: 0.3, irrToLP: null, strategyType: "Core" },

  // Founders Fund (10 funds)
  { firm: "Founders Fund", fundName: "FFI", vintage: 2005, fundSizeUSDm: 50, grossTVPI: null, netTVPI: 7.8, netDPI: 7.7, irrToLP: 0.36, strategyType: "Early" },
  { firm: "Founders Fund", fundName: "FFII", vintage: 2007, fundSizeUSDm: 227, grossTVPI: null, netTVPI: 18.7, netDPI: 18.6, irrToLP: 0.31, strategyType: "Early" },
  { firm: "Founders Fund", fundName: "FFIII", vintage: 2010, fundSizeUSDm: 250, grossTVPI: null, netTVPI: 9.9, netDPI: 6.0, irrToLP: 0.25, strategyType: "Early" },
  { firm: "Founders Fund", fundName: "FFIV", vintage: 2011, fundSizeUSDm: 625, grossTVPI: null, netTVPI: 10.2, netDPI: 6.2, irrToLP: 0.33, strategyType: "Early" },
  { firm: "Founders Fund", fundName: "FFV", vintage: 2014, fundSizeUSDm: 1100, grossTVPI: null, netTVPI: 4.0, netDPI: 2.9, irrToLP: 0.27, strategyType: "Core" },
  { firm: "Founders Fund", fundName: "FFVI", vintage: 2017, fundSizeUSDm: 1400, grossTVPI: null, netTVPI: 3.1, netDPI: 0.03, irrToLP: 0.24, strategyType: "Core" },
  { firm: "Founders Fund", fundName: "FFVII", vintage: 2020, fundSizeUSDm: 1500, grossTVPI: null, netTVPI: 1.5, netDPI: null, irrToLP: 0.13, strategyType: "Core" },
  { firm: "Founders Fund", fundName: "FFVIII", vintage: 2023, fundSizeUSDm: 979, grossTVPI: null, netTVPI: 1.3, netDPI: null, irrToLP: 0.47, strategyType: "Core" },
  { firm: "Founders Fund", fundName: "FF Growth I", vintage: 2020, fundSizeUSDm: 1700, grossTVPI: null, netTVPI: 1.2, netDPI: null, irrToLP: 0.07, strategyType: "Growth" },
  { firm: "Founders Fund", fundName: "FF Growth II", vintage: 2023, fundSizeUSDm: 3400, grossTVPI: null, netTVPI: 1.0, netDPI: null, irrToLP: 0.07, strategyType: "Growth" },
];
