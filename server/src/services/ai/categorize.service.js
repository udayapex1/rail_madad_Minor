// src/services/ai/categorize.service.js

import dotenv from "dotenv";
dotenv.config();

const VALID_CATEGORIES = [
  "Cleanliness",
  "Damage",
  "Staff Behaviour",
  "Security",
  "Facilities",
  "Other",
];

export const categorizeComplaint = async (imageUrl, extractedText = "") => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        //   "HTTP-Referer": process.env.SITE_URL,
          "X-OpenRouter-Title": "Rail Madad",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-vl-235b-a22b-thinking",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `
                  You are an AI for Indian Railways complaint management system.
                  Analyze this image carefully and classify the complaint.
                  ${extractedText ? `Extra context from image: ${extractedText}` : ""}

                  You MUST return ONLY one of these exact category names:
                  "Cleanliness" | "Damage" | "Staff Behaviour" | "Security" | "Facilities" | "Other"

                  Category rules:
                  - Cleanliness     → dirty coach, garbage, foul smell, unclean toilets
- Damage          → broken seat, window, door, light, damaged property
- Staff Behaviour → rude staff, TTE misconduct, misbehaviour
- Security        → fire, fight, harassment, SOS, overcrowding,
                    derailment, accident, collision, explosion, theft
- Facilities      → no water, AC not working, no bedroll, no electricity
- Other           → anything that does not fit above

Important priority rules:
1. If image shows accident, derailment or collision → ALWAYS "Security"
2. If image shows any danger to human life → ALWAYS "Security"
3. "Damage" is only for minor property damage (broken seat, window)
                  Reply in this exact format:
                  {"category":"Cleanliness","confidence":0.92,"description":"Garbage and dirt visible on coach floor"}
                `,
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();
    const raw = data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // hard enforce valid category — even if AI hallucinates
    const category = VALID_CATEGORIES.includes(parsed.category)
      ? parsed.category
      : "Other";

    return {
      category,
      confidence: parsed.confidence || 0.5,
      description: parsed.description || "",
    };
  } catch (error) {
    console.error("Categorization failed:", error.message);
    return {
      category: "Other",
      confidence: 0,
      description: "AI categorization failed — manual review needed",
    };
  }
};
