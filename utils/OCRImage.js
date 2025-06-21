/**
 * Extract nutrition facts from OCR results
 * @param {Array} ocrResults - Array of OCR line objects
 * @returns {Object} - Object containing extracted nutrition values
 */
function extractNutritionFacts(ocrResults) {
  // Initialize results object with null values
  const results = {
    calories: null,
    totalFat: null,
    totalCarbohydrate: null,
    protein: null,
  };

  // Helper function to find similar text using fuzzy matching
  function findSimilarText(text, keyword) {
    text = text.toLowerCase();
    keyword = keyword.toLowerCase();

    // Direct match
    if (text.includes(keyword)) {
      return true;
    }

    // Handle common OCR errors
    if (
      keyword === "calories" &&
      (text.includes("calorie") || text.includes("cal"))
    ) {
      return true;
    }
    if (keyword === "fat" && (text.includes("fa") || text.includes("ft"))) {
      return true;
    }
    if (
      keyword === "carbohydrate" &&
      (text.includes("carb") || text.includes("carbo"))
    ) {
      return true;
    }
    if (
      keyword === "protein" &&
      (text.includes("protei") || text.includes("proten"))
    ) {
      return true;
    }

    return false;
  }

  // Helper function to extract numeric value with unit from text
  function extractValueWithUnit(text) {
    // Match patterns like "5g", "10mg", "2.5g", etc.
    const match = text.match(/(\d+\.?\d*)([a-zA-Z]+)?/);
    if (match) {
      return {
        value: parseFloat(match[1]),
        unit: match[2] || "",
      };
    }
    return null;
  }

  // Process each line from OCR results
  ocrResults.forEach((line) => {
    const lineText = line.LineText.toLowerCase();

    // Check for Calories
    if (findSimilarText(lineText, "calories")) {
      // If calories is on its own line
      if (lineText === "calories" && line.Words.length === 1) {
        // Look for the value in nearby lines
        const valueLines = ocrResults.filter(
          (l) =>
            Math.abs(l.MinTop - line.MinTop) < 50 && l.LineText.match(/^\d+$/)
        );

        if (valueLines.length > 0) {
          results.calories = parseInt(valueLines[0].LineText);
        }
      } else {
        // Extract number from the same line
        const words = line.Words.map((w) => w.WordText.toLowerCase());
        const caloriesIndex = words.findIndex((w) =>
          findSimilarText(w, "calories")
        );

        if (caloriesIndex !== -1 && caloriesIndex + 1 < words.length) {
          const potentialValue = words[caloriesIndex + 1];
          const numericMatch = potentialValue.match(/^(\d+)$/);
          if (numericMatch) {
            results.calories = parseInt(numericMatch[1]);
          }
        } else {
          // Try to extract number from the line text
          const numericMatch = lineText.match(/calories\s*(\d+)/i);
          if (numericMatch) {
            results.calories = parseInt(numericMatch[1]);
          }
        }
      }
    }

    // Check for Total Fat
    if (findSimilarText(lineText, "total fat")) {
      const valueWithUnit = extractValueWithUnit(lineText);
      if (valueWithUnit) {
        results.totalFat = valueWithUnit.value + valueWithUnit.unit;
      }
    }

    // Check for Total Carbohydrate
    if (findSimilarText(lineText, "total carbohydrate")) {
      const valueWithUnit = extractValueWithUnit(lineText);
      if (valueWithUnit) {
        results.totalCarbohydrate = valueWithUnit.value + valueWithUnit.unit;
      }
    }

    // Check for Protein
    if (findSimilarText(lineText, "protein")) {
      const valueWithUnit = extractValueWithUnit(lineText);
      if (valueWithUnit) {
        results.protein = valueWithUnit.value + valueWithUnit.unit;
      }
    }
  });

  // Handle cases where values weren't found in expected format
  // Look for isolated numbers near keywords
  if (results.calories === null) {
    const caloriesLine = ocrResults.find((line) =>
      findSimilarText(line.LineText, "calories")
    );

    if (caloriesLine) {
      // Find nearby numeric values
      ocrResults.forEach((line) => {
        if (Math.abs(line.MinTop - caloriesLine.MinTop) < 50) {
          const numMatch = line.LineText.match(/^(\d+)$/);
          if (numMatch) {
            results.calories = parseInt(numMatch[1]);
          }
        }
      });
    }
  }

  return results;
}

