import { SectorMain } from "./Sector";
export interface SP_SELLOUTS {
    sellOut_Id: string | null;
    projectName: string | null;
    businessLocation_Id: string | null;
    subsidiary_Ids: string | null;
    sector_Ids: string | null;
    subSector_Ids: string | null;
    year_Id: string | null;
    revenue: string | null;
    ebitay: string | null;
    netProfit: string | null;
    sellingValue: number | null;
    fixedAssets: number | null;
    inventoryValue: number | null;
    isBankDebit: boolean | null;
    isAuditFinancialStatement: boolean | null;
    isValuationReport: boolean | null;
    transactionRole_Id: string | null;
    isMendate: boolean | null;
    userId: string | null;
    status: string | null;
    description: string | null;
    type: string | null;
    subType: string | null;
    property_Id: string | null;
    duration_Id: string | null;
    propertyValue: number | null;
    landArea: number | null;
    builtUpArea: number | null;
    hasContract: boolean | null;
    annualGrossIncome: number | null;
    isPublic: boolean | null;
    isAccepted: boolean | null;
    isApproved: boolean | null;
    isFeatured: boolean | null;
    isActive: boolean | null;
    isDeleted: boolean | null;
    created_Date: string;
    updated_Date: string;
    created_By: string | null;
    updated_By: string | null;
    property: string | null;
    role: string | null;
    businessLocation: string | null;
    userName: string | null;
    sectors: string | null;
    countriesInterested: string | null;
    sectorsArray: SectorMain[];
}