-- scammed.wtf | vb42 matcha loader
-- Matcha needs HttpGet(url, "") and loadstring(src, "name") — not the executor one-arg form.

local URL = "https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/AutoDive_Matcha.obf.lua"
local src = game:HttpGet(URL, "")
if not src or #src < 32 then
	error('vb42: HttpGet returned empty. In Matcha use game:HttpGet(url, "")', 0)
end
local fn, err = loadstring(src, "vb42")
if not fn then
	error("vb42: " .. tostring(err), 0)
end
return fn()
