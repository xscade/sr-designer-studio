import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Allow streaming responses up to 60 seconds (Vercel Pro limit, Hobby is 10s usually but this config helps if upgraded)
export const maxDuration = 60; 
export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const { prompt, image, mimeType } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("❌ Error: GEMINI_API_KEY is missing");
      return NextResponse.json({ error: "Gemini API key not configured." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    // Using gemini-3-pro-image-preview for both modes as requested previously
    const modelName = 'gemini-3-pro-image-preview'; 

    console.log("🚀 Generating 3 angles...");

    // Define the 3 angle variations
    const angles = [
      "Cinematic front view, wide angle, photorealistic, detailed interior design",
      "Isometric or 45-degree corner view, showcasing depth and layout, photorealistic",
      "Detailed close-up perspective or alternative angle focusing on textures and furniture"
    ];

    // Create 3 promises for parallel generation
    const generatePromises = angles.map(async (angleModifier) => {
      const modifiedPrompt = `${prompt}. ${angleModifier}`;
      
      let contents = {};
      
      if (image && mimeType) {
        // Image + Text Mode
        contents = {
          parts: [
            {
              inlineData: {
                data: image,
                mimeType: mimeType,
              },
            },
            { text: modifiedPrompt },
          ],
        };
      } else {
        // Text Only Mode
        contents = {
          parts: [{ text: modifiedPrompt }]
        };
      }

      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            imageConfig: {
              aspectRatio: "4:3", // Slightly taller for grid layout
              count: 1 // We make separate requests to ensure different angles via prompt
            }
          }
        });

        // Extract image
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            const base64ImageBytes = part.inlineData.data;
            const imageMimeType = part.inlineData.mimeType || 'image/png';
            return `data:${imageMimeType};base64,${base64ImageBytes}`;
          }
        }
        return null;
      } catch (e) {
        console.error(`Failed to generate angle '${angleModifier}':`, e.message);
        return null;
      }
    });

    const results = await Promise.all(generatePromises);
    
    // Filter out any nulls (failed generations)
    const validImages = results.filter(img => img !== null);

    if (validImages.length === 0) {
      return NextResponse.json({ error: "Failed to generate any images." }, { status: 500 });
    }

    console.log(`✅ Successfully generated ${validImages.length} images`);
    return NextResponse.json({ results: validImages });

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json({ 
        error: "Failed to generate content", 
        details: error.message 
    }, { status: 500 });
  }
}
