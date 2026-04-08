# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A personal JavaScript/TypeScript study repository containing algorithm solutions, data structure implementations, design patterns, utility snippets, and notes. All files are standalone — there is no build system, package manager, or test framework.

## Running Code

```bash
node <file.js>          # Run any JS file directly
npx ts-node <file.ts>   # For the few TypeScript files
```

There are no build, lint, or test commands — each file is self-contained.

## Repository Structure

- **leetcode/** — ~400 LeetCode solutions, named `<number>. <Problem Name>.js`. Often contain multiple approaches (brute force + optimized) in a single file.
- **algorithm/** — Classic algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall, Kruskal, binary search, LRU/FIFO cache, knapsack, Luhn).
- **data-structure/** — Implementations of common data structures (linked list, trees, heaps, graphs, trie, segment tree, red-black tree, queue, stack).
- **design-pattern/** — GoF patterns organized by category (`behavioral/`, `creational/`, `structural/`). `behavioral/` and `structural/` are markdown notes (concept + JS examples); `creational/` is still JS source files. One JS file remains in `behavioral/` (PubSub.js).
- **snippet/** — Reusable JS utilities and patterns (debounce, throttle, deep clone, async pool, promise helpers, DOM utilities, state machines, etc.).
- **implementation/** — Reimplementations of JS/React internals (`JavaScript/` has Promise, bind/call/apply, new, etc.; `React.js/` has hooks, state management, synthetic events, etc.).
- **math/** — Math utilities (GCD, LCM, primes, modular arithmetic, quick pow).
- **note/** — Markdown notes on JS topics (async/await, regex, Blob, Symbol, etc.).

## Conventions

- Files are standalone scripts with no shared imports between directories.
- LeetCode files include JSDoc-style param/return annotations from the problem definition.
- Solutions often show multiple approaches in the same file, separated by comments.
- Comments are in a mix of English and Chinese.
