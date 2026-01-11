// @ts-nocheck
export default function(payload) {
  // Support both 'submissions' and 'submission' keys just in case
  const s = payload.submission?.submissions?.form_field_1 || payload.submission?.submission?.form_field_1;
  if (!s) return true;

  let m, d;
  // Handle Date objects directly (common in Wix)
  if (s && typeof s.getMonth === 'function') {
    m = s.getMonth();
    d = s.getDate();
  } 
  // Handle String input
  else {
    const str = String(s);
    // Regex for YYYY-MM-DD or YYYY/MM/DD, allowing single digits
    const match = str.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (match) {
      m = +match[2] - 1;
      d = +match[3];
    } else {
      const date = new Date(str);
      if (isNaN(date.getTime())) return true;
      m = date.getMonth();
      d = date.getDate();
    }
  }

  const n = new Date();
  const y = n.getFullYear();
  // Normalize "Today" to UTC-mapped timestamp for pure day math (avoids DST/Timezone shifts)
  const t = Date.UTC(y, n.getMonth(), n.getDate());

  // Check previous, current, and next year matches
  return [y - 1, y, y + 1].some(yr => Math.abs((t - Date.UTC(yr, m, d)) / 864e5) <= 7);
}