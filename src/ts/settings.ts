import { MODULE_ID, SETTING_KEYS, DEFAULT_TABLE_NAMES } from "./constants.ts";
import { logger } from "./utils/logger.ts";

class Settings {
    // Settings keys
    #SAMPLE = "sample";

    register(): void {
        game.settings.register(MODULE_ID, SETTING_KEYS.POLL_DEFAULT_COUNT, {
            name: game.i18n.localize("WWNRCM.Settings.PollDefaultCount.Name"),
            hint: game.i18n.localize("WWNRCM.Settings.PollDefaultCount.Hint"),
            scope: "world",
            config: true,
            default: 3,
            type: Number,
            onChange: async (value: unknown) => {
                const v = Math.min(5, Math.max(1, Math.trunc(Number(value))));
                if (typeof value !== "number" || value !== v) {
                    await game.settings.set(
                        MODULE_ID,
                        SETTING_KEYS.POLL_DEFAULT_COUNT,
                        v,
                    );
                }
                const maxVal = Math.min(
                    5,
                    Math.max(
                        1,
                        Math.trunc(
                            (game.settings.get(
                                MODULE_ID,
                                SETTING_KEYS.POLL_MAX_COUNT,
                            ) as number) ?? 5,
                        ),
                    ),
                );
                if (v > maxVal) {
                    logger.warn(
                        `Default contracts (${v}) exceed max (${maxVal}); clamping to max.`,
                    );
                    await game.settings.set(
                        MODULE_ID,
                        SETTING_KEYS.POLL_DEFAULT_COUNT,
                        maxVal,
                    );
                }
            },
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.POLL_MAX_COUNT, {
            name: game.i18n.localize("WWNRCM.Settings.PollMaxCount.Name"),
            hint: game.i18n.localize("WWNRCM.Settings.PollMaxCount.Hint"),
            scope: "world",
            config: true,
            default: 5,
            type: Number,
            onChange: async (value: unknown) => {
                const v = Math.min(5, Math.max(1, Math.trunc(Number(value))));
                if (typeof value !== "number" || value !== v) {
                    await game.settings.set(
                        MODULE_ID,
                        SETTING_KEYS.POLL_MAX_COUNT,
                        v,
                    );
                }
                const defVal = Math.min(
                    5,
                    Math.max(
                        1,
                        Math.trunc(
                            (game.settings.get(
                                MODULE_ID,
                                SETTING_KEYS.POLL_DEFAULT_COUNT,
                            ) as number) ?? 3,
                        ),
                    ),
                );
                if (defVal > v) {
                    logger.warn(
                        `Max contracts (${v}) below default (${defVal}); clamping default.`,
                    );
                    await game.settings.set(
                        MODULE_ID,
                        SETTING_KEYS.POLL_DEFAULT_COUNT,
                        v,
                    );
                }
            },
        });

        // Rolltable names (defaults match docs)
        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_HOOK, {
            name: game.i18n.localize("WWNRCM.Settings.Tables.Hook.Name"),
            hint: game.i18n.localize("WWNRCM.Settings.Tables.Hook.Hint"),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_HOOK],
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_PRIMARY_DANGER, {
            name: game.i18n.localize(
                "WWNRCM.Settings.Tables.PrimaryDanger.Name",
            ),
            hint: game.i18n.localize(
                "WWNRCM.Settings.Tables.PrimaryDanger.Hint",
            ),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_PRIMARY_DANGER],
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_COMPLICATION, {
            name: game.i18n.localize(
                "WWNRCM.Settings.Tables.Complication.Name",
            ),
            hint: game.i18n.localize(
                "WWNRCM.Settings.Tables.Complication.Hint",
            ),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_COMPLICATION],
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_BONUS_OBJECTIVE, {
            name: game.i18n.localize(
                "WWNRCM.Settings.Tables.BonusObjective.Name",
            ),
            hint: game.i18n.localize(
                "WWNRCM.Settings.Tables.BonusObjective.Hint",
            ),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_BONUS_OBJECTIVE],
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_FALLOUT, {
            name: game.i18n.localize("WWNRCM.Settings.Tables.Fallout.Name"),
            hint: game.i18n.localize("WWNRCM.Settings.Tables.Fallout.Hint"),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_FALLOUT],
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_WORLD, {
            name: game.i18n.localize("WWNRCM.Settings.Tables.World.Name"),
            hint: game.i18n.localize("WWNRCM.Settings.Tables.World.Hint"),
            scope: "world",
            config: true,
            default: DEFAULT_TABLE_NAMES[SETTING_KEYS.TABLE_WORLD],
            type: String,
        });
    }

    get sample(): boolean {
        return game.settings.get(MODULE_ID, this.#SAMPLE) as boolean;
    }

    get pollDefaultCount(): number {
        const val = game.settings.get(
            MODULE_ID,
            SETTING_KEYS.POLL_DEFAULT_COUNT,
        ) as number;
        return Math.min(5, Math.max(1, Math.trunc(val)));
    }

    get pollMaxCount(): number {
        const val = game.settings.get(
            MODULE_ID,
            SETTING_KEYS.POLL_MAX_COUNT,
        ) as number;
        return Math.min(5, Math.max(1, Math.trunc(val)));
    }

    get tableHook(): string {
        return game.settings.get(MODULE_ID, SETTING_KEYS.TABLE_HOOK) as string;
    }

    get tablePrimaryDanger(): string {
        return game.settings.get(
            MODULE_ID,
            SETTING_KEYS.TABLE_PRIMARY_DANGER,
        ) as string;
    }

    get tableComplication(): string {
        return game.settings.get(
            MODULE_ID,
            SETTING_KEYS.TABLE_COMPLICATION,
        ) as string;
    }

    get tableBonusObjective(): string {
        return game.settings.get(
            MODULE_ID,
            SETTING_KEYS.TABLE_BONUS_OBJECTIVE,
        ) as string;
    }

    get tableFallout(): string {
        return game.settings.get(
            MODULE_ID,
            SETTING_KEYS.TABLE_FALLOUT,
        ) as string;
    }

    get tableWorld(): string {
        return game.settings.get(MODULE_ID, SETTING_KEYS.TABLE_WORLD) as string;
    }

    async setSample(value: boolean): Promise<unknown> {
        return game.settings.set(MODULE_ID, this.#SAMPLE, value);
    }
}

export { Settings };
