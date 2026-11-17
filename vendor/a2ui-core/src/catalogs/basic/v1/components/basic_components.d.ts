import { z } from 'zod';
import { ComponentApi } from '../../../../catalog/types.js';
export declare const WeightSchema: z.ZodNumber;
export declare const TextApi: {
    name: string;
    schema: z.ZodObject<{
        text: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        variant: z.ZodOptional<z.ZodDefault<z.ZodEnum<["caption", "body"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        weight?: number | undefined;
        text?: any;
        variant?: "caption" | "body" | undefined;
    }, {
        weight?: number | undefined;
        text?: any;
        variant?: "caption" | "body" | undefined;
    }>;
};
export declare const ImageApi: {
    name: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        fit: z.ZodOptional<z.ZodDefault<z.ZodEnum<["contain", "cover", "fill", "none", "scaleDown"]>>>;
        variant: z.ZodOptional<z.ZodDefault<z.ZodEnum<["icon", "avatar", "smallFeature", "mediumFeature", "largeFeature", "header"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        description?: any;
        weight?: number | undefined;
        url?: any;
        fit?: "fill" | "none" | "contain" | "cover" | "scaleDown" | undefined;
        variant?: "icon" | "avatar" | "smallFeature" | "mediumFeature" | "largeFeature" | "header" | undefined;
    }, {
        description?: any;
        weight?: number | undefined;
        url?: any;
        fit?: "fill" | "none" | "contain" | "cover" | "scaleDown" | undefined;
        variant?: "icon" | "avatar" | "smallFeature" | "mediumFeature" | "largeFeature" | "header" | undefined;
    }>;
};
export declare const IconApi: {
    name: string;
    schema: z.ZodObject<{
        name: z.ZodUnion<[z.ZodEnum<["accountCircle", "add", "arrowBack", "arrowForward", "attachFile", "calendarToday", "call", "camera", "check", "close", "delete", "download", "edit", "event", "error", "fastForward", "favorite", "favoriteOff", "folder", "help", "home", "info", "locationOn", "lock", "lockOpen", "mail", "menu", "moreVert", "moreHoriz", "notificationsOff", "notifications", "pause", "payment", "person", "phone", "photo", "play", "print", "refresh", "rewind", "search", "send", "settings", "share", "shoppingCart", "skipNext", "skipPrevious", "star", "starHalf", "starOff", "stop", "upload", "visibility", "visibilityOff", "volumeDown", "volumeMute", "volumeOff", "volumeUp", "warning"]>, z.ZodObject<{
            svgPath: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        }, "strip", z.ZodTypeAny, {
            svgPath?: any;
        }, {
            svgPath?: any;
        }>, z.ZodEffects<z.ZodObject<{
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
        }>]>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        name: "call" | "event" | "error" | "accountCircle" | "add" | "arrowBack" | "arrowForward" | "attachFile" | "calendarToday" | "camera" | "check" | "close" | "delete" | "download" | "edit" | "favorite" | "favoriteOff" | "folder" | "help" | "home" | "info" | "locationOn" | "lock" | "lockOpen" | "mail" | "menu" | "moreVert" | "moreHoriz" | "notificationsOff" | "notifications" | "payment" | "person" | "phone" | "photo" | "print" | "refresh" | "search" | "send" | "settings" | "share" | "shoppingCart" | "star" | "starHalf" | "starOff" | "upload" | "visibility" | "visibilityOff" | "warning" | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | "fastForward" | "pause" | "play" | "rewind" | "skipNext" | "skipPrevious" | "stop" | "volumeDown" | "volumeMute" | "volumeOff" | "volumeUp" | {
            svgPath?: any;
        };
        weight?: number | undefined;
    }, {
        name: "call" | "event" | "error" | "accountCircle" | "add" | "arrowBack" | "arrowForward" | "attachFile" | "calendarToday" | "camera" | "check" | "close" | "delete" | "download" | "edit" | "favorite" | "favoriteOff" | "folder" | "help" | "home" | "info" | "locationOn" | "lock" | "lockOpen" | "mail" | "menu" | "moreVert" | "moreHoriz" | "notificationsOff" | "notifications" | "payment" | "person" | "phone" | "photo" | "print" | "refresh" | "search" | "send" | "settings" | "share" | "shoppingCart" | "star" | "starHalf" | "starOff" | "upload" | "visibility" | "visibilityOff" | "warning" | {
            path?: string | undefined;
            '@path'?: string | undefined;
        } | "fastForward" | "pause" | "play" | "rewind" | "skipNext" | "skipPrevious" | "stop" | "volumeDown" | "volumeMute" | "volumeOff" | "volumeUp" | {
            svgPath?: any;
        };
        weight?: number | undefined;
    }>;
};
export declare const VideoApi: {
    name: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        posterUrl: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        weight?: number | undefined;
        url?: any;
        posterUrl?: any;
    }, {
        weight?: number | undefined;
        url?: any;
        posterUrl?: any;
    }>;
};
export declare const AudioPlayerApi: {
    name: string;
    schema: z.ZodObject<{
        url: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        description?: any;
        weight?: number | undefined;
        url?: any;
    }, {
        description?: any;
        weight?: number | undefined;
        url?: any;
    }>;
};
export declare const RowApi: {
    name: string;
    schema: z.ZodObject<{
        children: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
            componentId: z.ZodString;
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            componentId: string;
        }, {
            path: string;
            componentId: string;
        }>]>;
        justify: z.ZodOptional<z.ZodDefault<z.ZodEnum<["center", "end", "spaceAround", "spaceBetween", "spaceEvenly", "start", "stretch"]>>>;
        align: z.ZodOptional<z.ZodDefault<z.ZodEnum<["start", "center", "end", "stretch"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        justify?: "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly" | "stretch" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        justify?: "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly" | "stretch" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }>;
};
export declare const ColumnApi: {
    name: string;
    schema: z.ZodObject<{
        children: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
            componentId: z.ZodString;
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            componentId: string;
        }, {
            path: string;
            componentId: string;
        }>]>;
        justify: z.ZodOptional<z.ZodDefault<z.ZodEnum<["start", "center", "end", "spaceBetween", "spaceAround", "spaceEvenly", "stretch"]>>>;
        align: z.ZodOptional<z.ZodDefault<z.ZodEnum<["center", "end", "start", "stretch"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        justify?: "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly" | "stretch" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        justify?: "start" | "center" | "end" | "spaceBetween" | "spaceAround" | "spaceEvenly" | "stretch" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }>;
};
export declare const ListApi: {
    name: string;
    schema: z.ZodObject<{
        children: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodObject<{
            componentId: z.ZodString;
            path: z.ZodString;
        }, "strict", z.ZodTypeAny, {
            path: string;
            componentId: string;
        }, {
            path: string;
            componentId: string;
        }>]>;
        direction: z.ZodOptional<z.ZodDefault<z.ZodEnum<["vertical", "horizontal"]>>>;
        align: z.ZodOptional<z.ZodDefault<z.ZodEnum<["start", "center", "end", "stretch"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        direction?: "horizontal" | "vertical" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }, {
        children: string[] | {
            path: string;
            componentId: string;
        };
        weight?: number | undefined;
        direction?: "horizontal" | "vertical" | undefined;
        align?: "start" | "center" | "end" | "stretch" | undefined;
    }>;
};
export declare const CardApi: {
    name: string;
    schema: z.ZodObject<{
        child: z.ZodString;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        child: string;
        weight?: number | undefined;
    }, {
        child: string;
        weight?: number | undefined;
    }>;
};
export declare const TabsApi: {
    name: string;
    schema: z.ZodObject<{
        tabs: z.ZodArray<z.ZodObject<{
            title: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
            child: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            child: string;
            title?: any;
        }, {
            child: string;
            title?: any;
        }>, "many">;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        tabs: {
            child: string;
            title?: any;
        }[];
        weight?: number | undefined;
    }, {
        tabs: {
            child: string;
            title?: any;
        }[];
        weight?: number | undefined;
    }>;
};
export declare const ModalApi: {
    name: string;
    schema: z.ZodObject<{
        trigger: z.ZodString;
        content: z.ZodString;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        trigger: string;
        content: string;
        weight?: number | undefined;
    }, {
        trigger: string;
        content: string;
        weight?: number | undefined;
    }>;
};
export declare const DividerApi: {
    name: string;
    schema: z.ZodObject<{
        axis: z.ZodOptional<z.ZodDefault<z.ZodEnum<["horizontal", "vertical"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        weight?: number | undefined;
        axis?: "horizontal" | "vertical" | undefined;
    }, {
        weight?: number | undefined;
        axis?: "horizontal" | "vertical" | undefined;
    }>;
};
export declare const ButtonApi: {
    name: string;
    schema: z.ZodObject<{
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
        child: z.ZodString;
        variant: z.ZodOptional<z.ZodDefault<z.ZodEnum<["default", "primary", "borderless"]>>>;
        action: z.ZodUnion<[z.ZodObject<{
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        child: string;
        action: {
            event: {
                name: string;
                context?: Record<string, any> | undefined;
                userMessage?: any;
            };
        } | {
            functionCall?: any;
        };
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        variant?: "default" | "primary" | "borderless" | undefined;
    }, {
        child: string;
        action: {
            event: {
                name: string;
                context?: Record<string, any> | undefined;
                userMessage?: any;
            };
        } | {
            functionCall?: any;
        };
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        variant?: "default" | "primary" | "borderless" | undefined;
    }>;
};
export declare const TextFieldApi: {
    name: string;
    schema: z.ZodObject<{
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
        label: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        placeholder: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        variant: z.ZodOptional<z.ZodDefault<z.ZodEnum<["longText", "number", "shortText", "obscured"]>>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        variant?: "number" | "shortText" | "longText" | "obscured" | undefined;
        placeholder?: any;
    }, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        variant?: "number" | "shortText" | "longText" | "obscured" | undefined;
        placeholder?: any;
    }>;
};
export declare const CheckBoxApi: {
    name: string;
    schema: z.ZodObject<{
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
        label: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        value: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodObject<{
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
    }, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
    }>;
};
export declare const ChoicePickerApi: {
    name: string;
    schema: z.ZodObject<{
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
        variant: z.ZodOptional<z.ZodDefault<z.ZodEnum<["multipleSelection", "mutuallyExclusive"]>>>;
        options: z.ZodArray<z.ZodObject<{
            label: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            label?: any;
        }, {
            value: string;
            label?: any;
        }>, "many">;
        value: z.ZodUnion<[z.ZodArray<z.ZodString, "many">, z.ZodEffects<z.ZodObject<{
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
        displayStyle: z.ZodOptional<z.ZodDefault<z.ZodEnum<["checkbox", "chips"]>>>;
        filterable: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        options: {
            value: string;
            label?: any;
        }[];
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        filterable?: boolean | undefined;
        variant?: "multipleSelection" | "mutuallyExclusive" | undefined;
        displayStyle?: "checkbox" | "chips" | undefined;
    }, {
        options: {
            value: string;
            label?: any;
        }[];
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        filterable?: boolean | undefined;
        variant?: "multipleSelection" | "mutuallyExclusive" | undefined;
        displayStyle?: "checkbox" | "chips" | undefined;
    }>;
};
export declare const SliderApi: {
    name: string;
    schema: z.ZodObject<{
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
        min: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        max: z.ZodNumber;
        value: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodObject<{
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
        steps: z.ZodOptional<z.ZodNumber>;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        max: number;
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        min?: number | undefined;
        steps?: number | undefined;
    }, {
        max: number;
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        min?: number | undefined;
        steps?: number | undefined;
    }>;
};
export declare const DateTimeInputApi: {
    name: string;
    schema: z.ZodObject<{
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
        value: z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        enableDate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        enableTime: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        min: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        max: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodEffects<z.ZodObject<{
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
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        min?: any;
        max?: any;
        enableDate?: boolean | undefined;
        enableTime?: boolean | undefined;
    }, {
        value?: any;
        label?: any;
        '@checks'?: {
            message?: string | undefined;
            condition?: any;
        }[] | undefined;
        weight?: number | undefined;
        min?: any;
        max?: any;
        enableDate?: boolean | undefined;
        enableTime?: boolean | undefined;
    }>;
};
export declare const BASIC_COMPONENTS: ComponentApi[];
/**
 * The document-level fields of the published catalog document.
 */
export declare const BASIC_CATALOG_DOCUMENT_OPTIONS: {
    schemaUri: string;
    schemaId: string;
    title: string;
    description: string;
    instructions: string;
    declaredProtocolVersion: string;
    commonTypesUri: string;
};
