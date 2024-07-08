import { PropsWithChildren } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function TaskFieldWithLabel({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <ThemedView>
      <ThemedText type="default" lightColor="#1e293b" darkColor="#cbd5e1">
        {label}
      </ThemedText>
      {children}
    </ThemedView>
  );
}
