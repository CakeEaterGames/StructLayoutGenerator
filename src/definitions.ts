import type { StructDefinition } from "./types";

function defineStruct<T extends StructDefinition>(def: T): T {
  return def;
}



export const _MonoTypeStructDefinition = defineStruct({
  name: "MonoType",
  fields: [
    { ctype: "MonoClass", name: "klass", type: "ptr" },
    { ctype: "MonoTypeEnum", name: "type", type: "uint8" },
    { ctype: "guint16", name: "num_mods", type: "uint16" },
    { ctype: "MonoCustomMod", name: "modifiers", type: "ptr" },
    { ctype: "MonoType", name: "byval_type", type: "ptr" },
    { ctype: "MonoArrayType", name: "array_type", type: "ptr" },
  ]
} as const);

export const _MonoClassSizesStructDefinition = defineStruct({
  name: "_MonoClassSizes",
  fields: [
    { ctype: "guint32", name: "class_size", type: "uint32" },
    { ctype: "guint32", name: "element_size", type: "uint32" },
    { ctype: "guint16", name: "native_size", type: "uint16" },
    { ctype: "guint16", name: "static_field_size", type: "uint16" },
    { ctype: "guint16", name: "generic_param_token", type: "uint16" },
    { ctype: "guint32", name: "instance_size", type: "uint32" },
    { ctype: "guint32", name: "instance_size_alloc", type: "uint32" }
  ]
} as const);

export const _MonoGCDescriptorStructDefinition = defineStruct({
  name: "MonoGCDescriptor",
  fields: [
    { ctype: "void*", name: "gc_descr", type: "ptr" },
  ]
} as const);

export const _MonoClassRuntimeInfoStructDefinition = defineStruct({
  name: "MonoClassRuntimeInfo",
  fields: [
    { ctype: "MonoDomain", name: "domain", type: "ptr" },
    { ctype: "guint32", name: "max_dom", type: "uint32" },
    { ctype: "MonoVTable*", name: "vtables", type: "ptr" }
  ]
} as const);

export const _MonoPropertyBagStructDefinition = defineStruct({
  name: "MonoPropertyBag",
  fields: [
    { ctype: "MonoPropertyBagItem", name: "head", type: "ptr" }
  ]
} as const);

export const _MonoClassStructDefinition = defineStruct({
  name: "_MonoClass",
  fields: [
    { ctype: "MonoClass", name: "element_class", type: "ptr" },
    { ctype: "MonoClass", name: "cast_class", type: "ptr" },
    { ctype: "MonoClass", name: "supertypes", type: "ptr" },
    { ctype: "guint16", name: "idepth", type: "uint16" },
    { ctype: "guint8", name: "rank", type: "uint8" },
    { ctype: "guint8", name: "class_kind", type: "uint8" },

    { type: "padding", name: "bitfield_padding1", size: 1 }, // This represents bitfields from 'inited' through 'is_byreflike'

    // Next byte - alignment and packing
    { ctype: "guint8", name: "min_align", type: "uint8" },
    { type: "padding", name: "bitfield_padding2", size: 1 }, // Bitfields from 'packing_size' through 'contextbound'
    { type: "padding", name: "bitfield_padding3", size: 1 }, // Bitfields from 'delegate' through 'nested_classes_inited'
    { type: "padding", name: "bitfield_padding4", size: 1 }, // Bitfields from 'interfaces_inited' through 'has_dim_conflicts'

    { ctype: "MonoClass", name: "parent", type: "ptr" },
    { ctype: "MonoClass", name: "nested_in", type: "ptr" },
    { ctype: "MonoImage", name: "image", type: "ptr" },
    { ctype: "const char*", name: "name", type: "ptr" },
    { ctype: "const char*", name: "name_space", type: "ptr" },
    { ctype: "guint32", name: "type_token", type: "uint32" },

    { ctype: "int", name: "vtable_size", type: "int32" },
    { ctype: "guint16", name: "interface_count", type: "uint16" },
    { ctype: "guint32", name: "interface_id", type: "uint32" },
    { ctype: "guint32", name: "max_interface_id", type: "uint32" },
    { ctype: "guint16", name: "interface_offsets_count", type: "uint16" },
    { ctype: "MonoClass", name: "interfaces_packed", type: "ptr" },
    { ctype: "guint16", name: "interface_offsets_packed", type: "ptr" },
    { ctype: "guint8", name: "interface_bitmap", type: "ptr" },
    { ctype: "MonoClass", name: "interfaces", type: "ptr" },

    {
      ctype: "union _MonoClassSizes",
      name: "sizes",
      type: "struct",
      definition: _MonoClassSizesStructDefinition
    },

    { ctype: "MonoClassField", name: "fields", type: "ptr" },
    { ctype: "MonoMethod", name: "methods", type: "ptr" },

    {
      ctype: "MonoType",
      name: "this_arg",
      type: "struct",
      definition: _MonoTypeStructDefinition
    },
    {
      ctype: "MonoType",
      name: "_byval_arg",
      type: "struct",
      definition: _MonoTypeStructDefinition
    },

    {
      ctype: "MonoGCDescriptor",
      name: "gc_descr",
      type: "struct",
      definition: _MonoGCDescriptorStructDefinition
    },
    {
      ctype: "MonoClassRuntimeInfo",
      name: "runtime_info",
      type: "struct",
      definition: _MonoClassRuntimeInfoStructDefinition
    },

    { ctype: "MonoMethod", name: "vtable", type: "ptr" },
    {
      ctype: "MonoPropertyBag",
      name: "infrequent_data",
      type: "struct",
      definition: _MonoPropertyBagStructDefinition
    },

    { ctype: "void*", name: "unity_user_data", type: "ptr" },

  ]
} as const);

















