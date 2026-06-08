# vb42-dive-helper

Scripts by **[scammed.wtf](https://discord.gg/CM4mcqxZnP)** — Volleyball 4.2, Racket Rivals, and Matcha builds.

**Repo:** https://github.com/typingreflexs/vb42-dive-helper

---

## Volleyball 4.2 — Executor (Rayfield)

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/AutoDive.obf.lua"))()
```

Auto dive (3), auto sprint (T), prediction, visuals. Key required on first load.

---

## Racket Rivals — Executor (Rayfield)

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/RacketRivals.obf.lua"))()
```

Auto hit/swing, smash, dash (Q), set (E), shuttle ESP, prediction. Key required on first load.

---

## Volleyball 4.2 — Matcha (Drawing UI)

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/AutoDive_Matcha.obf.lua"))()
```

Matcha-only. Custom Drawing overlay, no Rayfield.

---

## Fisch — Matcha (Drawing UI)

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/Fisch_Matcha.obf.lua"))()
```

Auto equip rod, cast, shake, instant reel. Matcha only.

---

## Jujutsu Shenanigans — Executor (Rayfield)

```lua
loadstring(game:HttpGet("https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/JJS.obf.lua"))()
```

Auto M1, block, BF chain (Yuji), perfect switch (Todo), ratio (Nanami), lawyer QTE, ESP. Key required on first load.

---

## Build obfuscated files

From repo root (sources stay local, not committed):

```bash
node obfuscate.mjs
node completed/obfuscate.mjs
```

Obf files must start with `build v3`.
