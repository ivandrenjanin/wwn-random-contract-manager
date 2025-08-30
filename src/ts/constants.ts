import moduleData from "../../module.json" with { type: "json" };

// Module identifiers
export const MODULE_ID = moduleData.id;
export const SOCKET_NAMESPACE = `world.${MODULE_ID}` as const;
export const FLAGS_NAMESPACE = MODULE_ID as const;

// Journal constants
export const JOURNAL_NAME = "Mission Log" as const;

// Settings keys
export const SETTING_KEYS = {
    // Poll configuration
    POLL_DEFAULT_COUNT: "pollDefaultCount",
    POLL_MAX_COUNT: "pollMaxCount",

    // Rolltable names (user-configured)
    TABLE_HOOK: "tableHook",
    TABLE_PRIMARY_DANGER: "tablePrimaryDanger",
    TABLE_COMPLICATION: "tableComplication",
    TABLE_BONUS_OBJECTIVE: "tableBonusObjective",
    TABLE_FALLOUT: "tableFallout",
    TABLE_WORLD: "tableWorld",
} as const;

// Convenience list of table setting keys
export const TABLE_SETTING_KEYS = [
    SETTING_KEYS.TABLE_HOOK,
    SETTING_KEYS.TABLE_PRIMARY_DANGER,
    SETTING_KEYS.TABLE_COMPLICATION,
    SETTING_KEYS.TABLE_BONUS_OBJECTIVE,
    SETTING_KEYS.TABLE_FALLOUT,
    SETTING_KEYS.TABLE_WORLD,
] as const;

export type TableSettingKey = (typeof TABLE_SETTING_KEYS)[number];
