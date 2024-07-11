import { useRouter } from "expo-router";
import { Pressable } from "react-native";

import { formatDate } from "@/lib/formatter";
import { Task } from "@/types/task";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

export function TaskPreview({ task }: { task: Task }) {
    const router = useRouter();
    function toDetail() {
        router.navigate(`(task)/${task.id}`);
    }

    return (
        <ThemedView>
            <Pressable onPress={toDetail}>
                <ThemedText type="subtitle">{task.title}</ThemedText>
                <ThemedText type="secondary">next time: {formatDate(task.nextActionDate)}</ThemedText>
            </Pressable>
        </ThemedView>
    );
}
