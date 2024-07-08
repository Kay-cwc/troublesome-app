import { useColorScheme } from "react-native";

import { Colors } from "@/constants/Colors";

export { useColorScheme } from "react-native";

export function useIconColor() {
    const color = useColorScheme() ?? "light";

    return color === "light" ? Colors.light.tint : Colors.dark.tint;
}
