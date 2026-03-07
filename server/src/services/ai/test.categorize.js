// src/services/ai/test.categorize.js

import { categorizeComplaint } from "./categorize.service.js";

// public image URL for testing (dirty train coach)
const testImageUrl = "https://thumbs.dreamstime.com/b/broke-shattered-glass-window-train-cabine-old-railway-114523852.jpg";

const test = async () => {
  console.log("Testing categorize service...\n");

  const result = await categorizeComplaint(testImageUrl, "");

  console.log("Result:", result);
};

test();