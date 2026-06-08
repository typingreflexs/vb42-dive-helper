import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(dir, "AutoDive.lua");
const output = path.join(dir, "AutoDive.obf.lua");

const source = fs.readFileSync(input, "utf8").replace(/^\uFEFF/, "");
const key = crypto.randomBytes(24);
const encoded = Buffer.from(source, "utf8").map((b, i) => (b + key[i % key.length]) % 256);

function randName(len = 10) {
	const chars = "_IlO";
	let s = "_";
	for (let i = 1; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
	return s;
}

const [nK, nD, nA, nB, nC, nE, nF, nG, nH, nI, nL, nM] = Array.from({ length: 12 }, () =>
	randName(8 + Math.floor(Math.random() * 5)),
);

const chunks = [];
const chunkSize = 48 + Math.floor(Math.random() * 32);
for (let i = 0; i < encoded.length; i += chunkSize) {
	chunks.push(Array.from(encoded.subarray(i, i + chunkSize)));
}

const keyLua = "{" + Array.from(key).join(",") + "}";
const chunkLua = chunks.map((c) => "{" + c.join(",") + "}").join(",");

const loader = `-- obfuscated | executor | build v3
return (function(${nK},${nD})
local ${nA},${nB},${nC},${nE},${nF},${nG},${nH},${nI},${nL},${nM}=string.char,table.concat,loadstring or load,0,0,0,{},0,"",""
for ${nF}=1,#${nD} do
  local ${nM}=${nD}[${nF}]
  for ${nG}=1,#${nM} do
    ${nE}=${nE}+1
    ${nH}[${nE}]=${nA}((${nM}[${nG}]-${nK}[(${nE}-1)%#${nK}+1]+256)%256)
  end
end
${nL}=${nB}(${nH})
${nI},${nM}=${nC}(${nL})
if not ${nI} then error(tostring(${nM}),0) end
return ${nI}()
end)(${keyLua},{${chunkLua}})
`;

fs.writeFileSync(output, loader, "utf8");

let decoded = Buffer.alloc(encoded.length);
let idx = 0;
for (const c of chunks) {
	for (const b of c) {
		decoded[idx] = (b - key[idx % key.length] + 256) % 256;
		idx++;
	}
}
const roundtrip = decoded.toString("utf8") === source;
if (!roundtrip) throw new Error("roundtrip verify failed");

console.log("Wrote", output);
console.log("Bytes:", encoded.length, "Chunks:", chunks.length, "Verified: OK");
