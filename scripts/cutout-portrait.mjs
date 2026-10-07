import { readFile, writeFile } from "node:fs/promises";
import { removeBackground } from "@imgly/background-removal-node";

const input = "public/images/portrait.jpg";
const output = "public/images/portrait-cutout.png";

console.log("Loading segmentation model (first run downloads ~40MB)…");
const blob = await removeBackground(input, {
  output: { format: "image/png", quality: 1 },
});

const arrayBuffer = await blob.arrayBuffer();
await writeFile(output, Buffer.from(arrayBuffer));
console.log(`Cutout saved → ${output} (${Math.round(arrayBuffer.byteLength / 1024)} kB)`);
