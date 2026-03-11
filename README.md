# Struct Layout Generator

Work in progress!

This project consumes a Struct Definition for C/C++ structs and returns a table of offsets. Made to be used for memory reading 

To run call:
```bash
bun install
bun run dev
```


Example output... Not yet fully correct
```
┌──────────────────────────────────────────────────────────┐
│ _MonoClass                                               │
│ Size: 312 bytes, Alignment: 8 bytes                      │
├──────────────────────────────────────────────────────────┤
│   0-  7 │ element_class            │ 8 bytes             │
│   8- 15 │ cast_class               │ 8 bytes             │
│  16- 23 │ supertypes               │ 8 bytes             │
│  24- 25 │ idepth                   │ 2 bytes             │
│  26- 26 │ rank                     │ 1 byte              │
│  27- 27 │ class_kind               │ 1 byte              │
│  28- 28 │ bitfield_padding1        │ 1 byte              │
│  29- 29 │ min_align                │ 1 byte              │
│  30- 30 │ bitfield_padding2        │ 1 byte              │
│  31- 31 │ bitfield_padding3        │ 1 byte              │
│  32- 32 │ bitfield_padding4        │ 1 byte              │
│  33- 39 │ [padding]                │ 7 bytes░░░░░░░░░░░░ │
│  40- 47 │ parent                   │ 8 bytes             │
│  48- 55 │ nested_in                │ 8 bytes             │
│  56- 63 │ image                    │ 8 bytes             │
│  64- 71 │ name                     │ 8 bytes             │
│  72- 79 │ name_space               │ 8 bytes             │
│  80- 83 │ type_token               │ 4 bytes             │
│  84- 87 │ vtable_size              │ 4 bytes             │
│  88- 89 │ interface_count          │ 2 bytes             │
│  90- 91 │ [padding]                │ 2 bytes░░░░░░░░░░░░ │
│  92- 95 │ interface_id             │ 4 bytes             │
│  96- 99 │ max_interface_id         │ 4 bytes             │
│ 100-101 │ interface_offsets_count  │ 2 bytes             │
│ 102-103 │ [padding]                │ 2 bytes░░░░░░░░░░░░ │
│ 104-111 │ interfaces_packed        │ 8 bytes             │
│ 112-119 │ interface_offsets_packed │ 8 bytes             │
│ 120-127 │ interface_bitmap         │ 8 bytes             │
│ 128-135 │ interfaces               │ 8 bytes             │
│ 136-159 │ _MonoClassSizes          │ 24 bytes            │
│ 160-167 │ fields                   │ 8 bytes             │
│ 168-175 │ methods                  │ 8 bytes             │
│ 176-215 │ MonoType                 │ 40 bytes            │
│ 216-255 │ MonoType                 │ 40 bytes            │
│ 256-263 │ MonoGCDescriptor         │ 8 bytes             │
│ 264-287 │ MonoClassRuntimeInfo     │ 24 bytes            │
│ 288-295 │ vtable                   │ 8 bytes             │
│ 296-303 │ MonoPropertyBag          │ 8 bytes             │
│ 304-311 │ unity_user_data          │ 8 bytes             │
└──────────────────────────────────────────────────────────┘
```
