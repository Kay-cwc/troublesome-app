import { Pressable, PressableProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedButtonProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  type: "buttonPrimary" | "buttonWarning";
};

export function ThemedButton({
  style,
  lightColor,
  darkColor,
  children,
  type,
  ...otherProps
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    type,
  );

  return (
    <Pressable style={[{ backgroundColor }, styles.base]} {...otherProps}>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
});
