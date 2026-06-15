-- scammed.wtf | prospecting matcha loader
local URL = "https://cdn.jsdelivr.net/gh/typingreflexs/vb42-dive-helper@main/completed/Prospecting_Matcha.obf.lua"
local src = game:HttpGet(URL, "")
if not src or #src < 32 then
	error('prospect: HttpGet failed — use game:HttpGet(url, "") in Matcha', 0)
end
local fn, err = loadstring(src, "prospect")
if not fn then
	fn, err = load(src, "prospect")
end
if not fn then error("prospect: " .. tostring(err), 0) end
return fn()
