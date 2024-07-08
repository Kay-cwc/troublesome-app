import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { FieldError } from "react-hook-form";

type Props = PropsWithChildren<{
  label?: string;
  error?: FieldError;
}>;

export default function ControllerBase({
  children,
  label,
  error,
  ...props // TBC
}: Props) {
  return (
    <View style={styles.formControllerBase}>
      {label && <ThemedText type="defaultSemiBold">{label}</ThemedText>}
      {children}
      {error && <ThemedText type="error">{error.message}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  formControllerBase: {
    gap: 10,
  },
});