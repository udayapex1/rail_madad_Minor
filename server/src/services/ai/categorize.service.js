

import dotenv from "dotenv";
dotenv.config();

const VALID_CATEGORIES = ["Cleanliness", "Damage", "Staff Behaviour", "Security", "Facilities", "Other"];
const VALID_URGENCIES = ["Low", "Medium", "High"];

export const categorizeComplaint = async (imageUrl, extractedText = "") => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
                text: `You are an expert AI system for the Indian Railways grievance management platform.
Your task is to analyze the provided image (and optional text) and categorize the passenger complaint accurately.
${extractedText ? `Additional passenger context: "${extractedText}"` : ""}

CATEGORIES:
- Cleanliness: Dirty coach, platforms, foul smell, garbage, pests, unclean toilets.
- Damage: Broken seats, windows, doors, lights, fans, minor property damage.
- Staff Behaviour: Rude staff, TTE misconduct, bribery, unhelpful personnel.
- Security: Fire, harassment, fights, theft, unauthorized persons, overcrowding, derailment, collision.
- Facilities: No water, AC malfunctioning, no bedroll, power outage, non-functional charging ports.
- Other: Anything that strictly does not fit the above categories.

URGENCY RULES:
- High: Immediate threat to life, safety, or severe operational disruption (Security, major accidents, fire).
- Medium: Discomfort or service failure but not life-threatening (Facilities, Staff Behaviour, Damage).
- Low: Minor inconveniences (Cleanliness, minor aesthetic damage).

CRITICAL PRIORITIES:
1. Derailments, collisions, or danger to human life MUST be "Security" + "High".
2. If multiple issues are present, categorize based on the MOST severe/urgent issue.

OUTPUT FORMAT:
Respond ONLY with a valid, minified JSON object. Do not include markdown code blocks, explanation, or any other text.
{"category":"Cleanliness","urgency":"Low","confidence":0.95,"description":"Short, 1-sentence summary of the issue."}`,
              },
              ...(imageUrl ? [
                {
                  type: "image_url",
                  image_url: { url: imageUrl },
                }
              ] : []),
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    const data = await response.json();
    console.log({
      model: data.model,
      usage: data.usage,
      content: data?.choices?.[0]?.message?.content,
    });

    if (!data.choices || data.choices.length === 0) {
      throw new Error(
        `OpenRouter Error: ${data.error?.message || JSON.stringify(data)}`
      );
    }

    const raw = data.choices[0].message.content;
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    // hard enforce both fields
    const category = VALID_CATEGORIES.includes(parsed.category) ? parsed.category : "Other";
    const urgency = VALID_URGENCIES.includes(parsed.urgency) ? parsed.urgency : "Low";

    return {
      category,
      urgency,
      confidence: parsed.confidence || 0.5,
      description: parsed.description || "",
    };

  } catch (error) {
    console.error("Categorization failed:", error.message);

    // rule based fallback
    return {
      category: "Other",
      urgency: "Low",
      confidence: 0,
      description: "AI categorization failed — manual review needed",
    };
  }
};