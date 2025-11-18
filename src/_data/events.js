import rawCalendar from "./rawCalendar.js";
import { transformCalendar } from "../../scripts/transformCalendar.js";
import fs from "fs";

export default async function() {
  const transformed = await transformCalendar(await rawCalendar());

  // write local file
  fs.writeFileSync("output.json", JSON.stringify(transformed, null, 4));

  return transformed;
}
