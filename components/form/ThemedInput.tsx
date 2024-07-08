import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

// this input box will automatically take full width of the parent
export function ThemedInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedTextInputProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "border",
  );
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <View style={[{ borderColor }, styles.base]}>
      <TextInput
        style={[{ backgroundColor, color, borderColor }, styles.input, style]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    fontSize: 16,
    padding: 16,
  },
});
