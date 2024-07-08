import { TaskFieldWithLabel } from "@/components/task/TaskFieldWithLabel";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { TaskRecurranceUnitOptions } from "@/constants/options";
import { useTaskStore } from "@/stores/task";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo } from "react";

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const { tasks } = useTaskStore();

  const task = useMemo(() => {
    return tasks.find((t) => t.id === id);
  }, [tasks, id]);

  useEffect(() => {
    navigation.setOptions({ title: task?.title });
  }, [task, navigation]);

  const recurranceUnit = useMemo(() => {
    if (!task) return "";
    return (
      TaskRecurranceUnitOptions.find((o) => o.value === task.recurrance.unit)
        ?.label || ""
    );
  }, [task]);

  if (!task)
    return (
      <ThemedView>
        <Redirect href="/" />
      </ThemedView>
    );

  return (
    <ThemedView
      style={{
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingTop: 20,
        paddingLeft: 20,
        gap: 10,
      }}
    >
      <TaskFieldWithLabel label="Remarks:">
        <ThemedText type="subtitle">{task.remarks || "-"}</ThemedText>
      </TaskFieldWithLabel>
      <TaskFieldWithLabel label="Recurrance:">
        <ThemedText type="subtitle">
          Every {task.recurrance.value} {recurranceUnit}
        </ThemedText>
      </TaskFieldWithLabel>
    </ThemedView>
  );
}
