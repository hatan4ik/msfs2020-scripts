
const logic = function(payload) {
    const birthDateStr = payload.submission?.submissions?.form_field_1;
    if (!birthDateStr) return true;

    const birthDate = new Date(birthDateStr);
    if (isNaN(birthDate.getTime())) return true;

    // MOCKING TODAY as Jan 4, 2026
    const today = new Date("2026-01-04T12:00:00"); 
    today.setHours(0, 0, 0, 0);

    const getDiffDays = (year) => {
        // This was the logic in BirthDay-Cheker.js
        const birthIso = new Date(year, birthDate.getMonth(), birthDate.getDate());
        birthIso.setHours(0, 0, 0, 0);
        const diffMs = today - birthIso;
        return Math.round(diffMs / 86400000);
    };

    const currentYear = today.getFullYear();
    const diffCurrent = getDiffDays(currentYear);
    const diffPrev = getDiffDays(currentYear - 1);
    const diffNext = getDiffDays(currentYear + 1);

    console.log(`Input: ${birthDateStr}`);
    console.log(`Today: ${today.toISOString()}`);
    console.log(`Diff Current (${currentYear}): ${diffCurrent}`);
    console.log(`Diff Prev (${currentYear - 1}): ${diffPrev}`);
    console.log(`Diff Next (${currentYear + 1}): ${diffNext}`);

    return (Math.abs(diffCurrent) <= 7 || Math.abs(diffPrev) <= 7 || Math.abs(diffNext) <= 7);
}

// Test Case 1: Jan 1st (Reported as Working)
const result1 = logic({ submission: { submissions: { form_field_1: "2000-01-01" } } });
console.log(`Result Jan 1: ${result1}`);

// Test Case 2: Dec 30th (Reported as Failing)
const result2 = logic({ submission: { submissions: { form_field_1: "2000-12-30" } } });
console.log(`Result Dec 30: ${result2}`);
