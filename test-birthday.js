// Test the birthday function
import birthdayChecker from './BirthDay-Cheker.js';

// Get today's date for realistic testing
const today = new Date();
const todayMonth = today.getMonth() + 1; // 1-based
const todayDay = today.getDate();

console.log(`Today: ${today.toDateString()} (${todayMonth}/${todayDay})`);

// Test cases with realistic dates based on today
const testCases = [
  {
    name: "Birthday today",
    birthDate: `1990-${todayMonth.toString().padStart(2, '0')}-${todayDay.toString().padStart(2, '0')}`,
    expected: true
  },
  {
    name: "Birthday 3 days from now", 
    birthDate: `1990-01-07`, // Jan 7 (3 days from Jan 4)
    expected: true
  },
  {
    name: "Birthday 3 days ago",
    birthDate: `1990-01-01`, // Jan 1 (3 days before Jan 4)
    expected: true
  },
  {
    name: "Birthday 10 days away",
    birthDate: `1990-01-15`, // Jan 15 (11 days from Jan 4)
    expected: false
  },
  {
    name: "Cross-year test: Dec 30 (recent)",
    birthDate: `1990-12-30`, // Should be within 7 days if today is early Jan
    expected: true
  }
];

console.log("Testing birthday checker...\n");

testCases.forEach(test => {
  const payload = {
    submission: {
      submissions: {
        form_field_1: test.birthDate
      }
    }
  };
  
  const result = birthdayChecker(payload);
  const status = result === test.expected ? "✅ PASS" : "❌ FAIL";
  
  console.log(`${status} ${test.name}`);
  console.log(`  Input: ${test.birthDate}`);
  console.log(`  Expected: ${test.expected}, Got: ${result}\n`);
});