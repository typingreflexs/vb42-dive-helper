-- scammed.wtf | binsu volleyball matcha loader
local URL = "https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/BinsuVolleyball_Matcha.obf.lua"
local src = game:HttpGet(URL, "")
if not src or #src < 32 then
	error('binsu: HttpGet failed — use game:HttpGet(url, "") in Matcha', 0)
end
local fn, err = loadstring(src, "binsu")
if not fn then error("binsu: " .. tostring(err), 0) end
return fn()
