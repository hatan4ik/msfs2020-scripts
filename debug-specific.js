// Debug December 30th vs January 8th
import birthdayChecker from './BirthDay-Cheker.js';

console.log("=== SYSTEM INFO ===");
const now = new Date();
console.log("Current time:", now.toString());
console.log("Today normalized:", (() => {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t.toString();
})());

// Test both dates
const testCases = [
  { name: "December 30th", date: "2000-12-30" },
  { name: "January 8th", date: "2000-01-08" }
];

testCases.forEach(test => {
  console.log(`\n=== ${test.name.toUpperCase()} ===`);
  
  const payload = {
    submission: {
      submissions: {
        form_field_1: test.date
      }
    }
  };
  
  // Step by step debug
  const birthDate = new Date(test.date);
  console.log("1. Input:", test.date);
  console.log("2. Parsed:", birthDate.toString());
  console.log("3. Month:", birthDate.getMonth(), "Day:", birthDate.getDate());
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentYear = today.getFullYear();
  
  console.log("4. Current year:", currentYear);
  
  // Check each year manually
  [currentYear - 1, currentYear, currentYear + 1].forEach(year => {
    const birthInYear = new Date(year, birthDate.getMonth(), birthDate.getDate());
    birthInYear.setHours(0, 0, 0, 0);
    const diffDays = Math.round((today - birthInYear) / 86400000);
    const isWithin7 = Math.abs(diffDays) <= 7;
    
    console.log(`   Year ${year}: ${birthInYear.toDateString()} -> ${diffDays} days -> ${isWithin7}`);
  });
  
  // Final result
  const result = birthdayChecker(payload);
  console.log("5. FINAL RESULT:", result);
});