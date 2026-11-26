// Funniest Autocorrect Fail — make.fun entry
// Writes one autocorrect-fail line to /output/entry.txt and enforces the gate:
// 1-199 characters, a single line, exactly one sentence, ASCII-only
// (so byte count equals char count), no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "I texted my boss 'We need to reschedule our meeting' and autocorrect sent 'We need to reschedule our mating.'";

function fail(message: string): never {
  console.error(`gate failed: ${message}`);
  process.exit(1);
}

// Count code points, not UTF-16 code units, so the count matches the gate.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 199) {
  fail(`entry is ${chars} characters, must be 1-199`);
}
if (ENTRY.trim().length === 0) {
  fail("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
if (ENTRY.includes("\t") || /  /.test(ENTRY)) {
  fail("entry must not contain tabs or double spaces");
}
// Exactly one sentence: a single sentence terminator, at the end
// (a closing quote may follow the final period).
const terminators = (ENTRY.match(/[.!?]/g) ?? []).length;
const stripped = ENTRY.replace(/['"]$/, "");
if (terminators !== 1 || !stripped.endsWith(".")) {
  fail(`entry must be exactly one sentence ending in a period (found ${terminators} terminators)`);
}
// ASCII-only: bytes must equal chars, so the entry is smallest on exact ties.
const bytes = Buffer.byteLength(ENTRY, "utf8");
if (bytes !== chars) {
  fail(`entry is not ASCII-only (${bytes} bytes vs ${chars} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`wrote /output/entry.txt (${chars} chars, ${bytes} bytes)`);
