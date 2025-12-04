import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AIAnalysisResult, UnitSystem } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    length: { type: Type.NUMBER, description: "Estimated length of the package." },
    width: { type: Type.NUMBER, description: "Estimated width of the package." },
    height: { type: Type.NUMBER, description: "Estimated height of the package." },
    weight: { type: Type.NUMBER, description: "Estimated weight of the package." },
    unitSystem: { type: Type.STRING, enum: ["METRIC", "IMPERIAL"], description: "The unit system used for the estimates." },
    detectedItem: { type: Type.STRING, description: "Short name of the detected or described item." },
    reasoning: { type: Type.STRING, description: "Brief explanation of how the dimensions were estimated based on standard sizes or visual cues." },
    confidence: { type: Type.STRING, enum: ["HIGH", "MEDIUM", "LOW"], description: "Confidence level of the estimation." }
  },
  required: ["length", "width", "height", "weight", "unitSystem", "detectedItem", "reasoning", "confidence"]
};

export const analyzeShipment = async (
  prompt: string,
  imageData?: string
): Promise<AIAnalysisResult> => {
  try {
    const parts: any[] = [{ text: prompt }];

    if (imageData) {
      parts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData.split(',')[1] // Remove data URL prefix
        }
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: parts
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: `You are an expert logistics and shipping estimator. 
        Your goal is to estimate the physical dimensions (bounding box) and weight of an object for shipping purposes.
        
        If an image is provided:
        1. Identify the object.
        2. Estimate its real-world size based on standard object sizes or visual reference points.
        3. Add padding for packaging (box) dimensions (usually +2-5cm or +1-2 inches per side).
        
        If only text is provided:
        1. Infer standard dimensions for the described object.
        2. Estimate typical shipping weight.
        
        Always return realistic, safe estimates for shipping. If unsure, err on the side of a slightly larger standard box size.
        Ensure unit consistency. If the user implies metric (cm/kg), use METRIC. If imperial (in/lb), use IMPERIAL. Default to METRIC if ambiguous.`
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // Normalize to the requested return type if needed, but schema matches closely
    return {
      length: result.length,
      width: result.width,
      height: result.height,
      weight: result.weight,
      unitSystem: result.unitSystem === 'IMPERIAL' ? UnitSystem.IMPERIAL : UnitSystem.METRIC,
      confidence: result.confidence,
      reasoning: result.reasoning,
      detectedItem: result.detectedItem
    };

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Failed to analyze shipment data.");
  }
};