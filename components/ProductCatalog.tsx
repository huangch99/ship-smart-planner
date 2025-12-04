
import React, { useState, useRef } from 'react';
import { Package, Plus, Pencil, Trash2, X, Save, Cuboid, FileSpreadsheet, Download } from 'lucide-react';
import { Product, BoxConfig, UnitSystem } from '../types';
import { convertBoxConfig } from '../utils/calculations';

interface ProductCatalogProps {
  products: Product[];
  unitSystem: UnitSystem;
  onAddProduct: (product: Product) => void;
  onBulkAddProducts: (products: Product[]) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onClearAllProducts: () => void;
}

const INITIAL_BOX: BoxConfig = {
  itemsPerBox: 10,
  dimensions: { length: 30, width: 20, height: 15 },
  grossWeight: 10
};

const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  products, 
  unitSystem, 
  onAddProduct, 
  onBulkAddProducts,
  onUpdateProduct, 
  onDeleteProduct,
  onClearAllProducts
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form State - Always tracks value in CURRENT Unit System
  const [name, setName] = useState('');
  const [box, setBox] = useState<BoxConfig>(INITIAL_BOX);

  const unitLabels = {
    dim: unitSystem === UnitSystem.METRIC ? 'mm' : 'in',
    weight: unitSystem === UnitSystem.METRIC ? 'g' : 'lb',
  };

  const startEdit = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setName(product.name);
      // Convert stored METRIC value to ACTIVE System for editing
      setBox(convertBoxConfig(product.box, UnitSystem.METRIC, unitSystem));
    } else {
      setEditingId(null);
      setName('');
      // Reset to initial (which we can assume is generic, but let's make it metric-safe default)
      const defaultMetric: BoxConfig = {
        itemsPerBox: 10,
        dimensions: { length: 500, width: 400, height: 300 },
        grossWeight: 5000
      };
      setBox(convertBoxConfig(defaultMetric, UnitSystem.METRIC, unitSystem));
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!name) return;

    // Convert FORM value (Active System) back to METRIC for storage
    const storageBox = convertBoxConfig(box, unitSystem, UnitSystem.METRIC);

    const productData: Product = {
      id: editingId || Date.now().toString(),
      name,
      box: storageBox
    };

    if (editingId) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }
    setIsEditing(false);
  };

  const downloadTemplate = () => {
    // Template reflects CURRENT Unit System expectations
    const headers = "Name,ItemsPerBox,Length,Width,Height,MasterCartonWeight";
    const example = unitSystem === UnitSystem.METRIC 
      ? "Example Widget,12,600,400,300,15000"
      : "Example Widget,12,24,16,12,33";
    const content = `${headers}\n${example}`;
    
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `catalog_template_${unitSystem.toLowerCase()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        processCSV(text);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const processCSV = (csvText: string) => {
    const newProducts: Product[] = [];
    const rows = csvText.split('\n');
    
    rows.forEach((row, index) => {
      if (!row.trim()) return;
      if (index === 0 && row.toLowerCase().startsWith('name')) return;

      const cols = row.split(',').map(s => s.trim());
      if (cols.length >= 6) {
        // Parse row using CURRENT Unit System
        const rawBox: BoxConfig = {
          itemsPerBox: parseFloat(cols[1]) || 1,
          dimensions: {
            length: parseFloat(cols[2]) || 0,
            width: parseFloat(cols[3]) || 0,
            height: parseFloat(cols[4]) || 0
          },
          grossWeight: parseFloat(cols[5]) || 0
        };

        // Convert to Metric for Storage
        const storageBox = convertBoxConfig(rawBox, unitSystem, UnitSystem.METRIC);

        const product: Product = {
          id: Math.random().toString(36).substr(2, 9),
          name: cols[0],
          box: storageBox
        };

        if (product.name && product.box.itemsPerBox > 0) {
          newProducts.push(product);
        }
      }
    });
    
    if (newProducts.length > 0) {
      onBulkAddProducts(newProducts);
    } else {
      alert("No valid products found in CSV.");
    }
  };

  const handleClearAllClick = () => {
    if (window.confirm("Are you sure you want to DELETE ALL products from the catalog? This action cannot be undone.")) {
      onClearAllProducts();
    }
  };

  if (isEditing) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-lg max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {editingId ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Basic Info</label>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Product Name / SKU</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:border-blue-500 outline-none"
                placeholder="e.g. Widget A"
              />
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-700">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
              <Cuboid className="w-4 h-4 mr-2" />
              Default Box Configuration ({unitLabels.dim}/{unitLabels.weight})
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Items Per Box</label>
                <input
                  type="number"
                  value={box.itemsPerBox}
                  onChange={e => setBox({...box, itemsPerBox: parseFloat(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div className="col-span-2 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Length</label>
                  <input
                    type="number"
                    value={box.dimensions.length}
                    onChange={e => setBox({...box, dimensions: {...box.dimensions, length: parseFloat(e.target.value)}})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Width</label>
                  <input
                    type="number"
                    value={box.dimensions.width}
                    onChange={e => setBox({...box, dimensions: {...box.dimensions, width: parseFloat(e.target.value)}})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Height</label>
                  <input
                    type="number"
                    value={box.dimensions.height}
                    onChange={e => setBox({...box, dimensions: {...box.dimensions, height: parseFloat(e.target.value)}})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-2 text-sm text-center"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1">Master Carton Weight</label>
                <input
                  type="number"
                  value={box.grossWeight}
                  onChange={e => setBox({...box, grossWeight: parseFloat(e.target.value)})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleSave}
              disabled={!name}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Product</span>
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white">Product Catalog</h2>
          <p className="text-sm text-slate-400">Manage your standardized product and packaging definitions</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".csv"
            className="hidden"
          />

          <button
            onClick={downloadTemplate}
            className="text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
            title="Download CSV Template"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Template</span>
          </button>
          <button
            onClick={handleImportClick}
            className="text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span className="hidden sm:inline">Bulk Import</span>
          </button>
          
          {products.length > 0 && (
            <button
              onClick={handleClearAllClick}
              className="text-red-400 hover:text-red-300 hover:bg-slate-700 px-3 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm"
              title="Delete All Products"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Delete All</span>
            </button>
          )}

          <button
            onClick={() => startEdit()}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Product</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-300">
            <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
              <tr>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Box Dims ({unitLabels.dim})</th>
                <th className="px-6 py-3">Items/Box</th>
                <th className="px-6 py-3">Master Carton Wt ({unitLabels.weight})</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Package className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    No products in catalog. Create one or upload CSV to get started.
                  </td>
                </tr>
              ) : (
                products.map((product) => {
                  // Convert Stored METRIC to Displayed ACTIVE System
                  const displayBox = convertBoxConfig(product.box, UnitSystem.METRIC, unitSystem);
                  
                  return (
                    <tr key={product.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {displayBox.dimensions.length.toFixed(1)}×{displayBox.dimensions.width.toFixed(1)}×{displayBox.dimensions.height.toFixed(1)}
                      </td>
                      <td className="px-6 py-4">
                        {product.box.itemsPerBox}
                      </td>
                      <td className="px-6 py-4">
                        {displayBox.grossWeight.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => startEdit(product)}
                            className="p-1 text-slate-400 hover:text-blue-400 hover:bg-slate-700/50 rounded transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onDeleteProduct(product.id)}
                            className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-700/50 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
