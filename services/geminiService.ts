import { GoogleGenAI, Type } from "@google/genai";
import type { ComplexityResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const complexitySchema = {
  type: Type.OBJECT,
  properties: {
    timeComplexity: {
      type: Type.STRING,
      description: "The Big O notation for the time complexity, e.g., O(n), O(n log n), O(n^2)."
    },
    spaceComplexity: {
      type: Type.STRING,
      description: "The Big O notation for the space complexity, e.g., O(n), O(1)."
    },
    explanation: {
      type: Type.STRING,
      description: "A concise, clear explanation for the complexities. Use Markdown for formatting: backticks (`) for inline code/variables (e.g., `n`, `factorial()`) and double asterisks (**) for highlighting key terms (e.g., **recursion**)."
    }
  },
  required: ["timeComplexity", "spaceComplexity", "explanation"]
};

export const analyzeCodeComplexity = async (code: string, language: string): Promise<ComplexityResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the time and space complexity of the following ${language} code snippet. Provide the result in Big O notation.
      
      \`\`\`${language}
      ${code}
      \`\`\`
      `,
      config: {
        systemInstruction: "You are an expert algorithm analyst specializing in competitive programming. Your task is to determine the time and space complexity of the given code and provide a clear, concise explanation.",
        responseMimeType: "application/json",
        responseSchema: complexitySchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    
    return {
      timeComplexity: result.timeComplexity || 'N/A',
      spaceComplexity: result.spaceComplexity || 'N/A',
      explanation: result.explanation || 'No explanation provided.'
    };

  } catch (error) {
    console.error("Error analyzing code with Gemini API:", error);
    throw new Error("Failed to get a valid analysis from the AI model.");
  }
};