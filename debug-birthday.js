// Debug the birthday function
const birthDateStr = "1990-01-15"; // Birthday Jan 15
const birthDate = new Date(birthDateStr);

const today = new Date();
today.setHours(0, 0, 0, 0);

console.log("Today:", today.toDateString());
console.log("Birth date parsed:", birthDate.toDateString());
console.log("Birth month:", birthDate.getMonth(), "Birth day:", birthDate.getDate());

const currentYear = today.getFullYear();
console.log("Current year:", currentYear);

// Check current year
const birthThisYear = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
birthThisYear.setHours(0, 0, 0, 0);

console.log("Birthday this year:", birthThisYear.toDateString());

const diffMs = today - birthThisYear;
const diffDays = Math.round(diffMs / 86400000);

console.log("Difference in ms:", diffMs);
console.log("Difference in days:", diffDays);
console.log("Absolute difference:", Math.abs(diffDays));
console.log("Is within 7 days?", Math.abs(diffDays) <= 7);