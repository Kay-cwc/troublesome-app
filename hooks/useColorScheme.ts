import { Colors } from "@/constants/Colors";
import { useColorScheme } from "react-native";

export { useColorScheme } from "react-native";

export function useIconColor() {
  const color = useColorScheme() ?? "light";

  return color === "light" ? Colors.light.tint : Colors.dark.tint;
}
