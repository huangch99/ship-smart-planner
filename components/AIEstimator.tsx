import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Loader2, X } from 'lucide-react';
import { analyzeShipment } from '../services/geminiService';
import { AIAnalysisResult } from '../types';

interface AIEstimatorProps {
  onEstimateComplete: (result: AIAnalysisResult) => void;
}

const AIEstimator: React.FC<AIEstimatorProps> = ({ onEstimateComplete }) => {
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!description && !imagePreview) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const prompt = description || "Analyze this image for shipping dimensions.";
      const result = await analyzeShipment(prompt, imagePreview || undefined);
      onEstimateComplete(result);
    } catch (err) {
      setError("Failed to generate estimate. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center space-x-2 text-indigo-600 mb-2">
        <Sparkles className="w-5 h-5" />
        <h3 className="font-semibold text-lg">AI Assistant</h3>
      </div>
      
      <p className="text-sm text-slate-500">
        Describe your item or upload a photo. Gemini will estimate the package size and weight.
      </p>

      {/* Image Upload Area */}
      <div className="relative group">
        {imagePreview ? (
          <div className="relative w-full h-48 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 bg-slate-900/70 text-white p-1 rounded-full hover:bg-slate-900 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-indigo-400 hover:text-indigo-500 transition-colors bg-slate-50"
          >
            <Camera className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Click to upload photo</span>
          </button>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {/* Text Input */}
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="E.g., A standard microwave oven in its original box..."
          className="w-full p-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none h-24"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={handleAnalyze}
        disabled={isAnalyzing || (!description && !imagePreview)}
        className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all ${
          isAnalyzing || (!description && !imagePreview)
            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
        }`}
      >
        {isAnalyzing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span>Estimate Dimensions</span>
          </>
        )}
      </button>
      
      {error && (
        <p className="text-xs text-red-500 mt-2 text-center">{error}</p>
      )}
    </div>
  );
};

export default AIEstimator;