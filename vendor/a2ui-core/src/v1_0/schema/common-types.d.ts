import { z } from 'zod';
export declare const ComponentIdSchema: z.ZodString;
export type ComponentId = z.infer<typeof ComponentIdSchema>;
export declare const CallIdSchema: z.ZodString;
export type CallId = z.infer<typeof CallIdSchema>;
export declare const DataBindingSchema: z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>;
export type DataBinding = z.infer<typeof DataBindingSchema>;
export declare const FunctionCommonSchema: z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>;
export type FunctionCommon = z.infer<typeof FunctionCommonSchema>;
export declare const FunctionCallSchema: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>;
export type FunctionCall = z.infer<typeof FunctionCallSchema>;
export declare const DynamicStringSchema: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>]>;
export type DynamicString = z.infer<typeof DynamicStringSchema>;
export declare const DynamicBooleanSchema: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>]>;
export type DynamicBoolean = z.infer<typeof DynamicBooleanSchema>;
export declare const AccessibilityAttributesSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>>;
    live: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
    hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>>;
}, "strict", z.ZodTypeAny, {
    live: "off" | "polite" | "assertive";
    label?: any;
    description?: any;
    hidden?: any;
}, {
    label?: any;
    description?: any;
    live?: "off" | "polite" | "assertive" | undefined;
    hidden?: any;
}>;
export type AccessibilityAttributes = z.infer<typeof AccessibilityAttributesSchema>;
export declare const ExtensionsSchema: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
export type Extensions = z.infer<typeof ExtensionsSchema>;
export declare const ComponentCommonSchema: z.ZodObject<{
    id: z.ZodString;
    '@catalogId': z.ZodOptional<z.ZodString>;
    '@accessibility': z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
        live: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
        hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        live: "off" | "polite" | "assertive";
        label?: any;
        description?: any;
        hidden?: any;
    }, {
        label?: any;
        description?: any;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: any;
    }>>;
    '@metadata': z.ZodOptional<z.ZodObject<{
        extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
    }, "strict", z.ZodTypeAny, {
        extensions?: Record<string, unknown> | undefined;
    }, {
        extensions?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    '@catalogId'?: string | undefined;
    '@accessibility'?: {
        live: "off" | "polite" | "assertive";
        label?: any;
        description?: any;
        hidden?: any;
    } | undefined;
    '@metadata'?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
}, {
    id: string;
    '@catalogId'?: string | undefined;
    '@accessibility'?: {
        label?: any;
        description?: any;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: any;
    } | undefined;
    '@metadata'?: {
        extensions?: Record<string, unknown> | undefined;
    } | undefined;
}>;
export type ComponentCommon = z.infer<typeof ComponentCommonSchema>;
export declare const ChildSchema: z.ZodString;
export type Child = z.infer<typeof ChildSchema>;
export declare const ChildListSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
    componentId: z.ZodString;
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
    componentId: string;
}, {
    path: string;
    componentId: string;
}>]>;
export type ChildList = z.infer<typeof ChildListSchema>;
export declare const DynamicValueSchema: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>]>;
export type DynamicValue = z.infer<typeof DynamicValueSchema>;
export declare const DynamicNumberSchema: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>]>;
export type DynamicNumber = z.infer<typeof DynamicNumberSchema>;
export declare const DynamicStringListSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
    '@path': z.ZodOptional<z.ZodString>;
    path: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, {
    path?: string | undefined;
    '@path'?: string | undefined;
}, {
    path?: string | undefined;
    '@path'?: string | undefined;
}>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodString>;
    call: z.ZodOptional<z.ZodString>;
    catalogId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}, {
    call?: string | undefined;
    '@call'?: string | undefined;
    catalogId?: string | undefined;
}>, z.ZodAny>>]>;
export type DynamicStringList = z.infer<typeof DynamicStringListSchema>;
export declare const IndexSystemFunctionSchema: z.ZodEffects<z.ZodObject<{
    '@call': z.ZodOptional<z.ZodLiteral<"@index">>;
    call: z.ZodOptional<z.ZodLiteral<"@index">>;
    args: z.ZodOptional<z.ZodObject<{
        offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
    }, "strip", z.ZodTypeAny, {
        offset?: any;
    }, {
        offset?: any;
    }>>;
}, "strip", z.ZodTypeAny, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: any;
    } | undefined;
}, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: any;
    } | undefined;
}>, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: any;
    } | undefined;
}, {
    call?: "@index" | undefined;
    '@call'?: "@index" | undefined;
    args?: {
        offset?: any;
    } | undefined;
}>;
export type IndexSystemFunction = z.infer<typeof IndexSystemFunctionSchema>;
export declare const CheckRuleSchema: z.ZodObject<{
    condition: z.ZodUnion<[z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    message: z.ZodOptional<z.ZodString>;
}, "strict", z.ZodTypeAny, {
    message?: string | undefined;
    condition?: any;
}, {
    message?: string | undefined;
    condition?: any;
}>;
export type CheckRule = z.infer<typeof CheckRuleSchema>;
export declare const CheckableSchema: z.ZodObject<{
    '@checks': z.ZodOptional<z.ZodArray<z.ZodObject<{
        condition: z.ZodUnion<[z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        message?: string | undefined;
        condition?: any;
    }, {
        message?: string | undefined;
        condition?: any;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    '@checks'?: {
        message?: string | undefined;
        condition?: any;
    }[] | undefined;
}, {
    '@checks'?: {
        message?: string | undefined;
        condition?: any;
    }[] | undefined;
}>;
export type Checkable = z.infer<typeof CheckableSchema>;
export declare const ActionSchema: z.ZodUnion<[z.ZodObject<{
    event: z.ZodObject<{
        name: z.ZodString;
        userMessage: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
        context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        context?: Record<string, any> | undefined;
        userMessage?: any;
    }, {
        name: string;
        context?: Record<string, any> | undefined;
        userMessage?: any;
    }>;
}, "strict", z.ZodTypeAny, {
    event: {
        name: string;
        context?: Record<string, any> | undefined;
        userMessage?: any;
    };
}, {
    event: {
        name: string;
        context?: Record<string, any> | undefined;
        userMessage?: any;
    };
}>, z.ZodObject<{
    functionCall: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>;
}, "strict", z.ZodTypeAny, {
    functionCall?: any;
}, {
    functionCall?: any;
}>]>;
export type Action = z.infer<typeof ActionSchema>;
export declare const SurfaceSchema: z.ZodObject<{
    component: z.ZodOptional<z.ZodLiteral<"Surface">>;
    child: z.ZodOptional<z.ZodLiteral<"root">>;
}, "strict", z.ZodTypeAny, {
    component?: "Surface" | undefined;
    child?: "root" | undefined;
}, {
    component?: "Surface" | undefined;
    child?: "root" | undefined;
}>;
export type Surface = z.infer<typeof SurfaceSchema>;
export declare const FunctionResponseSchema: z.ZodEffects<z.ZodObject<{
    functionCallId: z.ZodString;
    value: z.ZodOptional<z.ZodAny>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        code: string;
        message: string;
    }, {
        code: string;
        message: string;
    }>>;
}, "strict", z.ZodTypeAny, {
    functionCallId: string;
    value?: any;
    error?: {
        code: string;
        message: string;
    } | undefined;
}, {
    functionCallId: string;
    value?: any;
    error?: {
        code: string;
        message: string;
    } | undefined;
}>, {
    functionCallId: string;
    value?: any;
    error?: {
        code: string;
        message: string;
    } | undefined;
}, {
    functionCallId: string;
    value?: any;
    error?: {
        code: string;
        message: string;
    } | undefined;
}>;
export type FunctionResponse = z.infer<typeof FunctionResponseSchema>;
export declare const CommonSchemas: {
    ComponentId: z.ZodString;
    CallId: z.ZodString;
    DataBinding: z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>;
    FunctionCommon: z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>;
    FunctionCall: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>;
    DynamicString: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    DynamicBoolean: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    AccessibilityAttributes: z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
        live: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
        hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>>;
    }, "strict", z.ZodTypeAny, {
        live: "off" | "polite" | "assertive";
        label?: any;
        description?: any;
        hidden?: any;
    }, {
        label?: any;
        description?: any;
        live?: "off" | "polite" | "assertive" | undefined;
        hidden?: any;
    }>;
    Extensions: z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>;
    ComponentCommon: z.ZodObject<{
        id: z.ZodString;
        '@catalogId': z.ZodOptional<z.ZodString>;
        '@accessibility': z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>;
            description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>;
            live: z.ZodDefault<z.ZodEnum<["off", "polite", "assertive"]>>;
            hidden: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>;
        }, "strict", z.ZodTypeAny, {
            live: "off" | "polite" | "assertive";
            label?: any;
            description?: any;
            hidden?: any;
        }, {
            label?: any;
            description?: any;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: any;
        }>>;
        '@metadata': z.ZodOptional<z.ZodObject<{
            extensions: z.ZodOptional<z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>>;
        }, "strict", z.ZodTypeAny, {
            extensions?: Record<string, unknown> | undefined;
        }, {
            extensions?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        '@catalogId'?: string | undefined;
        '@accessibility'?: {
            live: "off" | "polite" | "assertive";
            label?: any;
            description?: any;
            hidden?: any;
        } | undefined;
        '@metadata'?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }, {
        id: string;
        '@catalogId'?: string | undefined;
        '@accessibility'?: {
            label?: any;
            description?: any;
            live?: "off" | "polite" | "assertive" | undefined;
            hidden?: any;
        } | undefined;
        '@metadata'?: {
            extensions?: Record<string, unknown> | undefined;
        } | undefined;
    }>;
    Child: z.ZodString;
    ChildList: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
        componentId: z.ZodString;
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
        componentId: string;
    }, {
        path: string;
        componentId: string;
    }>]>;
    DynamicValue: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    DynamicNumber: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    DynamicStringList: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
        '@path': z.ZodOptional<z.ZodString>;
        path: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }, {
        path?: string | undefined;
        '@path'?: string | undefined;
    }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodString>;
        call: z.ZodOptional<z.ZodString>;
        catalogId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }, {
        call?: string | undefined;
        '@call'?: string | undefined;
        catalogId?: string | undefined;
    }>, z.ZodAny>>]>;
    IndexSystemFunction: z.ZodEffects<z.ZodObject<{
        '@call': z.ZodOptional<z.ZodLiteral<"@index">>;
        call: z.ZodOptional<z.ZodLiteral<"@index">>;
        args: z.ZodOptional<z.ZodObject<{
            offset: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>;
        }, "strip", z.ZodTypeAny, {
            offset?: any;
        }, {
            offset?: any;
        }>>;
    }, "strip", z.ZodTypeAny, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: any;
        } | undefined;
    }, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: any;
        } | undefined;
    }>, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: any;
        } | undefined;
    }, {
        call?: "@index" | undefined;
        '@call'?: "@index" | undefined;
        args?: {
            offset?: any;
        } | undefined;
    }>;
    CheckRule: z.ZodObject<{
        condition: z.ZodUnion<[z.ZodEffects<z.ZodObject<{
            '@path': z.ZodOptional<z.ZodString>;
            path: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }, {
            path?: string | undefined;
            '@path'?: string | undefined;
        }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>]>;
        message: z.ZodOptional<z.ZodString>;
    }, "strict", z.ZodTypeAny, {
        message?: string | undefined;
        condition?: any;
    }, {
        message?: string | undefined;
        condition?: any;
    }>;
    Checkable: z.ZodObject<{
        '@checks': z.ZodOptional<z.ZodArray<z.ZodObject<{
            condition: z.ZodUnion<[z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>;
            message: z.ZodOptional<z.ZodString>;
        }, "strict", z.ZodTypeAny, {
            message?: string | undefined;
            condition?: any;
        }, {
            message?: string | undefined;
            condition?: any;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
    }, {
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
    }>;
    Action: z.ZodUnion<[z.ZodObject<{
        event: z.ZodObject<{
            name: z.ZodString;
            userMessage: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>;
            context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodArray<z.ZodAny, "many">, z.ZodEffects<z.ZodRecord<z.ZodString, z.ZodUnknown>, Record<string, unknown>, Record<string, unknown>>, z.ZodEffects<z.ZodObject<{
                '@path': z.ZodOptional<z.ZodString>;
                path: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }, {
                path?: string | undefined;
                '@path'?: string | undefined;
            }>, z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
                '@call': z.ZodOptional<z.ZodString>;
                call: z.ZodOptional<z.ZodString>;
                catalogId: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }, {
                call?: string | undefined;
                '@call'?: string | undefined;
                catalogId?: string | undefined;
            }>, z.ZodAny>>]>>>;
        }, "strict", z.ZodTypeAny, {
            name: string;
            context?: Record<string, any> | undefined;
            userMessage?: any;
        }, {
            name: string;
            context?: Record<string, any> | undefined;
            userMessage?: any;
        }>;
    }, "strict", z.ZodTypeAny, {
        event: {
            name: string;
            context?: Record<string, any> | undefined;
            userMessage?: any;
        };
    }, {
        event: {
            name: string;
            context?: Record<string, any> | undefined;
            userMessage?: any;
        };
    }>, z.ZodObject<{
        functionCall: z.ZodIntersection<z.ZodRecord<z.ZodString, z.ZodAny>, z.ZodIntersection<z.ZodEffects<z.ZodObject<{
            '@call': z.ZodOptional<z.ZodString>;
            call: z.ZodOptional<z.ZodString>;
            catalogId: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }, {
            call?: string | undefined;
            '@call'?: string | undefined;
            catalogId?: string | undefined;
        }>, z.ZodAny>>;
    }, "strict", z.ZodTypeAny, {
        functionCall?: any;
    }, {
        functionCall?: any;
    }>]>;
    Surface: z.ZodObject<{
        component: z.ZodOptional<z.ZodLiteral<"Surface">>;
        child: z.ZodOptional<z.ZodLiteral<"root">>;
    }, "strict", z.ZodTypeAny, {
        component?: "Surface" | undefined;
        child?: "root" | undefined;
    }, {
        component?: "Surface" | undefined;
        child?: "root" | undefined;
    }>;
    FunctionResponse: z.ZodEffects<z.ZodObject<{
        functionCallId: z.ZodString;
        value: z.ZodOptional<z.ZodAny>;
        error: z.ZodOptional<z.ZodObject<{
            code: z.ZodString;
            message: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            code: string;
            message: string;
        }, {
            code: string;
            message: string;
        }>>;
    }, "strict", z.ZodTypeAny, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }, {
        functionCallId: string;
        value?: any;
        error?: {
            code: string;
            message: string;
        } | undefined;
    }>;
};
