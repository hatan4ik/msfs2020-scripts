// Wix Automation Test Case
// Copy this into your Wix automation function

export default function(payload) {
  // Your birthday checker function
  const checkBirthday = (birthDateStr) => {
    if (!birthDateStr) return true;

    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkYear = (year) => {
      const birthInYear = new Date(year, birthDate.getMonth(), birthDate.getDate());
      birthInYear.setHours(0, 0, 0, 0);
      const diffDays = Math.round((today - birthInYear) / 86400000);
      return Math.abs(diffDays) <= 7;
    };

    const currentYear = today.getFullYear();
    return checkYear(currentYear) || checkYear(currentYear - 1) || checkYear(currentYear + 1);
  };

  // Test cases - modify these dates to match your scenario
  const testDate = payload.submission?.submissions?.form_field_1 || "2000-12-30";
  
  // Debug info
  const today = new Date();
  const birthDate = new Date(testDate);
  
  console.log("=== DEBUG INFO ===");
  console.log("Today:", today.toDateString());
  console.log("Input date:", testDate);
  console.log("Parsed date:", birthDate.toString());
  console.log("Is valid date:", !isNaN(birthDate.getTime()));
  
  // Test the function
  const result = checkBirthday(testDate);
  console.log("Result:", result);
  
  // Return the result (true = within 7 days, false = outside 7 days)
  return result;
}