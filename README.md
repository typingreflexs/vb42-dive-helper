# vb42-dive-helper

Volleyball 4.2 auto-dive helper.

## Executor (Rayfield UI)

Obfuscated build (recommended). A key is required on first load (link is copied to clipboard automatically).

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/AutoDive.obf.lua"))()
```

Regenerate: `node obfuscate.mjs` from the repo root.

**Features:** auto dive (3), auto sprint (T), landing prediction, falling-only filter, visuals (marker, ball dot, ring, arc).

## Matcha (completed/)

Matcha-only build with custom Drawing UI lives in [`completed/`](completed/).

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/AutoDive_Matcha.obf.lua"))()
```

Line 1 of the obf file must say `build v3`.
