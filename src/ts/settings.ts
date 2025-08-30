import { MODULE_ID, SETTING_KEYS } from "./constants.ts";
import { logger } from "./utils/logger.ts";

class Settings {
    // Settings keys
    #SAMPLE = "sample";

    register(): void {
        game.settings.register(MODULE_ID, this.#SAMPLE, {
            name: "ModuleTemplate.Settings.SampleSetting.Name",
            hint: "ModuleTemplate.Settings.SampleSetting.Hint",
            scope: "world",
            config: true,
            default: true,
            type: Boolean,
        });
        // Poll configuration
        game.settings.register(MODULE_ID, SETTING_KEYS.POLL_DEFAULT_COUNT, {
            name: "WWNRCM.Settings.PollDefaultCount.Name",
            hint: "WWNRCM.Settings.PollDefaultCount.Hint",
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
            name: "WWNRCM.Settings.PollMaxCount.Name",
            hint: "WWNRCM.Settings.PollMaxCount.Hint",
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
            name: "WWNRCM.Settings.Tables.Hook.Name",
            hint: "WWNRCM.Settings.Tables.Hook.Hint",
            scope: "world",
            config: true,
            default: "CE: Hook (d20)",
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_PRIMARY_DANGER, {
            name: "WWNRCM.Settings.Tables.PrimaryDanger.Name",
            hint: "WWNRCM.Settings.Tables.PrimaryDanger.Hint",
            scope: "world",
            config: true,
            default: "CE: Primary Danger (d20)",
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_COMPLICATION, {
            name: "WWNRCM.Settings.Tables.Complication.Name",
            hint: "WWNRCM.Settings.Tables.Complication.Hint",
            scope: "world",
            config: true,
            default: "CE: Complication (d20)",
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_BONUS_OBJECTIVE, {
            name: "WWNRCM.Settings.Tables.BonusObjective.Name",
            hint: "WWNRCM.Settings.Tables.BonusObjective.Hint",
            scope: "world",
            config: true,
            default: "CE: Bonus Objective (d20)",
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_FALLOUT, {
            name: "WWNRCM.Settings.Tables.Fallout.Name",
            hint: "WWNRCM.Settings.Tables.Fallout.Hint",
            scope: "world",
            config: true,
            default: "CE: Fallout (d20)",
            type: String,
        });

        game.settings.register(MODULE_ID, SETTING_KEYS.TABLE_WORLD, {
            name: "WWNRCM.Settings.Tables.World.Name",
            hint: "WWNRCM.Settings.Tables.World.Hint",
            scope: "world",
            config: true,
            default: "CE: World (d12)",
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
