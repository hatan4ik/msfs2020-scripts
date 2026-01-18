// @ts-nocheck
export default function(payload) {
  const s = payload.submission?.submissions?.form_field_1;
  if (!s) return false;

  let m, d;
  if (s && typeof s.getMonth === 'function') {
    m = s.getMonth();
    d = s.getDate();
  } else {
    const match = String(s).match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (match) {
      m = +match[2] - 1;
      d = +match[3];
    } else {
      const date = new Date(s);
      if (isNaN(date.getTime())) return false;
      m = date.getMonth();
      d = date.getDate();
    }
  }

  const now = new Date();
  const y = now.getFullYear();
  const inRange = [y - 1, y, y + 1].some(yr => Math.abs((now - new Date(yr, m, d)) / 864e5) <= 31);
  console.log(`Birthday check: ${m+1}/${d}, InRange: ${inRange}, Days: ${Math.min(...[y-1,y,y+1].map(yr => Math.abs((now - new Date(yr, m, d)) / 864e5)))}`);
  return !inRange;
}