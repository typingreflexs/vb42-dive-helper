import fs from "fs";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const BUILDS = [
	{ input: "AutoDive.lua", output: "AutoDive.obf.lua", label: "executor" },
	{ input: "RacketRivals.lua", output: "RacketRivals.obf.lua", label: "racket" },
	{ input: "JJS.lua", output: "JJS.obf.lua", label: "jjs" },
];

function randName(len = 10) {
	const chars = "_IlO";
	let s = "_";
	for (let i = 1; i < len; i++) s += chars[Math.floor(Math.random() * chars.length)];
	return s;
}

function obfuscate(inputPath, outputPath, label) {
	const source = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");
	const key = crypto.randomBytes(24);
	const encoded = Buffer.from(source, "utf8").map((b, i) => (b + key[i % key.length]) % 256);

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

	const loader = `-- obfuscated | ${label} | build v3
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

	fs.writeFileSync(outputPath, loader, "utf8");

	let decoded = Buffer.alloc(encoded.length);
	let idx = 0;
	for (const c of chunks) {
		for (const b of c) {
			decoded[idx] = (b - key[idx % key.length] + 256) % 256;
			idx++;
		}
	}
	if (decoded.toString("utf8") !== source) throw new Error(`roundtrip verify failed: ${outputPath}`);

	console.log("Wrote", outputPath);
	console.log("Bytes:", encoded.length, "Chunks:", chunks.length, "Verified: OK");
}

for (const build of BUILDS) {
	const input = path.join(dir, build.input);
	const output = path.join(dir, build.output);
	if (!fs.existsSync(input)) {
		console.warn("Skip (missing):", build.input);
		continue;
	}
	obfuscate(input, output, build.label);
}
