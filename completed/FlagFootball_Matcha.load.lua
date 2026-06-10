-- scammed.wtf | flag football matcha loader
local URL = "https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/FlagFootball_Matcha.obf.lua"
local src = game:HttpGet(URL, "")
if not src or #src < 32 then
	error('flag: HttpGet failed — use game:HttpGet(url, "") in Matcha', 0)
end
local fn, err = loadstring(src, "flag")
if not fn then error("flag: " .. tostring(err), 0) end
return fn()