/**
 * Process OCR results specifically for nutrition labels
 * with more robust detection for common formats
 * @param {Array} ocrResults - Array of OCR line objects
 * @returns {Object} - Object containing extracted nutrition values
 */
export function processNutritionLabel(ocrResults) {
  // First try the basic extraction
  const basicResults = extractNutritionFacts(ocrResults);

  // If we're missing values, try more advanced techniques
  if (
    !basicResults.calories ||
    !basicResults.totalFat ||
    !basicResults.totalCarbohydrate ||
    !basicResults.protein
  ) {
    // Look for specific nutrition facts patterns
    const nutritionLines = ocrResults.map((line) => ({
      text: line.LineText.toLowerCase(),
      top: line.MinTop,
      height: line.MaxHeight,
      words: line.Words.map((w) => w.WordText.toLowerCase()),
    }));

    // Sort by vertical position
    nutritionLines.sort((a, b) => a.top - b.top);

    // Find "Amount Per Serving" line to establish the serving section
    const servingLineIndex = nutritionLines.findIndex(
      (line) =>
        line.text.includes("amount per serving") ||
        (line.text.includes("amount") && line.text.includes("serving"))
    );

    if (servingLineIndex !== -1) {
      // Process lines after "Amount Per Serving"
      const nutritionSection = nutritionLines.slice(servingLineIndex);

      // Get Calories - typically right after "Amount Per Serving"
      if (!basicResults.calories) {
        const caloriesLineIndex = nutritionSection.findIndex((line) =>
          line.text.includes("calorie")
        );

        if (caloriesLineIndex !== -1) {
          // Check if value is on the same line
          const caloriesLine = nutritionSection[caloriesLineIndex];
          const numMatch = caloriesLine.text.match(/(\d+)/);

          if (numMatch) {
            basicResults.calories = parseInt(numMatch[1]);
          } else if (caloriesLineIndex + 1 < nutritionSection.length) {
            // Check next line for just a number
            const nextLine = nutritionSection[caloriesLineIndex + 1];
            const nextNumMatch = nextLine.text.match(/^(\d+)$/);
            if (nextNumMatch) {
              basicResults.calories = parseInt(nextNumMatch[1]);
            }
          }

          // Look for nearby standalone numbers (often on the right side)
          for (let i = 0; i < ocrResults.length; i++) {
            const line = ocrResults[i];
            if (
              Math.abs(line.MinTop - nutritionSection[caloriesLineIndex].top) <
              50
            ) {
              if (line.LineText.match(/^\s*\d+\s*$/)) {
                basicResults.calories = parseInt(line.LineText.trim());
                break;
              }
            }
          }
        }
      }

      // Look for protein which might be missing
      if (!basicResults.protein) {
        // In standard nutrition labels, protein is typically near the bottom
        const proteinLine = nutritionLines.find((line) =>
          line.text.includes("protein")
        );

        if (proteinLine) {
          const match = proteinLine.text.match(
            /protein\s*(\d+\.?\d*)([a-zA-Z]+)?/i
          );
          if (match) {
            basicResults.protein = match[1] + (match[2] || "g");
          }
        }
      }
    }
  }

  // Return the results, converting any found values to strings for consistency
  return {
    calories:
      basicResults.calories !== null ? String(basicResults.calories) : null,
    totalFat:
      basicResults.totalFat !== null ? String(basicResults.totalFat) : null,
    totalCarbohydrate:
      basicResults.totalCarbohydrate !== null
        ? String(basicResults.totalCarbohydrate)
        : null,
    protein:
      basicResults.protein !== null ? String(basicResults.protein) : null,
  };
}

// Example usage:
// const nutritionFacts = processNutritionLabel(ocrResults);
// console.log(nutritionFacts);

export function cleanNutritionValues(nutritionObj) {
  const keys = Object.keys(nutritionObj);

  const allNull = keys.every((key) => nutritionObj[key] === null);
  if (allNull) return nutritionObj;

  const cleaned = {};

  for (const key of keys) {
    const value = nutritionObj[key];

    if (value === null) {
      cleaned[key] = "";
    } else {
      cleaned[key] = value.replace(/\s*(kcal|cal|g|grams)\b/gi, "").trim();
    }
  }

  return cleaned;
}

export function hasValidNutritionData(nutritionObj) {
  return Object.values(nutritionObj).some((value) => value !== null);
}
