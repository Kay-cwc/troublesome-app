/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
    light: {
        text: "#11181C",
        textSecondary: "#475569",
        background: "#fff",
        border: "#475569",
        tint: tintColorLight,
        icon: "#687076",
        buttonPrimary: "#84cc16",
        buttonWarning: "#ec4899",
        tabIconDefault: "#687076",
        tabIconSelected: tintColorLight,
    },
    dark: {
        text: "#ECEDEE",
        textSecondary: "#94a3b8",
        background: "#151718",
        border: "#94a3b8",
        tint: tintColorDark,
        buttonPrimary: "#84cc16",
        buttonWarning: "#ec4899",
        icon: "#9BA1A6",
        tabIconDefault: "#9BA1A6",
        tabIconSelected: tintColorDark,
    },
};
