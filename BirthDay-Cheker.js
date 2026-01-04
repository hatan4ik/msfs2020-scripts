// @ts-nocheck
export default function(payload) {
  const s = payload.submission?.submissions?.form_field_1;
  if (!s) return true;

  let m, d;
  const match = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    m = parseInt(match[2], 10) - 1;
    d = parseInt(match[3], 10);
  } else {
    const date = new Date(s);
    if (isNaN(date.getTime())) return true;
    m = date.getUTCMonth();
    d = date.getUTCDate();
  }

  const n = new Date();
  const y = n.getFullYear();
  const t = Date.UTC(y, n.getMonth(), n.getDate());

  return [y - 1, y, y + 1].some(yr => Math.abs((t - Date.UTC(yr, m, d)) / 864e5) <= 7);
}