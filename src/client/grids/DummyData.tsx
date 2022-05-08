export interface IDummyData {
  Entity: string;
  Tier: string;
  MarketCode: string;
  MarketPrice: number;
}

export interface IFundingData {
  Id: string;
  Entity: string;
  FundingTier: string;
  CollTier: string;
  SecurityClass?: string;
  Market?: string;
  Classification: string;
  SOD: number;
  Failed: number;
  Settled: number;
  T: number;
}

export const FundingData: IFundingData[] = [
  { Id: "1", Entity: "MLIL", FundingTier: "CSH", CollTier: "CS", Classification: "Clearance", SOD: 100, Failed: 10, Settled: 50, T: 60 },
  { Id: "2", Entity: "MLIL", FundingTier: "ETF", CollTier: "E1", Classification: "Clearance", SOD: 200, Failed: 20, Settled: 60, T: 70 },
  { Id: "3", Entity: "MLIL", FundingTier: "ETF", CollTier: "G1", Classification: "Clearance", SOD: 300, Failed: 30, Settled: 70, T: 80 },

  { Id: "4", Entity: "MLIL", FundingTier: "CSH", CollTier: "CS", Classification: "Firm Depot Net", SOD: 100, Failed: 10, Settled: 50, T: 60 },
  { Id: "5", Entity: "MLIL", FundingTier: "ETF", CollTier: "E1", Classification: "Firm Depot Net", SOD: 200, Failed: 20, Settled: 60, T: 70 },
  { Id: "6", Entity: "MLIL", FundingTier: "ETF", CollTier: "G1", Classification: "Firm Depot Net", SOD: 300, Failed: 30, Settled: 70, T: 80 },

  { Id: "7", Entity: "MLIA", FundingTier: "CSH", CollTier: "CS", Classification: "Clearance", SOD: 100, Failed: 10, Settled: 50, T: 60 },
  { Id: "8", Entity: "MLIA", FundingTier: "HTF", CollTier: "E3", Classification: "Clearance", SOD: 200, Failed: 20, Settled: 60, T: 70 },
  { Id: "9", Entity: "MLIA", FundingTier: "HTF", CollTier: "U1", Classification: "Clearance", SOD: 300, Failed: 30, Settled: 70, T: 80 },

  { Id: "10", Entity: "MLIA", FundingTier: "CSH", CollTier: "CS", Classification: "Firm Depot Net", SOD: 100, Failed: 10, Settled: 50, T: 60 },
  { Id: "11", Entity: "MLIA", FundingTier: "HTF", CollTier: "E3", Classification: "Firm Depot Net", SOD: 200, Failed: 20, Settled: 60, T: 70 },
  { Id: "12", Entity: "MLIA", FundingTier: "HTF", CollTier: "U1", Classification: "Firm Depot Net", SOD: 300, Failed: 30, Settled: 70, T: 80 },
];