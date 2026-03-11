import { FieldSizes, type BasicFieldType, type StructDefinition, type StructLayout } from "./types";

export class StructLayoutGenerator<T extends StructDefinition> {
  public layout: StructLayout

  constructor(public structDefinition: T) {
    this.layout = this.generate(structDefinition)
  }

  private static cache = new Map<string, StructLayout>()

  generate<D extends StructDefinition>(structDefinition: D): StructLayout {
    let cache = StructLayoutGenerator.cache
    if (cache.has(structDefinition.name)) {
      return cache.get(structDefinition.name)!
    }

    let layout = this._generate(structDefinition)
    cache.set(structDefinition.name, layout)

    return layout
  }

  _generate<D extends StructDefinition>(structDefinition: D): StructLayout {
    let cur = 0
    let fields: {
      name: string,
      offset: number,
      size: number,
    }[] = []

    let maxOffset = 1;

    function pad(size: number) {
      if (cur % size > 0) {
        let pad = size - cur % size
        fields.push({
          name: "__padding",
          offset: cur,
          size: pad,
        })
        cur += pad
      }
    }

    function push(name: string, size: number) {
      fields.push({
        name: name,
        offset: cur,
        size: size,
      })
      cur += size
    }

    for (const f of structDefinition.fields) {
      if (f.type in FieldSizes) {
        let size = FieldSizes[f.type as BasicFieldType]
        pad(size)
        push(f.name, size)
        maxOffset = Math.max(maxOffset, size)
        continue;
      }

      if (f.type == "padding") {
        push(f.name, f.size)
        continue;
      }

      if (f.type == "struct") {
        let layout
        if (typeof f.definition == "string") {
          if (!StructLayoutGenerator.cache.has(f.definition)) {
            throw new Error("StructLayoutGenerator doesn't have a layout for " + f.definition)
          }
          layout = StructLayoutGenerator.cache.get(f.definition)!
        } else {
          // Now this works because generate is generic and accepts any StructDefinition
          layout = this.generate(f.definition)
        }
        pad(layout.alignment)
        push(f.name, layout.size)
        maxOffset = Math.max(maxOffset, layout.alignment)
        continue;
      }

      if (f.type == "array") {
        throw new Error("Not implemented")
        continue;
      }
    }

    pad(maxOffset)

    let res: StructLayout = {
      name: structDefinition.name,
      fields: fields,
      alignment: maxOffset,
      size: cur
    }

    return res
  }

  public getField<K extends T['fields'][number]['name']>(name: K) {
    const field = this.layout.fields.find(f => f.name === name)! //safe to use ! because the argument is type safe itself
    return field
  }

  public visualize(): string {
    const { name, fields, size, alignment } = this.layout;

    // Calculate the maximum width needed for the visualization
    const maxNameLength = Math.max(...fields.map(f => f.name.length), name.length);
    const width = Math.max(60, maxNameLength + 30); // Minimum width of 60 chars

    const topBorder = `┌${'─'.repeat(width - 2)}┐`;
    const bottomBorder = `└${'─'.repeat(width - 2)}┘`;
    const separator = `├${'─'.repeat(width - 2)}┤`;

    let result = [];

    // Header
    result.push(topBorder);
    result.push(`│ ${name.padEnd(width - 4)} │`);
    result.push(`│ ${`Size: ${size} bytes, Alignment: ${alignment} bytes`.padEnd(width - 4)} │`);
    result.push(separator);

    // Fields
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]!;
      const isPadding = field.name === '__padding';

      // Calculate field range
      const startOffset = field.offset;
      const endOffset = field.offset + field.size - 1;
      const range = `${startOffset.toString().padStart(3)}-${endOffset.toString().padStart(3)}`;

      // Format field line
      const namePart = isPadding ? '[padding]' : field.name;
      const sizePart = `${field.size} byte${field.size !== 1 ? 's' : ''}`;
      const content = `${range} │ ${namePart.padEnd(maxNameLength)} │ ${sizePart}`;

      // Draw field with appropriate styling
      if (isPadding) {
        result.push(`│ ${content.padEnd(width - 4, '░')} │`);
      } else {
        result.push(`│ ${content.padEnd(width - 4)} │`);
      }

      // Add separator between fields (except after the last one)
      if (i < fields.length - 1) {
        // result.push(separator);
      }
    }

    // Footer
    result.push(bottomBorder);

    return result.join('\n');
  }
}