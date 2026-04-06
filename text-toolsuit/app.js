import { cleanText } from './utils/cleaner.js';
import { formatJSONText, minifyJSONText } from './utils/json.js';
import { toUpperCaseText, toLowerCaseText, capitalizeText, toSnakeCaseText, toCamelCaseText } from './utils/case.js';

// ── NAV ──
window.showTool = function(tool, btn) {
  document.querySelectorAll('.tool').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(tool).classList.add('active');
  if (btn) btn.classList.add('active');
};

// ── CLEANER ──
const input  = document.getElementById('input');
const output = document.getElementById('output');

input.addEventListener('input', () => {
  output.value = cleanText(input.value, {
    removeEmojis: true,
    trimSpaces: true,
    removeLineBreaks: false
  });
});

document.getElementById('copy').onclick = () => {
  if (!output.value) return;
  navigator.clipboard.writeText(output.value).then(() => {
    const btn = document.getElementById('copy');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Copy Output', 1500);
  });
};

// HUMANIZE with daily limit
let usage = (() => {
  try { return JSON.parse(localStorage.getItem('tt_usage')) || { count: 0, date: '' }; }
  catch { return { count: 0, date: '' }; }
})();

function updateBadge() {
  const badge = document.getElementById('usageBadge');
  const today = new Date().toISOString().split('T')[0];
  if (usage.date !== today) { usage = { count: 0, date: today }; }
  badge.textContent = `${usage.count}/10 uses today`;
}
updateBadge();

document.getElementById('humanize').onclick = () => {
  const today = new Date().toISOString().split('T')[0];
  if (usage.date !== today) usage = { count: 0, date: today };

  if (usage.count >= 10) {
    alert('Daily humanize limit reached (10/day). Come back tomorrow!');
    return;
  }

  const text = output.value || input.value;
  if (!text.trim()) return;

  usage.count++;
  localStorage.setItem('tt_usage', JSON.stringify(usage));
  updateBadge();

  // Simple humanization transformations
  output.value = text
    .replace(/\bvery\b/gi, 'extremely')
    .replace(/\butilize\b/gi, 'use')
    .replace(/\bcommence\b/gi, 'start')
    .replace(/\bpurchase\b/gi, 'buy')
    .replace(/\binquire\b/gi, 'ask')
    .replace(/\bprovide\b/gi, 'give')
    .replace(/\bdemonstrate\b/gi, 'show')
    .replace(/\bnevertheless\b/gi, 'still')
    .replace(/\bfurthermore\b/gi, 'also')
    .replace(/\bin order to\b/gi, 'to')
    .replace(/\bdue to the fact that\b/gi, 'because');
};

// ── JSON ──
window.formatJSON = function() {
  const val = document.getElementById('jsonInput').value;
  document.getElementById('jsonOutput').value = formatJSONText(val);
};

window.minifyJSON = function() {
  const val = document.getElementById('jsonInput').value;
  document.getElementById('jsonOutput').value = minifyJSONText(val);
};

// ── CASE ──
window.toUpper    = () => convert(toUpperCaseText);
window.toLower    = () => convert(toLowerCaseText);
window.capitalize = () => convert(capitalizeText);
window.toSnake    = () => convert(toSnakeCaseText);
window.toCamel    = () => convert(toCamelCaseText);

function convert(fn) {
  const t = document.getElementById('caseInput').value;
  document.getElementById('caseOutput').value = fn(t);
}
