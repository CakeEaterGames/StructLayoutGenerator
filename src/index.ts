import { _MonoClassDefStructDefinition, _MonoClassStructDefinition } from "./definitions";
import { StructLayoutGenerator } from "./StructLayoutGenerator";
import type { StructDefinition } from "./types";

console.log("Hello via Bun!");

const layout = new StructLayoutGenerator(_MonoClassStructDefinition)
console.log(layout.visualize());


const layout2 = new StructLayoutGenerator(_MonoClassDefStructDefinition)
console.log(layout2.visualize());