// struct _MonoClass {
// 	MonoClass *element_class; 
// 	MonoClass *cast_class; 
// 	MonoClass **supertypes;
// 	guint16     idepth;
// 	guint8     rank;
// 	guint8     class_kind;
// 	guint inited          : 1;

// 	/* ALL BITFIELDS SHOULD BE WRITTEN WHILE HOLDING THE LOADER LOCK */
// 	guint size_inited     : 1;
// 	guint valuetype       : 1; /* derives from System.ValueType */
// 	guint enumtype        : 1; /* derives from System.Enum */
// 	guint blittable       : 1; /* class is blittable */
// 	guint unicode         : 1; /* class uses unicode char when marshalled */
// 	guint wastypebuilder  : 1; /* class was created at runtime from a TypeBuilder */
// 	guint is_array_special_interface : 1; /* gtd or ginst of once of the magic interfaces that arrays implement */
// 	guint is_byreflike    : 1; /* class is a valuetype and has System.Runtime.CompilerServices.IsByRefLikeAttribute */

// 	/* next byte */
// 	guint8 min_align;
// 	guint packing_size    : 4;
// 	guint ghcimpl         : 1; /* class has its own GetHashCode impl */ 
// 	guint has_finalize    : 1; /* class has its own Finalize impl */ 
// 	guint marshalbyref    : 1; /* class is a MarshalByRefObject */
// 	guint contextbound    : 1; /* class is a ContextBoundObject */

// 	/* next byte */
// 	guint delegate        : 1; /* class is a Delegate */
// 	guint gc_descr_inited : 1; /* gc_descr is initialized */
// 	guint has_cctor       : 1; /* class has a cctor */
// 	guint has_references  : 1; /* it has GC-tracked references in the instance */
// 	guint has_static_refs : 1; /* it has static fields that are GC-tracked */
// 	guint no_special_static_fields : 1; /* has no thread/context static fields */
// 	guint is_com_object : 1; 
// 	guint nested_classes_inited : 1; /* Whenever nested_class is initialized */

// 	/* next byte*/
// 	guint interfaces_inited : 1; /* interfaces is initialized */
// 	guint simd_type : 1; /* class is a simd intrinsic type */
// 	guint has_finalize_inited    : 1; /* has_finalize is initialized */
// 	guint fields_inited : 1; /* setup_fields () has finished */
// 	guint has_failure : 1; /* See mono_class_get_exception_data () for a MonoErrorBoxed with the details */
// 	guint has_weak_fields : 1; /* class has weak reference fields */
// 	guint has_dim_conflicts : 1; /* Class has conflicting default interface methods */

// 	MonoClass  *parent;
// 	MonoClass  *nested_in;
// 	MonoImage *image;
// 	const char *name;
// 	const char *name_space;
// 	guint32    type_token;
// 	int        vtable_size; /* number of slots */
// 	guint16     interface_count;
// 	guint32     interface_id;        /* unique inderface id (for interfaces) */
// 	guint32     max_interface_id;
// 	guint16     interface_offsets_count;
// 	MonoClass **interfaces_packed;
// 	guint16    *interface_offsets_packed;
// 	guint8     *interface_bitmap;
// 	MonoClass **interfaces;
// 	union _MonoClassSizes sizes;
// 	MonoClassField *fields;
// 	MonoMethod **methods;
// 	MonoType this_arg;
// 	MonoType _byval_arg;
// 	MonoGCDescriptor gc_descr;
// 	MonoClassRuntimeInfo *runtime_info;
// 	MonoMethod **vtable;
// 	MonoPropertyBag infrequent_data;
// 	void *unity_user_data;
// };