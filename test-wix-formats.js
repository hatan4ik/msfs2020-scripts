// Test various Wix form date formats
import birthdayChecker from './BirthDay-Cheker.js';

const wixFormats = [
  "2000-12-30",           // ISO format
  "12/30/2000",           // US format MM/DD/YYYY
  "30/12/2000",           // European format DD/MM/YYYY
  "12-30-2000",           // US dash format
  "30-12-2000",           // European dash format
  "Dec 30, 2000",         // Long format
  "December 30, 2000",    // Full month name
  "2000/12/30",           // ISO with slashes
  "30.12.2000",           // German format
  "12.30.2000"            // US dot format
];

console.log("Today:", new Date().toDateString());
console.log("Testing various Wix date formats for December 30, 2000...\n");

wixFormats.forEach(dateStr => {
  const payload = {
    submission: {
      submissions: {
        form_field_1: dateStr
      }
    }
  };
  
  console.log(`=== FORMAT: "${dateStr}" ===`);
  
  // Parse the date to see what JavaScript thinks
  const parsedDate = new Date(dateStr);
  console.log("Parsed as:", parsedDate.toString());
  
  if (isNaN(parsedDate.getTime())) {
    console.log("❌ INVALID DATE");
  } else {
    console.log("Month:", parsedDate.getMonth(), "Day:", parsedDate.getDate());
    
    const result = birthdayChecker(payload);
    console.log("Result:", result ? "✅ TRUE" : "❌ FALSE");
  }
  
  console.log("");
});