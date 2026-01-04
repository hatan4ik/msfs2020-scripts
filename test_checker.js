// Mock payload structure
const createPayload = (dateStr) => ({ submission: { submissions: { form_field_1: dateStr } } });

// Mock Date to control "Today"
const RealDate = Date;
global.Date = class extends RealDate {
    constructor(arg) {
        if (arg) return new RealDate(arg);
        return new RealDate("2026-01-04T12:00:00Z"); // Mock Today: Jan 4, 2026 UTC
    }
};

// Import logic (we'll paste the function body here for direct testing since we can't easily import ES modules in this simple script context without setup)
function checkBirthday(payload) {
    const birthDateStr = payload.submission?.submissions?.form_field_1;
    if (!birthDateStr) return true;

    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) return true;

    const today = new Date();

    // Normalize everything to UTC Midnight
    const todayUtc = RealDate.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
    const currentYear = new Date(todayUtc).getUTCFullYear();

    const bMonth = birthDate.getUTCMonth();
    const bDay = birthDate.getUTCDate();

    const checkDiff = (year) => {
        const targetBirthUtc = RealDate.UTC(year, bMonth, bDay);
        const diffMs = todayUtc - targetBirthUtc;
        const diffDays = Math.round(diffMs / 86400000);
        console.log(`Checking Year ${year}: Target=${new RealDate(targetBirthUtc).toISOString().split('T')[0]}, Diff=${diffDays}`);
        return Math.abs(diffDays) <= 7;
    };

    if (checkDiff(currentYear)) return true;
    if (checkDiff(currentYear - 1)) return true;
    if (checkDiff(currentYear + 1)) return true;

    return false;
}

// TESTS
console.log("--- Test Run (Today = Jan 4, 2026) ---");

const cases = [
    "2000-01-01", // Jan 1 (Should Pass: +3 days)
    "2000-12-30", // Dec 30 (Should Pass: -5 days)
    "2000-12-28", // Dec 28 (Should Pass: -7 days)
    "2000-12-27", // Dec 27 (Should Fail: -8 days)
    "2000-12-26", // Dec 26 (Should Fail: -9 days)
];

cases.forEach(date => {
    console.log(`
Testing Birthday: ${date}`);
    const result = checkBirthday(createPayload(date));
    console.log(`RESULT: ${result ? "PASS" : "FAIL"}`);
});
