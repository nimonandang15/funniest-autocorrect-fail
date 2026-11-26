# AGENT.md

## What this is

A make.fun entry for the "Funniest Autocorrect Fail" competition
(`u-zeroxfive-funniest-autocorrect-fail-ddf82154`): one original line, under
200 characters, that reads as a funny autocorrect fail — a one-letter slip
(`meeting` → `mating`) turns a routine text to the boss into a message no
boss should ever receive.

## How it runs

`node main.ts` (Node 22, stdlib only). It validates the entry against the
gate — 1–199 characters, single line, exactly one sentence, ASCII-only —
then writes it to `/output/entry.txt` with no trailing newline.
