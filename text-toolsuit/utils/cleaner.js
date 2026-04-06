export function cleanText(text, options = {}) {
  let t = text;

  if (options.removeEmojis) {
    t = t.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '');
  }

  if (options.trimSpaces) {
    t = t.replace(/[ \t]+/g, ' ').replace(/^ /gm, '');
  }

  if (options.removeLineBreaks) {
    t = t.replace(/[\r\n]+/g, ' ');
  }

  // Remove zero-width characters
  t = t.replace(/[\u200B-\u200D\uFEFF]/g, '');

  return t.trim();
}
