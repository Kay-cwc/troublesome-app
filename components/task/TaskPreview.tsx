import { Task } from "@/types/task";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export function TaskPreview({ task }: { task: Task }) {
  const router = useRouter();
  function toDetail() {
    router.navigate(`(task)/${task.id}`);
  }

  return (
    <ThemedView>
      <Pressable onPress={toDetail}>
        <ThemedText type="subtitle">{task.title}</ThemedText>
        {/* <ThemedText type="default">{task}</ThemedText> */}
      </Pressable>
    </ThemedView>
  );
}
