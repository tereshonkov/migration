/**
 * Removes legacy portfolio copy keys `data_*` from uk/ru/en message JSON.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, "../src/messages");

for (const f of ["uk.json", "ru.json", "en.json"]) {
  const p = path.join(dir, f);
  const json = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const k of Object.keys(json)) {
    if (k.startsWith("data_")) delete json[k];
  }
  fs.writeFileSync(p, `${JSON.stringify(json, null, 2)}\n`);
}
