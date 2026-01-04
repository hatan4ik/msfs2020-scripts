// Detailed debug for Dec 30th issue
import birthdayChecker from './BirthDay-Cheker.js';

// Test different Dec 30th formats
const testFormats = [
  "1990-12-30",
  "12/30/1990", 
  "12-30-1990",
  "2023-12-30"
];

const today = new Date();
console.log("=== SYSTEM INFO ===");
console.log("Today (raw):", today);
console.log("Today (string):", today.toString());
console.log("Today (date string):", today.toDateString());
console.log("Timezone offset:", today.getTimezoneOffset());

testFormats.forEach(dateStr => {
  console.log(`\n=== TESTING: ${dateStr} ===`);
  
  const payload = {
    submission: {
      submissions: {
        form_field_1: dateStr
      }
    }
  };
  
  // Parse the date to see what happens
  const birthDate = new Date(dateStr);
  console.log("Parsed birth date:", birthDate.toString());
  console.log("Birth month:", birthDate.getMonth(), "Birth day:", birthDate.getDate());
  
  // Test the function
  const result = birthdayChecker(payload);
  console.log("Function result:", result);
  
  // Manual calculation for current year
  const todayTest = new Date();
  todayTest.setHours(0, 0, 0, 0);
  const currentYear = todayTest.getFullYear();
  
  console.log("--- Manual check for each year ---");
  [-1, 0, 1].forEach(yearOffset => {
    const testYear = currentYear + yearOffset;
    const birthInYear = new Date(testYear, birthDate.getMonth(), birthDate.getDate());
    birthInYear.setHours(0, 0, 0, 0);
    
    const diffMs = todayTest - birthInYear;
    const diffDays = Math.round(diffMs / 86400000);
    const isWithin7 = Math.abs(diffDays) <= 7;
    
    console.log(`  Year ${testYear}: ${birthInYear.toDateString()} -> ${diffDays} days -> ${isWithin7}`);
  });
});

// Test Jan 9th for comparison
console.log(`\n=== TESTING JAN 9TH (working case) ===`);
const jan9Payload = {
  submission: {
    submissions: {
      form_field_1: "1990-01-09"
    }
  }
};
const jan9Result = birthdayChecker(jan9Payload);
console.log("Jan 9th result:", jan9Result);