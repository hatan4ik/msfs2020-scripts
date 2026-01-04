// @ts-nocheck
export default function(payload) {
  const birthDateStr = payload.submission?.submissions?.form_field_1;
  if (!birthDateStr) return true;

  const birthDate = new Date(birthDateStr);
  if (isNaN(birthDate.getTime())) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const birthThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  birthThisYear.setHours(0, 0, 0, 0);

  const diffMs = today - birthThisYear;
  const diffDays = Math.round(diffMs / 86400000);

  // OLD: return Math.abs(diffDays) > 7;
  // NEW: reverse the result
  return !(Math.abs(diffDays) > 7);
}