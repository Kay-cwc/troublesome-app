import { Pressable, StyleSheet } from "react-native";

import { Mop } from "@/components/Mop";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useTaskStore } from "@/stores/task";
import { TaskPreview } from "@/components/task/TaskPreview";
import { useEffect } from "react";

export default function HomeScreen() {
  const { tasks, refreshTasks } = useTaskStore();

  useEffect(() => {
    refreshTasks();
  }, [refreshTasks]);

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
