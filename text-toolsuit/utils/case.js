export function toUpperCaseText(text) {
  return text.toUpperCase();
}

export function toLowerCaseText(text) {
  return text.toLowerCase();
}

export function capitalizeText(text) {
  return text.replace(/\b\w/g, c => c.toUpperCase());
}

export function toSnakeCaseText(text) {
  return text
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase();
}

export function toCamelCaseText(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}
