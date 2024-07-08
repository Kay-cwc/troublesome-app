import { Pressable, StyleSheet } from "react-native";

import { Mop } from "@/components/Mop";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTaskStore } from "@/stores/task";
import { TaskPreview } from "@/components/task/TaskPreview";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const { tasks } = useTaskStore();

  return (
    <ParallaxScrollView>
      <ThemedView style={styles.mainContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Upcoming Tasks</ThemedText>
          <Mop />
        </ThemedView>
        <ThemedView style={styles.taskListContainer}>
          {tasks.map((task) => (
            <TaskPreview key={task.id} task={task} />
          ))}
        </ThemedView>
        <Pressable
          style={styles.createBtn}
          onPress={() => router.push("/taskModal")}
        >
          <ThemedText>Create Task</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "relative",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingBottom: 10,
  },
  taskListContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 8,
  },
  createBtn: {
    // position: "absolute",
    // bottom: 20,
  },
});
