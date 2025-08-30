export {};

declare global {
    // VTTColorSettings API Interface
    interface VTTColorSettingsAPI {
        /**
         * Convert hex color to RGBA object
         * @param hex - 8-character hex value (e.g., "#123456ff")
         * @returns Object with r, g, b, a properties
         */
        hexToRGBA(hex: string): { r: number; g: number; b: number; a: number };

        /**
         * Get appropriate text color (black or white) based on background color
         * @param rgbaHex - 8-character hex value (e.g., "#123456ff")
         * @param threshold - Contrast threshold (0-1), default 0.5
         * @returns Hex color string (#ffffff or #000000)
         */
        getTextColor(rgbaHex: string, threshold?: number): string;

        /**
         * Convert RGBA string to hex
         * @param rgba - RGBA string (e.g., "rgba(255,255,255,1)")
         * @param forceRemoveAlpha - Whether to remove alpha channel
         * @returns Hex color string
         */
        RGBAToHexFromString(rgba: string, forceRemoveAlpha?: boolean): string;

        /**
         * Convert RGBA values to hex
         * @param r - Red value (0-255)
         * @param g - Green value (0-255)
         * @param b - Blue value (0-255)
         * @param a - Alpha value (0-1)
         * @returns Hex color string
         */
        RGBAToHex(r: number, g: number, b: number, a: number): string;

        /**
         * Convert hex to RGBA string
         * @param colorHex - Hex color string
         * @param alpha - Alpha value (0-1), default 1
         * @returns RGBA string
         */
        hexToRGBAString(colorHex: string, alpha?: number): string;

        /**
         * Calculate brightness value from color
         * @param colorHexOrRgb - Color in hex or RGB format
         * @returns Brightness value (0-255) or undefined
         */
        brightnessByColor(colorHexOrRgb: string): number | undefined;
    }

    // ColorSetting Constructor Options
    interface ColorSettingOptions {
        /** The name of the setting in the settings menu */
        name: string;
        /** A description of the setting and its behavior */
        hint?: string;
        /** The text label used in the button */
        label?: string;
        /** Restrict this setting to gamemaster only? */
        restricted?: boolean;
        /** The default color of the setting */
        defaultColor?: string;
        /** The scope of the setting */
        scope?: "client" | "world";
        /** Callback function when setting changes */
        onChange?: (value: string) => void;
        /** Place setting after specified setting */
        insertAfter?: string;
    }

    // ColorSetting Class
    class ColorSetting {
        /**
         * Create a new color setting
         * @param module - The namespace under which the setting is registered
         * @param key - The key name for the setting
         * @param options - Configuration options
         */
        constructor(module: string, key: string, options?: ColorSettingOptions);
    }

    // Vanilla Picker Color Object
    interface VanillaPickerColor {
        /** Hex color string */
        hex: string;
        /** RGBA string */
        rgbaString: string;
        /** RGBA values array */
        rgba: [number, number, number, number];
        /** HSV values array */
        hsv: [number, number, number];
        /** HSL values array */
        hsl: [number, number, number];
    }

    // Vanilla Picker Options
    interface VanillaPickerOptions {
        /** Parent element for the picker */
        parent?: HTMLElement;
        /** Whether to show as popup */
        popup?: boolean;
        /** Initial color */
        color?: string | [number, number, number, number];
        /** Whether to show cancel button */
        cancelButton?: boolean;
        /** Callback when color selection is done */
        onDone?: (color: VanillaPickerColor) => void;
        /** Callback when color changes */
        onChange?: (color: VanillaPickerColor) => void;
    }

    // Vanilla Picker Class
    class VanillaPicker {
        constructor();

        /** DOM element of the picker */
        domElement: HTMLElement;

        /** Cancel button element */
        _domCancel?: HTMLElement;

        /**
         * Set picker options
         * @param options - Picker configuration options
         */
        setOptions(options: VanillaPickerOptions): void;

        /**
         * Set picker color
         * @param color - Color value
         * @param silent - Whether to trigger callbacks
         */
        setColor(
            color: string | [number, number, number, number],
            silent?: boolean,
        ): void;

        /**
         * Show the picker
         */
        show(): void;

        /**
         * Destroy the picker
         */
        destroy(): void;
    }

    // Global VTTColorSettings namespace
    namespace Ardittristan {
        /** ColorSetting class for creating color settings */
        const ColorSetting: typeof ColorSetting;

        /** Whether initial color setting run has been completed */
        let initialColorSettingRun: boolean;

        /** Whether settings are being reset */
        let resettingSettings: boolean | undefined;
    }

    // Window augmentation
    interface Window {
        /** VTTColorSettings global namespace */
        Ardittristan: typeof Ardittristan;
    }

    // Hooks augmentation
    interface Hooks {
        /**
         * Called when color settings are initialized
         * @param ColorSettingClass - The ColorSetting class
         */
        callAll(
            hook: "colorSettingsInitialized",
            ColorSettingClass: typeof ColorSetting,
        ): void;

        /**
         * Called when a picker is done
         * @param parentElement - Parent element
         * @param colorHex - Selected color hex
         * @param inputElement - Input element
         */
        call(
            hook: "pickerDone",
            parentElement: HTMLElement,
            colorHex: string,
            inputElement: HTMLElement,
        ): void;
    }

    // Custom elements
    interface HTMLElementTagNameMap {
        /** Color picker input element */
        "colorpicker-input": HTMLInputElement;
        /** Color picker button element */
        "colorpicker-button": HTMLButtonElement;
    }

    // Color utility from FoundryVTT
    interface Color {
        r: number;
        g: number;
        b: number;

        /**
         * Create color from various formats
         * @param color - Color value
         */
        from(color: string): Color;

        /**
         * Convert to RGBA
         */
        toRGBA(): { r: number; g: number; b: number; a: number };
    }

    // Global Color constructor
    var Color: {
        from(color: string): Color;
    };
}
