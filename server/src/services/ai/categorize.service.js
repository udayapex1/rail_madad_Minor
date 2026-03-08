

import dotenv from "dotenv";
dotenv.config();

const VALID_CATEGORIES = ["Cleanliness", "Damage", "Staff Behaviour", "Security", "Facilities", "Other"];
const VALID_URGENCIES  = ["Low", "Medium", "High"];

export const categorizeComplaint = async (imageUrl, extractedText = "") => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization":      `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "X-OpenRouter-Title": "Rail Madad",
        "Content-Type":       "application/json",
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
                  Analyze this image and return category + urgency both.
                  ${extractedText ? `Extra context: ${extractedText}` : ""}

                  Categories:
                  - Cleanliness     → dirty coach, garbage, foul smell, unclean toilets
                  - Damage          → broken seat, window, door, light, minor property damage
                  - Staff Behaviour → rude staff, TTE misconduct, misbehaviour
                  - Security        → fire, fight, harassment, SOS, overcrowding,
                                      derailment, accident, collision, explosion, theft
                  - Facilities      → no water, AC not working, no bedroll, no electricity
                  - Other           → anything that does not fit above

                  Urgency rules:
                  - High   → Security, accident, fire, injury, life threat
                  - Medium → Damage, Facilities, Staff Behaviour
                  - Low    → Cleanliness, minor issues

                  Priority rules:
                  1. Accident, derailment, collision → ALWAYS "Security" + "High"
                  2. Danger to human life            → ALWAYS "Security" + "High"
                  3. "Damage" = only minor property damage

                  Reply in this EXACT format only, no extra text:
                  {"category":"Cleanliness","urgency":"Low","confidence":0.92,"description":"Garbage on coach floor"}
                `,
              },
              {
                type: "image_url",
                image_url: { url: imageUrl },
              },
            ],
          },
        ],
      }),
    });

    const data    = await response.json();
    const raw     = data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed  = JSON.parse(cleaned);

    // hard enforce both fields
    const category = VALID_CATEGORIES.includes(parsed.category) ? parsed.category : "Other";
    const urgency  = VALID_URGENCIES.includes(parsed.urgency)   ? parsed.urgency  : "Low";

    return {
      category,
      urgency,
      confidence:  parsed.confidence  || 0.5,
      description: parsed.description || "",
    };

  } catch (error) {
    console.error("Categorization failed:", error.message);

    // rule based fallback
    return {
      category:    "Other",
      urgency:     "Low",
      confidence:  0,
      description: "AI categorization failed — manual review needed",
    };
  }
};