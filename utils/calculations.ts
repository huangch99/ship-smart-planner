
import { UnitSystem, Dimensions, BoxConfig, PalletDefinition } from '../types';

export const convertLength = (val: number, to: UnitSystem): number => {
  // Metric is mm, Imperial is in
  // in -> mm: * 25.4
  // mm -> in: / 25.4
  return to === UnitSystem.METRIC ? val * 25.4 : val / 25.4;
};

export const convertWeight = (val: number, to: UnitSystem): number => {
  // Metric is g, Imperial is lb
  // lb -> g: * 453.592
  // g -> lb: / 453.592
  return to === UnitSystem.METRIC ? val * 453.59237 : val / 453.59237;
};

// Helper to convert a full BoxConfig from one system to another
export const convertBoxConfig = (box: BoxConfig, fromSystem: UnitSystem, toSystem: UnitSystem): BoxConfig => {
  if (fromSystem === toSystem) return { ...box };

  return {
    ...box,
    dimensions: {
      length: convertLength(box.dimensions.length, toSystem),
      width: convertLength(box.dimensions.width, toSystem),
      height: convertLength(box.dimensions.height, toSystem),
    },
    grossWeight: convertWeight(box.grossWeight, toSystem)
  };
};

export const calculatePalletFit = (
  box: Dimensions,
  pallet: Dimensions
): { boxesPerLayer: number; layers: number; totalPerPallet: number } => {
  const { length: bL, width: bW, height: bH } = box;
  const { length: pL, width: pW, height: pH } = pallet;

  // Check valid dimensions
  if (bL <= 0 || bW <= 0 || bH <= 0) return { boxesPerLayer: 0, layers: 0, totalPerPallet: 0 };

  // Calculate boxes per layer (Simple area heuristic with rotation check)
  // Option 1: Standard orientation
  const fit1 = Math.floor(pL / bL) * Math.floor(pW / bW);
  // Option 2: Rotated box 90deg
  const fit2 = Math.floor(pL / bW) * Math.floor(pW / bL);
  
  // We take the max of simple row/col fitting. 
  // Advanced palletizing algorithms (block stacking) are more complex, this is a safe lower-bound estimate.
  const boxesPerLayer = Math.max(fit1, fit2);

  // Calculate vertical layers
  const layers = Math.floor(pH / bH);

  return {
    boxesPerLayer,
    layers,
    totalPerPallet: boxesPerLayer * layers
  };
};

export const calculateLineMetrics = (
  qty: number,
  box: BoxConfig,
  pallet: PalletDefinition
) => {
  const totalBoxes = Math.ceil(qty / box.itemsPerBox);
  
  // Weight Calculation
  // Total Gross Weight = totalBoxes * box.grossWeight (Master Carton Weight)
  const totalGrossWeight = totalBoxes * box.grossWeight;
  
  const boxVol = box.dimensions.length * box.dimensions.width * box.dimensions.height;
  const totalVolume = totalBoxes * boxVol; // cubic units

  // Pallet Calc
  const fit = calculatePalletFit(box.dimensions, pallet.dimensions);
  const boxesPerPallet = fit.totalPerPallet || 1; // avoid divide by zero
  const palletsRequired = parseFloat((totalBoxes / boxesPerPallet).toFixed(2));

  return {
    totalBoxes,
    totalGrossWeight,
    totalVolume,
    palletsRequired,
    boxesPerPallet,
    boxesPerLayer: fit.boxesPerLayer,
    palletLayers: fit.layers
  };
};
