export function formatJSONText(text) {
  try {
    const obj = JSON.parse(text.trim());
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return `// Invalid JSON\n// ${e.message}`;
  }
}

export function minifyJSONText(text) {
  try {
    const obj = JSON.parse(text.trim());
    return JSON.stringify(obj);
  } catch (e) {
    return `// Invalid JSON\n// ${e.message}`;
  }
}
