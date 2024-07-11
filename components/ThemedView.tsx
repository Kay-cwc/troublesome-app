import { ScrollView, View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

    return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ThemedScrollView(props: ThemedViewProps) {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#00000000" }}>
            <ThemedView {...props} />
        </ScrollView>
    );
}
