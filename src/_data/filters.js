export default {
  parseLocal(dateStr) {
    if (!dateStr) return null;
    const iso = dateStr.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d) ? null : d;
  },

  shortText(text, n = 140) {
    if (!text) return "";
    const cleaned = text.replace(/\s+/g, " ").trim();
    return cleaned.length > n ? cleaned.slice(0, n).trim() + "…" : cleaned;
  }
};
