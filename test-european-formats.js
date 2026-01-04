// Test the updated function with European formats
import birthdayChecker from './BirthDay-Cheker.js';

const europeanFormats = [
  "30/12/2000",   // DD/MM/YYYY - should now work
  "30-12-2000",   // DD-MM-YYYY - should now work  
  "30.12.2000"    // DD.MM.YYYY - should now work
];

console.log("Testing European formats with updated function...\n");

europeanFormats.forEach(dateStr => {
  const payload = {
    submission: {
      submissions: {
        form_field_1: dateStr
      }
    }
  };
  
  console.log(`Testing: "${dateStr}"`);
  const result = birthdayChecker(payload);
  console.log("Result:", result ? "✅ TRUE" : "❌ FALSE");
  console.log("");
});