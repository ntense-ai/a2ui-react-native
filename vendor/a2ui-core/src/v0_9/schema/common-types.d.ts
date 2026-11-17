import { z } from 'zod';
export declare const ComponentIdSchema: z.ZodString;
export type ComponentId = z.infer<typeof ComponentIdSchema>;
export declare const DataBindingSchema: z.ZodObject<{
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>;
export type DataBinding = z.infer<typeof DataBindingSchema>;
export type DynamicValue = string | number | boolean | unknown[] | DataBinding | FunctionCall;
export declare const DynamicValueSchema: z.ZodType<DynamicValue>;
export interface FunctionCall {
    call: string;
    args?: Record<string, unknown>;
    returnType?: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'any' | 'void';
}
export declare const FunctionCallSchema: z.ZodType<FunctionCall>;
export declare const DynamicStringSchema: z.ZodUnion<[z.ZodString, z.ZodObject<{
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
export type DynamicString = z.infer<typeof DynamicStringSchema>;
export declare const AccessibilityAttributesSchema: z.ZodObject<{
    label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
    description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
}, "strip", z.ZodTypeAny, {
    label?: string | {
        path: string;
    } | FunctionCall | undefined;
    description?: string | {
        path: string;
    } | FunctionCall | undefined;
}, {
    label?: string | {
        path: string;
    } | FunctionCall | undefined;
    description?: string | {
        path: string;
    } | FunctionCall | undefined;
}>;
export type AccessibilityAttributes = z.infer<typeof AccessibilityAttributesSchema>;
export declare const ComponentCommonSchema: z.ZodObject<{
    id: z.ZodString;
    accessibility: z.ZodOptional<z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    }, {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    accessibility?: {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    } | undefined;
}, {
    id: string;
    accessibility?: {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    } | undefined;
}>;
export type ComponentCommon = z.infer<typeof ComponentCommonSchema>;
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
export declare const DynamicNumberSchema: z.ZodUnion<[z.ZodNumber, z.ZodObject<{
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
export type DynamicNumber = z.infer<typeof DynamicNumberSchema>;
export declare const DynamicBooleanSchema: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
export type DynamicBoolean = z.infer<typeof DynamicBooleanSchema>;
export declare const DynamicStringListSchema: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
    path: z.ZodString;
}, "strict", z.ZodTypeAny, {
    path: string;
}, {
    path: string;
}>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
export type DynamicStringList = z.infer<typeof DynamicStringListSchema>;
export declare const CheckRuleSchema: z.ZodObject<{
    condition: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
    message: z.ZodString;
}, "strict", z.ZodTypeAny, {
    message: string;
    condition: boolean | {
        path: string;
    } | FunctionCall;
}, {
    message: string;
    condition: boolean | {
        path: string;
    } | FunctionCall;
}>;
export type CheckRule = z.infer<typeof CheckRuleSchema>;
export declare const CheckableSchema: z.ZodObject<{
    checks: z.ZodOptional<z.ZodArray<z.ZodObject<{
        condition: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }, {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    checks?: {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }[] | undefined;
}, {
    checks?: {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }[] | undefined;
}>;
export type Checkable = z.infer<typeof CheckableSchema>;
export declare const ActionSchema: z.ZodUnion<[z.ZodObject<{
    event: z.ZodObject<{
        name: z.ZodString;
        context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<DynamicValue, z.ZodTypeDef, DynamicValue>>>;
    }, "strict", z.ZodTypeAny, {
        name: string;
        context?: Record<string, DynamicValue> | undefined;
    }, {
        name: string;
        context?: Record<string, DynamicValue> | undefined;
    }>;
}, "strict", z.ZodTypeAny, {
    event: {
        name: string;
        context?: Record<string, DynamicValue> | undefined;
    };
}, {
    event: {
        name: string;
        context?: Record<string, DynamicValue> | undefined;
    };
}>, z.ZodObject<{
    functionCall: z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>;
}, "strict", z.ZodTypeAny, {
    functionCall: FunctionCall;
}, {
    functionCall: FunctionCall;
}>]>;
export type Action = z.infer<typeof ActionSchema>;
export declare const CommonSchemas: {
    ComponentId: z.ZodString;
    DataBinding: z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>;
    DynamicValue: z.ZodType<DynamicValue, z.ZodTypeDef, DynamicValue>;
    FunctionCall: z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>;
    DynamicString: z.ZodUnion<[z.ZodString, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
    AccessibilityAttributes: z.ZodObject<{
        label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
        description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
    }, "strip", z.ZodTypeAny, {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    }, {
        label?: string | {
            path: string;
        } | FunctionCall | undefined;
        description?: string | {
            path: string;
        } | FunctionCall | undefined;
    }>;
    ComponentCommon: z.ZodObject<{
        id: z.ZodString;
        accessibility: z.ZodOptional<z.ZodObject<{
            label: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                path: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
            description: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                path: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>>;
        }, "strip", z.ZodTypeAny, {
            label?: string | {
                path: string;
            } | FunctionCall | undefined;
            description?: string | {
                path: string;
            } | FunctionCall | undefined;
        }, {
            label?: string | {
                path: string;
            } | FunctionCall | undefined;
            description?: string | {
                path: string;
            } | FunctionCall | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        accessibility?: {
            label?: string | {
                path: string;
            } | FunctionCall | undefined;
            description?: string | {
                path: string;
            } | FunctionCall | undefined;
        } | undefined;
    }, {
        id: string;
        accessibility?: {
            label?: string | {
                path: string;
            } | FunctionCall | undefined;
            description?: string | {
                path: string;
            } | FunctionCall | undefined;
        } | undefined;
    }>;
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
    DynamicNumber: z.ZodUnion<[z.ZodNumber, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
    DynamicBoolean: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
    DynamicStringList: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
        path: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        path: string;
    }, {
        path: string;
    }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
    CheckRule: z.ZodObject<{
        condition: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
        }, {
            path: string;
        }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
        message: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }, {
        message: string;
        condition: boolean | {
            path: string;
        } | FunctionCall;
    }>;
    Checkable: z.ZodObject<{
        checks: z.ZodOptional<z.ZodArray<z.ZodObject<{
            condition: z.ZodUnion<[z.ZodBoolean, z.ZodObject<{
                path: z.ZodString;
            }, "strict", z.ZodTypeAny, {
                path: string;
            }, {
                path: string;
            }>, z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>]>;
            message: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            message: string;
            condition: boolean | {
                path: string;
            } | FunctionCall;
        }, {
            message: string;
            condition: boolean | {
                path: string;
            } | FunctionCall;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        checks?: {
            message: string;
            condition: boolean | {
                path: string;
            } | FunctionCall;
        }[] | undefined;
    }, {
        checks?: {
            message: string;
            condition: boolean | {
                path: string;
            } | FunctionCall;
        }[] | undefined;
    }>;
    Action: z.ZodUnion<[z.ZodObject<{
        event: z.ZodObject<{
            name: z.ZodString;
            context: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodType<DynamicValue, z.ZodTypeDef, DynamicValue>>>;
        }, "strict", z.ZodTypeAny, {
            name: string;
            context?: Record<string, DynamicValue> | undefined;
        }, {
            name: string;
            context?: Record<string, DynamicValue> | undefined;
        }>;
    }, "strict", z.ZodTypeAny, {
        event: {
            name: string;
            context?: Record<string, DynamicValue> | undefined;
        };
    }, {
        event: {
            name: string;
            context?: Record<string, DynamicValue> | undefined;
        };
    }>, z.ZodObject<{
        functionCall: z.ZodType<FunctionCall, z.ZodTypeDef, FunctionCall>;
    }, "strict", z.ZodTypeAny, {
        functionCall: FunctionCall;
    }, {
        functionCall: FunctionCall;
    }>]>;
};
