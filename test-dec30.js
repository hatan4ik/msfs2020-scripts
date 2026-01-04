// Test December 30th specifically
import originalChecker from './Original-BD-chekcker.js';
import currentChecker from './BirthDay-Cheker.js';

const testPayload = {
  submission: {
    submissions: {
      form_field_1: "1990-12-30"
    }
  }
};

console.log("Today:", new Date().toDateString());
console.log("Testing December 30th birthday...\n");

console.log("=== ORIGINAL VERSION (no cross-year) ===");
const originalResult = originalChecker(testPayload);
console.log("Result:", originalResult);

console.log("\n=== CURRENT VERSION (with cross-year) ===");
const currentResult = currentChecker(testPayload);
console.log("Result:", currentResult);

// Let's also debug what the original version calculates
console.log("\n=== DEBUG ORIGINAL VERSION ===");
const birthDate = new Date("1990-12-30");
const today = new Date();
today.setHours(0, 0, 0, 0);

const birthThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
birthThisYear.setHours(0, 0, 0, 0);

console.log("Today:", today.toDateString());
console.log("Birthday this year (2026):", birthThisYear.toDateString());

const diffMs = today - birthThisYear;
const diffDays = Math.round(diffMs / 86400000);

console.log("Difference in days:", diffDays);
console.log("Absolute difference:", Math.abs(diffDays));
console.log("Is > 7 days?", Math.abs(diffDays) > 7);
console.log("Final result (negated):", !(Math.abs(diffDays) > 7));