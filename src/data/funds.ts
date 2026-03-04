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

  // Lightspeed (10 funds)
  { firm: "Lightspeed", fundName: "Select I", vintage: 2014, fundSizeUSDm: 432, grossTVPI: null, netTVPI: 2.4, netDPI: 1.8, irrToLP: null, strategyType: "Growth" },
  { firm: "Lightspeed", fundName: "Select II", vintage: 2016, fundSizeUSDm: 500, grossTVPI: null, netTVPI: 2.1, netDPI: 0.7, irrToLP: null, strategyType: "Growth" },
  { firm: "Lightspeed", fundName: "Select III", vintage: 2018, fundSizeUSDm: 1400, grossTVPI: null, netTVPI: 1.6, netDPI: null, irrToLP: null, strategyType: "Growth" },
  // Lightspeed early-stage funds (Lightspeed Venture Partners, as of Sep 30, 2024)
  { firm: "Lightspeed", fundName: "VII", vintage: 2006, fundSizeUSDm: 480, grossTVPI: null, netTVPI: 3.1, netDPI: 2.8, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "VIII", vintage: 2008, fundSizeUSDm: 808, grossTVPI: null, netTVPI: 2.9, netDPI: 2.5, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "IX", vintage: 2012, fundSizeUSDm: 685, grossTVPI: null, netTVPI: 5.7, netDPI: 3.7, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "X", vintage: 2014, fundSizeUSDm: 635, grossTVPI: null, netTVPI: 3.2, netDPI: 0.8, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "XI", vintage: 2016, fundSizeUSDm: 715, grossTVPI: null, netTVPI: 2.4, netDPI: 0.5, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "XII", vintage: 2018, fundSizeUSDm: 752, grossTVPI: null, netTVPI: 1.9, netDPI: null, irrToLP: null, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "XIII", vintage: 2020, fundSizeUSDm: null, grossTVPI: null, netTVPI: null, netDPI: 0.09, irrToLP: null, strategyType: "Early" },
  // CalPERS Lightspeed data (2022 vintage, supplement existing)
  { firm: "Lightspeed", fundName: "Opportunity Fund II", vintage: 2022, fundSizeUSDm: 200, grossTVPI: null, netTVPI: 1.4, netDPI: null, irrToLP: 0.201, strategyType: "Growth" },
  { firm: "Lightspeed", fundName: "Select V", vintage: 2022, fundSizeUSDm: 100, grossTVPI: null, netTVPI: 1.2, netDPI: null, irrToLP: 0.108, strategyType: "Growth" },
  { firm: "Lightspeed", fundName: "XIV-A (Inception)", vintage: 2022, fundSizeUSDm: 45, grossTVPI: null, netTVPI: 1.4, netDPI: null, irrToLP: 0.169, strategyType: "Early" },
  { firm: "Lightspeed", fundName: "XIV-B (Ignite)", vintage: 2022, fundSizeUSDm: 55, grossTVPI: null, netTVPI: 1.5, netDPI: null, irrToLP: 0.228, strategyType: "Early" },

  // Insight Venture Partners (3 funds — CalPERS data)
  { firm: "Insight", fundName: "Insight Growth-Buyout Coinvest (B)", vintage: 2015, fundSizeUSDm: 400, grossTVPI: null, netTVPI: 3.5, netDPI: null, irrToLP: 0.258, strategyType: "Growth" },
  { firm: "Insight", fundName: "Insight Partners IX", vintage: 2015, fundSizeUSDm: 100, grossTVPI: null, netTVPI: 3.9, netDPI: null, irrToLP: 0.231, strategyType: "Core" },
  { firm: "Insight", fundName: "Insight Partners X", vintage: 2018, fundSizeUSDm: 250, grossTVPI: null, netTVPI: 2.8, netDPI: null, irrToLP: 0.224, strategyType: "Core" },

  // Khosla Ventures (2 funds — CalPERS data)
  { firm: "Khosla", fundName: "Khosla Ventures III", vintage: 2009, fundSizeUSDm: 200, grossTVPI: null, netTVPI: 1.8, netDPI: null, irrToLP: 0.097, strategyType: "Early" },
  { firm: "Khosla", fundName: "Khosla Ventures Seed", vintage: 2009, fundSizeUSDm: 60, grossTVPI: null, netTVPI: 1.2, netDPI: null, irrToLP: 0.014, strategyType: "Early" },

  // Tiger Global (1 fund — CalPERS data)
  { firm: "Tiger Global", fundName: "Tiger Global PIP XV", vintage: 2022, fundSizeUSDm: 300, grossTVPI: null, netTVPI: 0.8, netDPI: null, irrToLP: -0.078, strategyType: "Growth" },

  // Union Square Ventures (7 funds — The Information / Cambridge Associates, as of June 2018)
  { firm: "USV", fundName: "USV 2004", vintage: 2004, fundSizeUSDm: 125, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.67, strategyType: "Early" },
  { firm: "USV", fundName: "USV 2008", vintage: 2008, fundSizeUSDm: 156, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.22, strategyType: "Early" },
  { firm: "USV", fundName: "USV Opportunity 2010", vintage: 2010, fundSizeUSDm: 165, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.60, strategyType: "Growth" },
  { firm: "USV", fundName: "USV 2012", vintage: 2012, fundSizeUSDm: 200, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.32, strategyType: "Early" },
  { firm: "USV", fundName: "USV 2014", vintage: 2014, fundSizeUSDm: 166, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.17, strategyType: "Early" },
  { firm: "USV", fundName: "USV Opportunity 2014", vintage: 2014, fundSizeUSDm: 174, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.21, strategyType: "Growth" },
  { firm: "USV", fundName: "USV 2016", vintage: 2016, fundSizeUSDm: 175, grossTVPI: null, netTVPI: null, netDPI: null, irrToLP: 0.32, strategyType: "Early" },
];
