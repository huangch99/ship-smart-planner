
import React, { useState, useEffect, useRef } from 'react';
import { 
  Package, Truck, Settings, Trash2, Plus, 
  FileSpreadsheet, Calculator, Info, Cuboid,
  LayoutGrid, List, Edit, Download, RotateCcw,
  ClipboardPaste, X
} from 'lucide-react';
import { 
  UnitSystem, ShipmentLine, PalletDefinition, 
  Dimensions, BoxConfig, ItemInput, Product 
} from './types';
import { calculateLineMetrics, convertLength, convertWeight, convertBoxConfig } from './utils/calculations';
import ProductCatalog from './components/ProductCatalog';
import { DEFAULT_PRODUCTS, CATALOG_VERSION } from './data/defaultProducts';

// --- Constants & Defaults ---

// Initial Box in Metric (mm/g) roughly equivalent to 30x20x15 inches
const INITIAL_BOX: BoxConfig = {
  itemsPerBox: 10,
  dimensions: { length: 760, width: 500, height: 380 },
  grossWeight: 4500 // ~10 lbs
};

const INITIAL_ITEM: ItemInput = {
  name: '',
  quantity: 100,
};

type ViewMode = 'manifest' | 'catalog';

function App() {
  // --- State ---

  // Persist Unit System
  const [unitSystem, setUnitSystem] = useState<UnitSystem>(() => {
    const saved = localStorage.getItem('shipSmart_unitSystem');
    return (saved as UnitSystem) || UnitSystem.IMPERIAL;
  });

  useEffect(() => {
    localStorage.setItem('shipSmart_unitSystem', unitSystem);
  }, [unitSystem]);

  const [viewMode, setViewMode] = useState<ViewMode>('manifest');
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  
  // Persist Pallet Configuration (Always INCHES based on request)
  const [customPallet, setCustomPallet] = useState<PalletDefinition>(() => {
    const saved = localStorage.getItem('shipSmart_pallet');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { console.error("Error loading pallet config:", e); }
    }
    return { 
      id: 'custom', 
      name: 'Custom Pallet', 
      dimensions: { length: 48, width: 40, height: 62 } // Defaults to GMA Standard (inches)
    };
  });

  useEffect(() => {
    localStorage.setItem('shipSmart_pallet', JSON.stringify(customPallet));
  }, [customPallet]);

  // Persist Manifest Lines
  const [lines, setLines] = useState<ShipmentLine[]>(() => {
    const saved = localStorage.getItem('shipSmart_lines');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) { console.error("Error loading manifest lines:", e); }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('shipSmart_lines', JSON.stringify(lines));
  }, [lines]);
  
  // Initialize products with Version Checking
  // Products are ALWAYS stored in METRIC (mm/g)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('shipSmart_products');
      const savedVersion = localStorage.getItem('shipSmart_catalogVersion');
      
      // If version mismatch or no data, use DEFAULT_PRODUCTS and update version
      if (!savedProducts || !savedVersion || parseInt(savedVersion) < CATALOG_VERSION) {
        // Automatically migrate/reset to new defaults
        return DEFAULT_PRODUCTS;
      }
      
      return JSON.parse(savedProducts);
    } catch (e) {
      console.error("Error loading products from local storage:", e);
      return DEFAULT_PRODUCTS;
    }
  });

  // Save products and version to LocalStorage whenever they change
  useEffect(() => {
    localStorage.setItem('shipSmart_products', JSON.stringify(products));
    localStorage.setItem('shipSmart_catalogVersion', CATALOG_VERSION.toString());
  }, [products]);
  
  // Form State
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [newItem, setNewItem] = useState<ItemInput>(INITIAL_ITEM);
  
  // newBox state always reflects the ACTIVE unit system values for the form inputs
  const [newBox, setNewBox] = useState<BoxConfig>(() => {
    // Convert initial metric box to currently saved unit system on load
    const b = convertBoxConfig(INITIAL_BOX, UnitSystem.METRIC, unitSystem);
    // Round dimensions to integers (no decimal)
    b.dimensions.length = Math.round(b.dimensions.length);
    b.dimensions.width = Math.round(b.dimensions.width);
    b.dimensions.height = Math.round(b.dimensions.height);
    return b;
  });

  const manifestFileRef = useRef<HTMLInputElement>(null);
  
  // --- Effects ---

  // Handle Product Selection
  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    if (!productId) return;

    const product = products.find(p => p.id === productId);
    if (product) {
      setNewItem(prev => ({
        ...prev,
        name: product.name,
      }));
      
      // Convert stored METRIC product to current UNIT SYSTEM for the form
      const convertedBox = convertBoxConfig(product.box, UnitSystem.METRIC, unitSystem);
      // Round to integers (no decimal) for UI
      convertedBox.dimensions.length = Math.round(convertedBox.dimensions.length);
      convertedBox.dimensions.width = Math.round(convertedBox.dimensions.width);
      convertedBox.dimensions.height = Math.round(convertedBox.dimensions.height);
      setNewBox(convertedBox);
    }
  };

  // Helper to format dimensions with both units, Imperial first
  const formatDualDimensions = (val: number) => {
    // Current system value
    let primaryVal = val;
    let secondaryVal = 0;
    let primaryUnit = '';
    let secondaryUnit = '';

    if (unitSystem === UnitSystem.IMPERIAL) {
      primaryUnit = '"';
      secondaryUnit = 'mm';
      // val is in inches
      secondaryVal = convertLength(val, UnitSystem.METRIC);
    } else {
      primaryUnit = 'mm';
      secondaryUnit = '"';
      // val is in mm
      secondaryVal = convertLength(val, UnitSystem.IMPERIAL);
    }

    // Always display Imperial (in) first, then Metric (mm)
    if (unitSystem === UnitSystem.IMPERIAL) {
        return `${primaryVal}" (${secondaryVal.toFixed(0)} ${secondaryUnit})`;
    } else {
        return `${secondaryVal.toFixed(0)}${secondaryUnit} (${primaryVal} ${primaryUnit})`;
    }
  };

  const unitLabels = {
    dim: unitSystem === UnitSystem.METRIC ? 'mm' : 'in',
    weight: unitSystem === UnitSystem.METRIC ? 'g' : 'lb',
    vol: unitSystem === UnitSystem.METRIC ? 'm³' : 'ft³'
  };

  // --- Calculations ---

  // Helper to get pallet dimensions in the current unit system for calculation
  const getCalculationPallet = (): PalletDefinition => {
    // If we are in Metric mode, the pallet inputs (which are fixed to INCHES)
    // need to be converted to MM for the math to work with the Metric box dimensions.
    if (unitSystem === UnitSystem.METRIC) {
      return {
        ...customPallet,
        dimensions: {
          length: customPallet.dimensions.length * 25.4,
          width: customPallet.dimensions.width * 25.4,
          height: customPallet.dimensions.height * 25.4
        }
      };
    }
    // If Imperial, inputs are inches and system is inches, so use as is.
    return customPallet;
  };

  const addLine = () => {
    if (!newItem.name || !customPallet) return;

    const calculationPallet = getCalculationPallet();

    // newBox is in Current System. calculationPallet is adjusted to Current System.
    // Calculations work regardless of system as long as both match.
    const metrics = calculateLineMetrics(
      newItem.quantity, 
      newBox, 
      calculationPallet
    );

    const line: ShipmentLine = {
      id: Date.now().toString(),
      item: { ...newItem },
      box: { ...newBox },
      ...metrics
    };

    setLines(prev => [...prev, line]);
    
    // Reset form
    setNewItem({ ...newItem, name: '', quantity: 100 });
    setSelectedProductId('');
  };

  const removeLine = (id: string) => {
    setLines(prev => prev.filter(l => l.id !== id));
  };

  const recalculateManifest = () => {
    if (lines.length === 0) return;
    
    const calculationPallet = getCalculationPallet();
    
    setLines(prev => prev.map(line => {
      // Recalculate based on existing box config and qty against NEW pallet
      const metrics = calculateLineMetrics(line.item.quantity, line.box, calculationPallet);
      return { ...line, ...metrics };
    }));
  };

  const downloadManifestTemplate = () => {
    const headers = "Name,Quantity,MasterCartonWeight,BoxLength,BoxWidth,BoxHeight,ItemsPerBox";
    const example = "Widget A,500,15.5,12,10,8,20";
    const content = `${headers}\n${example}`;
    
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "manifest_template.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleManifestFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        processManifestCSV(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const processManifestCSV = (csvText: string) => {
    if (!customPallet) return;

    const calculationPallet = getCalculationPallet();
    const newLines: ShipmentLine[] = [];
    const rows = csvText.split('\n');
    
    rows.forEach((row, index) => {
      if (!row.trim()) return;
      // Skip header if matches expected format start
      if (index === 0 && row.toLowerCase().startsWith('name')) return;

      const cols = row.split(',').map(s => s.trim());
      if (cols.length >= 7) {
        const item: ItemInput = {
          name: cols[0],
          quantity: parseFloat(cols[1]) || 0,
        };
        const box: BoxConfig = {
          grossWeight: parseFloat(cols[2]) || 0,
          dimensions: {
            length: parseFloat(cols[3]) || 0,
            width: parseFloat(cols[4]) || 0,
            height: parseFloat(cols[5]) || 0
          },
          itemsPerBox: parseFloat(cols[6]) || 1,
        };
        
        // Note: Manifest CSV is assumed to be in CURRENT Unit System
        // We use it directly because calculateLineMetrics works with the current system values
        
        if (item.name && item.quantity > 0) {
          const metrics = calculateLineMetrics(item.quantity, box, calculationPallet);
          
          newLines.push({
            id: Math.random().toString(36).substr(2, 9),
            item,
            box,
            ...metrics
          });
        }
      }
    });
    
    setLines(prev => [...prev, ...newLines]);
  };

  const handleBulkUploadClick = () => {
    manifestFileRef.current?.click();
  };

  const handlePasteProcess = () => {
    if (!pasteText.trim()) return;

    const rows = pasteText.split(/\r?\n/);
    let addedCount = 0;
    let notFoundCount = 0;
    const newLines: ShipmentLine[] = [];
    const calculationPallet = getCalculationPallet();

    rows.forEach(row => {
        if (!row.trim()) return;
        // Try tab first (Excel default), then comma
        let cols = row.split('\t');
        if (cols.length < 2) cols = row.split(',');

        if (cols.length >= 2) {
            const name = cols[0].trim();
            const qty = parseFloat(cols[1].trim());

            if (name && qty > 0) {
                // Find in catalog
                const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());

                if (product) {
                     // Convert stored Metric box to current system
                     const box = convertBoxConfig(product.box, UnitSystem.METRIC, unitSystem);
                     // Round dimensions to integers to match UI logic
                     box.dimensions.length = Math.round(box.dimensions.length);
                     box.dimensions.width = Math.round(box.dimensions.width);
                     box.dimensions.height = Math.round(box.dimensions.height);

                     const metrics = calculateLineMetrics(qty, box, calculationPallet);
                     newLines.push({
                         id: Math.random().toString(36).substr(2, 9),
                         item: { name: product.name, quantity: qty },
                         box,
                         ...metrics
                     });
                     addedCount++;
                } else {
                    notFoundCount++;
                }
            }
        }
    });

    if (newLines.length > 0) {
        setLines(prev => [...prev, ...newLines]);
    }
    
    setIsPasteModalOpen(false);
    setPasteText('');
    
    if (addedCount > 0 || notFoundCount > 0) {
        alert(`Calculated and added ${addedCount} items.\n${notFoundCount} items were skipped because they weren't found in the Product Catalog.`);
    } else {
        alert('No valid items found. Please check your format (Name <tab> Quantity).');
    }
  };

  // Product Catalog CRUD
  const handleAddProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
  };

  const handleBulkAddProducts = (newProducts: Product[]) => {
    setProducts(prev => [...prev, ...newProducts]);
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };
  
  const handleClearProducts = () => {
    setProducts([]);
    setSelectedProductId('');
  };

  // --- Totals Calculation ---
  const totalStats = lines.reduce((acc, line) => ({
    boxes: acc.boxes + line.totalBoxes,
    weight: acc.weight + line.totalGrossWeight,
    pallets: acc.pallets + line.palletsRequired,
    volume: acc.volume + line.totalVolume
  }), { boxes: 0, weight: 0, pallets: 0, volume: 0 });

  const grandTotalWeight = totalStats.weight;

  // Calculate weights for display in both units
  let weightInLbs = 0;
  let weightInKg = 0;

  if (unitSystem === UnitSystem.IMPERIAL) {
    weightInLbs = grandTotalWeight;
    weightInKg = grandTotalWeight * 0.45359237;
  } else {
    // totalStats.weight is in grams
    weightInKg = grandTotalWeight / 1000;
    weightInLbs = weightInKg * 2.20462262;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">PackMaster Pro</h1>
              <p className="text-xs text-slate-400">Logistics & Palletization</p>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('manifest')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                viewMode === 'manifest' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Manifest</span>
            </button>
            <button
              onClick={() => setViewMode('catalog')}
              className={`px-4 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors ${
                viewMode === 'catalog' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
              <span>Product Catalog</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {viewMode === 'manifest' && (
            <button 
              onClick={() => {
                const newSystem = unitSystem === UnitSystem.METRIC ? UnitSystem.IMPERIAL : UnitSystem.METRIC;
                setUnitSystem(newSystem);
                // When switching systems, convert the current form values to the new system
                setNewBox(prev => {
                   const c = convertBoxConfig(prev, unitSystem, newSystem);
                   // Round dimensions to integers
                   c.dimensions.length = Math.round(c.dimensions.length);
                   c.dimensions.width = Math.round(c.dimensions.width);
                   c.dimensions.height = Math.round(c.dimensions.height);
                   return c;
                });
              }}
              className="px-3 py-1.5 text-xs font-medium rounded border border-slate-700 hover:bg-slate-800 transition-colors"
            >
              {unitSystem === UnitSystem.METRIC ? 'METRIC (mm/g)' : 'IMPERIAL (in/lb)'}
            </button>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {viewMode === 'catalog' ? (
          <ProductCatalog 
            products={products}
            unitSystem={UnitSystem.METRIC}
            onAddProduct={handleAddProduct}
            onBulkAddProducts={handleBulkAddProducts}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            onClearAllProducts={handleClearProducts}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Input Form */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Pallet Configuration */}
              <section className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg">
                <div className="flex items-center space-x-2 mb-4 text-blue-400">
                  <Settings className="w-5 h-5" />
                  <h2 className="font-semibold text-lg">Pallet Configuration</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2">Dimensions (in)</label>
                      <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase">Length</label>
                            <input 
                              type="number"
                              value={customPallet.dimensions.length}
                              onChange={(e) => setCustomPallet({...customPallet, dimensions: {...customPallet.dimensions, length: parseFloat(e.target.value) || 0}})}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-center focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase">Width</label>
                            <input 
                              type="number"
                              value={customPallet.dimensions.width}
                              onChange={(e) => setCustomPallet({...customPallet, dimensions: {...customPallet.dimensions, width: parseFloat(e.target.value) || 0}})}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-center focus:border-blue-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-slate-500 uppercase">Max Height</label>
                            <input 
                              type="number"
                              value={customPallet.dimensions.height}
                              onChange={(e) => setCustomPallet({...customPallet, dimensions: {...customPallet.dimensions, height: parseFloat(e.target.value) || 0}})}
                              className="w-full bg-slate-900 border border-slate-700 rounded px-2 py-1 text-sm text-center focus:border-blue-500 outline-none"
                            />
                          </div>
                      </div>
                    </div>
                </div>
              </section>

              {/* Add Item Form */}
              <section className="bg-slate-800 rounded-xl border border-slate-700 p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-blue-400">
                    <Package className="w-5 h-5" />
                    <h2 className="font-semibold text-lg">Add Item</h2>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Hidden File Input for Manifest */}
                    <input 
                      type="file" 
                      ref={manifestFileRef}
                      onChange={handleManifestFileChange}
                      accept=".csv"
                      className="hidden"
                    />
                    
                    <button 
                      onClick={() => setIsPasteModalOpen(true)}
                      className="text-xs text-blue-400 hover:text-white flex items-center gap-1 font-medium bg-slate-900/50 px-2 py-1 rounded border border-slate-700 hover:border-blue-500 transition-all"
                      title="Paste Order List"
                    >
                      <ClipboardPaste className="w-3 h-3" /> Paste List
                    </button>

                    <button 
                      onClick={downloadManifestTemplate}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                      title="Download CSV Template"
                    >
                      <Download className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={handleBulkUploadClick}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 underline"
                    >
                      <FileSpreadsheet className="w-3 h-3" /> Bulk CSV
                    </button>
                  </div>
                </div>

                <div className="space-y-5">
                  
                  {/* Product Selector */}
                  <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Select from Catalog</label>
                    <div className="flex gap-2">
                      <select 
                        value={selectedProductId} 
                        onChange={(e) => handleProductSelect(e.target.value)}
                        className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none"
                      >
                        <option value="">Custom Item...</option>
                        {products.map(p => (
                          <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                      </select>
                      {selectedProductId && (
                        <button 
                          onClick={() => setViewMode('catalog')}
                          title="Edit in Catalog"
                          className="bg-slate-700 hover:bg-slate-600 text-slate-300 p-2 rounded-lg border border-slate-600 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Details</label>
                    <div>
                      <input
                        type="text"
                        placeholder="Item Name / SKU"
                        value={newItem.name}
                        onChange={e => setNewItem({...newItem, name: e.target.value})}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                      />
                    </div>
                    <div>
                        <label className="block text-xs text-slate-400 mb-1">Total Quantity</label>
                        <input
                          type="number"
                          value={newItem.quantity}
                          onChange={e => setNewItem({...newItem, quantity: parseFloat(e.target.value)})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-semibold text-blue-400"
                        />
                    </div>
                  </div>

                  {/* Packing Details */}
                  <div className="space-y-3 pt-4 border-t border-slate-700">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                      <span>Box Configuration</span>
                      <Cuboid className="w-4 h-4" />
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Items Per Box</label>
                        <input
                          type="number"
                          value={newBox.itemsPerBox}
                          onChange={e => setNewBox({...newBox, itemsPerBox: parseFloat(e.target.value)})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="col-span-2 grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Len ({unitLabels.dim})</label>
                          <input
                            type="number"
                            step="1"
                            value={newBox.dimensions.length}
                            onChange={e => setNewBox({...newBox, dimensions: {...newBox.dimensions, length: parseInt(e.target.value) || 0}})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Wid ({unitLabels.dim})</label>
                          <input
                            type="number"
                            step="1"
                            value={newBox.dimensions.width}
                            onChange={e => setNewBox({...newBox, dimensions: {...newBox.dimensions, width: parseInt(e.target.value) || 0}})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Hgt ({unitLabels.dim})</label>
                          <input
                            type="number"
                            step="1"
                            value={newBox.dimensions.height}
                            onChange={e => setNewBox({...newBox, dimensions: {...newBox.dimensions, height: parseInt(e.target.value) || 0}})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                          />
                        </div>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs text-slate-400 mb-1">Master Carton Weight ({unitLabels.weight})</label>
                        <input
                          type="number"
                          value={newBox.grossWeight}
                          onChange={e => setNewBox({...newBox, grossWeight: parseFloat(e.target.value)})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={addLine}
                    disabled={!newItem.name}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add to Manifest</span>
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column: Dashboard & Manifest */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Top Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs uppercase mb-1">Total Boxes</p>
                  <p className="text-2xl font-bold text-white">{totalStats.boxes}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs uppercase mb-1">Net Pallets</p>
                  <p className="text-2xl font-bold text-blue-400">{Math.ceil(totalStats.pallets)} <span className="text-sm font-normal text-slate-500">({totalStats.pallets.toFixed(1)})</span></p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs uppercase mb-1">Total Weight (lb)</p>
                  <p className="text-2xl font-bold text-white">{weightInLbs.toLocaleString(undefined, {maximumFractionDigits: 1})}</p>
                </div>
                <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                  <p className="text-slate-400 text-xs uppercase mb-1">Total Weight (kg)</p>
                  <p className="text-2xl font-bold text-white">{weightInKg.toLocaleString(undefined, {maximumFractionDigits: 1})}</p>
                </div>
              </div>

              {/* Manifest Table */}
              <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
                <div className="p-4 border-b border-slate-700 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-200">Shipment Manifest</h3>
                  <div className="flex items-center space-x-3">
                    {lines.length > 0 && (
                      <button 
                        onClick={recalculateManifest}
                        className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                        title="Recalculate needed pallets based on current configuration"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Recalculate Pallets
                      </button>
                    )}
                    {lines.length > 0 && (
                      <button 
                        onClick={() => setLines([])}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
                      <tr>
                        <th className="px-6 py-3">Item</th>
                        <th className="px-6 py-3">Packing</th>
                        <th className="px-6 py-3">Boxes</th>
                        <th className="px-6 py-3">Weight</th>
                        <th className="px-6 py-3 text-center">Pallets</th>
                        <th className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {lines.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                            <Calculator className="w-10 h-10 mx-auto mb-3 opacity-20" />
                            No items in manifest. Add an item to calculate requirements.
                          </td>
                        </tr>
                      ) : (
                        lines.map((line) => (
                          <tr key={line.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-white">
                              <div>{line.item.name}</div>
                              <div className="text-xs text-slate-500">Qty: {line.item.quantity}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-xs">
                                <span className="text-slate-400">Box:</span> {line.box.dimensions.length}x{line.box.dimensions.width}x{line.box.dimensions.height}
                              </div>
                              <div className="text-xs">
                                <span className="text-slate-400">Count:</span> {line.box.itemsPerBox}/box
                              </div>
                            </td>
                            <td className="px-6 py-4 text-white font-medium">
                              {line.totalBoxes}
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-white">{line.totalGrossWeight.toFixed(1)} {unitLabels.weight}</div>
                              <div className="text-[10px] text-slate-500">{line.box.grossWeight} {unitLabels.weight}/ctn</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex flex-col items-center">
                                <span className="bg-blue-900/50 text-blue-200 px-2 py-1 rounded text-xs font-bold border border-blue-800">
                                  {line.palletsRequired.toFixed(2)}
                                </span>
                                <span className="text-[10px] text-slate-500 mt-1">
                                  {line.boxesPerPallet} box/plt
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <button 
                                onClick={() => removeLine(line.id)}
                                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Calculation Explanation */}
                {lines.length > 0 && (
                  <div className="p-4 bg-slate-900/30 border-t border-slate-700 text-xs text-slate-500 flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                    <p>
                      Pallet estimation assumes optimal stacking pattern ({lines[0].boxesPerLayer} boxes/layer × {lines[0].palletLayers} layers). 
                      Actual requirements may vary based on stacking stability, overhang constraints, and packing materials.
                      Gross weight is calculated based on Master Carton Weight.
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}
      </main>

      {/* Paste Order List Modal */}
      {isPasteModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-4 border-b border-slate-800">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        <ClipboardPaste className="w-5 h-5 text-blue-400" />
                        Paste Order List
                    </h3>
                    <button onClick={() => setIsPasteModalOpen(false)}><X className="w-5 h-5 text-slate-400 hover:text-white" /></button>
                </div>
                <div className="p-4 flex-1 overflow-auto">
                    <p className="text-sm text-slate-400 mb-4 bg-slate-800 p-3 rounded border border-slate-700">
                        Copy two columns from Excel/Sheets <strong>(Name & Quantity)</strong> and paste below.<br/>
                        <span className="text-xs text-slate-500 mt-1 block">Items will be matched against your Product Catalog.</span>
                    </p>
                    <textarea 
                        autoFocus
                        className="w-full h-64 bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-mono text-slate-200 focus:border-blue-500 outline-none"
                        placeholder={`Standard Widget\t500\nCompact Gadget\t200`}
                        value={pasteText}
                        onChange={e => setPasteText(e.target.value)}
                    />
                </div>
                <div className="p-4 border-t border-slate-800 flex justify-end gap-2">
                     <button 
                        onClick={() => setIsPasteModalOpen(false)} 
                        className="px-4 py-2 text-sm text-slate-400 hover:text-white"
                     >
                        Cancel
                     </button>
                     <button 
                        onClick={handlePasteProcess} 
                        disabled={!pasteText.trim()}
                        className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                     >
                        Calculate & Add
                     </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
