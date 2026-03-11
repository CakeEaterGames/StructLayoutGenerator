# Struct Layout Generator

Work in progress!

This project consumes a Struct Definition for C/C++ structs and returns a table of offsets. Made to be used for memory reading 

To run call:
```bash
bun install
bun run dev
```


Example output... (If someone could comment on the layout of packed bits starting at 28, that would be great)
```
┌──────────────────────────────────────────────────────────┐
│ _MonoClass                                               │
│ Size: 232 bytes, Alignment: 8 bytes                      │
├──────────────────────────────────────────────────────────┤
│   0-  7 │ element_class            │ 8 bytes             │
│   8- 15 │ cast_class               │ 8 bytes             │
│  16- 23 │ supertypes               │ 8 bytes             │
│  24- 25 │ idepth                   │ 2 bytes             │
│  26- 26 │ rank                     │ 1 byte              │
│  27- 27 │ class_kind               │ 1 byte              │
│  28- 31 │ bitfields1               │ 4 bytes             │
│  32- 32 │ min_align                │ 1 byte              │
│  33- 33 │ bitfields2               │ 1 byte              │
│  34- 34 │ bitfields3               │ 1 byte              │
│  35- 35 │ bitfields4               │ 1 byte              │
│  36- 39 │ [padding]                │ 4 bytes░░░░░░░░░░░░ │
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
│ 136-139 │ sizes                    │ 4 bytes             │
│ 140-143 │ [padding]                │ 4 bytes░░░░░░░░░░░░ │
│ 144-151 │ fields                   │ 8 bytes             │
│ 152-159 │ methods                  │ 8 bytes             │
│ 160-175 │ this_arg                 │ 16 bytes            │
│ 176-191 │ _byval_arg               │ 16 bytes            │
│ 192-199 │ gc_descr                 │ 8 bytes             │
│ 200-207 │ runtime_info             │ 8 bytes             │
│ 208-215 │ vtable                   │ 8 bytes             │
│ 216-223 │ infrequent_data          │ 8 bytes             │
│ 224-231 │ unity_user_data          │ 8 bytes             │
└──────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────┐
│ _MonoClassDef                                            │
│ Size: 264 bytes, Alignment: 8 bytes                      │
├──────────────────────────────────────────────────────────┤
│   0-231 │ klass            │ 232 bytes                   │
│ 232-235 │ flags            │ 4 bytes                     │
│ 236-239 │ first_method_idx │ 4 bytes                     │
│ 240-243 │ first_field_idx  │ 4 bytes                     │
│ 244-247 │ method_count     │ 4 bytes                     │
│ 248-251 │ field_count      │ 4 bytes                     │
│ 252-255 │ [padding]        │ 4 bytes░░░░░░░░░░░░░░░░░░░░ │
│ 256-263 │ next_class_cache │ 8 bytes                     │
└──────────────────────────────────────────────────────────┘
```
