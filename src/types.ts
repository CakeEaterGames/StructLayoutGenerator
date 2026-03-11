export type Field = BasicField | StructField | UnknownField | ArrayField

export type BasicField = {
  type: BasicFieldType
  ctype?: string
  name: string,
}

export type UnknownField = {
  type: "padding"
  name: string
  size: number,
}

export type StructField = {
  type: "struct"
  ctype?: string
  name: string,
  definition: StructDefinition | StructDefinitionRef
}

export type ArrayField = {
  type: "array"
  ctype?: string,
  name: string,
  arrayType: BasicField | StructField
}

export type BasicFieldType = keyof typeof FieldSizes

export const FieldSizes = {
  ptr: 8,
  uint8: 1,
  uint16: 2,
  uint32: 4,
  uint64: 8,
  int8: 1,
  int16: 2,
  int32: 4,
  int64: 8,
  float: 4,
  double: 8,
  char: 1,
  bool: 1,
} as const

export type StructDefinition = {
  name: string,
  // fields: Field[],
  fields: readonly Field[],
}
export type StructDefinitionRef = string
export type StructLayout = {
  name: string,
  fields: {
    name: string,
    offset: number,
    size: number,
  }[]
  alignment: number,
  size: number,
}


