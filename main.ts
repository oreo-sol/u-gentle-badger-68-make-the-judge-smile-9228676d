// Make the Judge Smile — make.fun entry
// One line, at most 200 characters, about a small good thing that happened today.
// Node 22, no dependencies. Writes the entry to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output), then reads it back and verifies it is byte-identical.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The cat that usually ignores me waited at my gate this morning and walked me all the way to the corner, tail up.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

// Validation: 1–200 characters, not only whitespace, a single line,
// no line breaks, no leading/trailing whitespace. The entry is written
// exactly as-is — no trailing newline is appended, so the file content
// is byte-identical to the ENTRY constant.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line with no line breaks");
}
if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(ENTRY)) {
  throw new Error("entry must not contain control characters");
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, ENTRY, "utf8");

const readBack = readFileSync(outputPath, "utf8");
if (readBack !== ENTRY) {
  throw new Error("verification failed: entry.txt is not byte-identical to the entry");
}

console.log(`wrote ${outputPath}: ${ENTRY.length} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
