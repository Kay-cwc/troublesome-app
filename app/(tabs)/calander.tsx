import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useIconColor } from "@/hooks/useColorScheme";

export default function TabTwoScreen() {
    const iconColor = useIconColor();
    return (
        <ParallaxScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Under Construction</ThemedText>
                <FontAwesome5 name="robot" size={24} color={iconColor} />
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 8,
    },
});
