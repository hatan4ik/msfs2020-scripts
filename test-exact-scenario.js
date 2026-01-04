// Test exact scenario: 2000-12-30 on Jan 4, 2026
import birthdayChecker from './BirthDay-Cheker.js';

const payload = {
  submission: {
    submissions: {
      form_field_1: "2000-12-30"
    }
  }
};

console.log("=== EXACT TEST: 2000-12-30 ===");
console.log("Today:", new Date().toDateString());

const result = birthdayChecker(payload);
console.log("Function result:", result);

// Let's trace through the exact logic
const birthDate = new Date("2000-12-30");
console.log("\nParsed birth date:", birthDate.toString());
console.log("Birth month:", birthDate.getMonth(), "(December = 11)");
console.log("Birth day:", birthDate.getDate());

const today = new Date();
today.setHours(0, 0, 0, 0);
const currentYear = today.getFullYear(); // 2026

console.log("\n=== CHECKING EACH YEAR ===");

// Check 2026 (current year)
const birth2026 = new Date(2026, birthDate.getMonth(), birthDate.getDate());
birth2026.setHours(0, 0, 0, 0);
const diff2026 = today - birth2026;
const days2026 = Math.round(diff2026 / 86400000);
console.log(`2026: ${birth2026.toDateString()} -> ${days2026} days -> ${Math.abs(days2026) <= 7}`);

// Check 2025 (previous year) - THIS SHOULD MATCH
const birth2025 = new Date(2025, birthDate.getMonth(), birthDate.getDate());
birth2025.setHours(0, 0, 0, 0);
const diff2025 = today - birth2025;
const days2025 = Math.round(diff2025 / 86400000);
console.log(`2025: ${birth2025.toDateString()} -> ${days2025} days -> ${Math.abs(days2025) <= 7}`);

// Check 2027 (next year)
const birth2027 = new Date(2027, birthDate.getMonth(), birthDate.getDate());
birth2027.setHours(0, 0, 0, 0);
const diff2027 = today - birth2027;
const days2027 = Math.round(diff2027 / 86400000);
console.log(`2027: ${birth2027.toDateString()} -> ${days2027} days -> ${Math.abs(days2027) <= 7}`);

console.log("\nFinal OR result:", 
  (Math.abs(days2026) <= 7) || (Math.abs(days2025) <= 7) || (Math.abs(days2027) <= 7)
);