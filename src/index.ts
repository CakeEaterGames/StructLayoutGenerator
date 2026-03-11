import { _MonoClassStructDefinition } from "./definitions";
import { StructLayoutGenerator } from "./StructLayoutGenerator";
import type { StructDefinition } from "./types";

console.log("Hello via Bun!");

const layout = new StructLayoutGenerator(_MonoClassStructDefinition)
let o = layout.getField("name")
console.log(o);
console.log(layout.visualize());

