import { readFile, writeFile } from "node:fs/promises";
import heicConvert from "heic-convert";

const input = "D:\\Memories\\Kala Dam\\IMG_5421.HEIC";
const output = "public/images/portrait.jpg";

const buffer = await readFile(input);
const jpeg = await heicConvert({
  buffer,
  format: "JPEG",
  quality: 0.92,
});

await writeFile(output, Buffer.from(jpeg));
console.log(`Converted → ${output} (${Math.round(jpeg.length / 1024)} kB)`);
