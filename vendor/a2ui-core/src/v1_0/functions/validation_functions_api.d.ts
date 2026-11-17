import type { ValidationResultInput } from '../schema/catalog-definition.js';
declare module '../../catalog/types.js' {
    interface A2uiReturnTypeMap {
        validationResult: ValidationResultInput;
    }
}
/**
 * v1.0 required validation function.
 * Return type: 'validationResult'.
 */
export declare const RequiredV1Point0Api: {
    name: "required";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
/**
 * v1.0 regex validation function.
 * Return type: 'validationResult'.
 */
export declare const RegexV1Point0Api: {
    name: "regex";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        pattern: import("zod").ZodString;
    }, "strict", import("zod").ZodTypeAny, {
        pattern: string;
        value?: any;
    }, {
        pattern: string;
        value?: any;
    }>;
};
/**
 * v1.0 length validation function.
 * Return type: 'validationResult'.
 */
export declare const LengthV1Point0Api: {
    name: "length";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        min: import("zod").ZodOptional<import("zod").ZodNumber>;
        max: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
};
/**
 * v1.0 numeric validation function.
 * Return type: 'validationResult'.
 */
export declare const NumericV1Point0Api: {
    name: "numeric";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        min: import("zod").ZodOptional<import("zod").ZodNumber>;
        max: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
};
/**
 * v1.0 email validation function.
 * Return type: 'validationResult'.
 */
export declare const EmailV1Point0Api: {
    name: "email";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
};
/**
 * v1.0 basic catalog validation APIs.
 */
export declare const V10_VALIDATION_FUNCTION_APIS: ({
    name: "required";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodEffects<import("zod").ZodAny, any, any>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
} | {
    name: "regex";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        pattern: import("zod").ZodString;
    }, "strict", import("zod").ZodTypeAny, {
        pattern: string;
        value?: any;
    }, {
        pattern: string;
        value?: any;
    }>;
} | {
    name: "length";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        min: import("zod").ZodOptional<import("zod").ZodNumber>;
        max: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "numeric";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodEffects<import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodNumber, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
        min: import("zod").ZodOptional<import("zod").ZodNumber>;
        max: import("zod").ZodOptional<import("zod").ZodNumber>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }, {
        value?: any;
        min?: number | undefined;
        max?: number | undefined;
    }>;
} | {
    name: "email";
    returnType: "validationResult";
    description: string;
    schema: import("zod").ZodObject<{
        value: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodEffects<import("zod").ZodObject<{
            '@path': import("zod").ZodOptional<import("zod").ZodString>;
            path: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodIntersection<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodAny>, import("zod").ZodIntersection<import("zod").ZodEffects<import("zod").ZodObject<{
            '@call': import("zod").ZodOptional<import("zod").ZodString>;
            call: import("zod").ZodOptional<import("zod").ZodString>;
            catalogId: import("zod").ZodOptional<import("zod").ZodString>;
        }, "strip", import("zod").ZodTypeAny, {
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
        }>, import("zod").ZodAny>>]>;
    }, "strict", import("zod").ZodTypeAny, {
        value?: any;
    }, {
        value?: any;
    }>;
})[];
