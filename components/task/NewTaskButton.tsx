import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { useIconColor } from "@/hooks/useColorScheme";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function HeaderNewTaskBtn() {
    const router = useRouter();
    const iconColor = useIconColor();

    return (
        <Pressable onPress={() => router.push("/taskModal")}>
            <ThemedView
                style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                }}
            >
                <ThemedText type="defaultSemiBold">New Task</ThemedText>
                <Ionicons name="create-outline" size={24} color={iconColor} />
            </ThemedView>
        </Pressable>
    );
}
