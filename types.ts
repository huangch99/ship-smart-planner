
export enum UnitSystem {
  METRIC = 'METRIC', // mm, g
  IMPERIAL = 'IMPERIAL' // in, lb
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
}

export interface PalletDefinition {
  id: string;
  name: string;
  dimensions: Dimensions; // L, W, MaxLoadHeight
}

export interface ItemInput {
  name: string;
  quantity: number;
  // unitWeight removed, we use box.grossWeight (Master Carton Weight)
  // Item dimensions are useful if we calculate box size, but usually user provides box size
  // We'll keep them optional for record keeping
  itemLength?: number;
  itemWidth?: number;
  itemHeight?: number;
}

export interface BoxConfig {
  itemsPerBox: number;
  dimensions: Dimensions; // Outer dimensions of the box
  grossWeight: number; // Master Carton Weight (Gross weight of full box)
}

export interface Product {
  id: string;
  name: string;
  box: BoxConfig;
}

export interface ShipmentLine {
  id: string;
  item: ItemInput;
  box: BoxConfig;
  
  // Calculated Properties
  totalBoxes: number;
  totalGrossWeight: number; // totalBoxes * box.grossWeight
  totalVolume: number;
  
  // Pallet Estimation
  palletsRequired: number;
  boxesPerPallet: number;
  palletLayers: number;
  boxesPerLayer: number;
}

export interface CalculationSummary {
  totalItems: number;
  totalBoxes: number;
  totalPallets: number;
  totalGrossWeight: number;
  totalVolume: number;
}

export interface AIAnalysisResult {
  length: number;
  width: number;
  height: number;
  weight: number;
  unitSystem: UnitSystem;
  detectedItem: string;
  reasoning: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
}
