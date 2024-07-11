import dayjs from "dayjs";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SingleCalendarController } from "@/components/form/CalendarController";
import { ButtonGroup } from "@/components/task/ButtonGroup";
import { TaskFieldWithLabel } from "@/components/task/TaskFieldWithLabel";
import { TaskRecurranceUnitOptions } from "@/constants/options";
import { formatDate } from "@/lib/formatter";
import { useTaskStore } from "@/stores/task";

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams();
    const navigation = useNavigation();
    const { tasks, updateTask } = useTaskStore();

    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const task = useMemo(() => {
        return tasks.find((t) => t.id === id);
    }, [tasks, id]);

    useEffect(() => {
        navigation.setOptions({ title: task?.title });
    }, [task, navigation]);

    const recurranceUnit = useMemo(() => {
        if (!task) return "";
        return TaskRecurranceUnitOptions.find((o) => o.value === task.recurrance.unit)?.label || "";
    }, [task]);

    if (!task)
        return (
            <ThemedView>
                <Redirect href="/" />
            </ThemedView>
        );

    return (
        <>
            {!showCalendar && (
                <ThemedView
                    style={{
                        flex: 1,
                        paddingTop: 20,
                        paddingLeft: 20,
                        gap: 10,
                    }}
                >
                    <TaskFieldWithLabel label="Next Time:">
                        <ThemedText type="subtitle">{formatDate(task.nextActionDate)}</ThemedText>
                    </TaskFieldWithLabel>
                    <TaskFieldWithLabel label="Remarks:">
                        <ThemedText type="subtitle">{task.remarks || "-"}</ThemedText>
                    </TaskFieldWithLabel>
                    <TaskFieldWithLabel label="Recurrance:">
                        <ThemedText type="subtitle">
                            Every {task.recurrance.value} {recurranceUnit}
                        </ThemedText>
                    </TaskFieldWithLabel>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <ButtonGroup>
                            <ThemedButton type="buttonPrimary" onPress={() => setShowCalendar(true)}>
                                <ThemedText>Shit Done</ThemedText>
                            </ThemedButton>
                        </ButtonGroup>
                    </View>
                </ThemedView>
            )}

            {showCalendar && (
                <ThemedView style={{ flex: 1, gap: 20, padding: 20 }}>
                    <View>
                        <SingleCalendarController
                            onDayPress={(d) => setSelectedDate(d)}
                            selectedDate={selectedDate}
                            maxDate={dayjs().format("YYYY-MM-DD")}
                        />
                    </View>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <ButtonGroup>
                            <ThemedButton
                                type="buttonPrimary"
                                onPress={() => {
                                    updateTask(task.id, { lastActionDate: selectedDate });
                                    setShowCalendar(false);
                                }}
                            >
                                <ThemedText>Confirm</ThemedText>
                            </ThemedButton>
                            <ThemedButton type="buttonWarning" onPress={() => setShowCalendar(false)}>
                                <ThemedText>Nah, just kidding</ThemedText>
                            </ThemedButton>
                        </ButtonGroup>
                    </View>
                </ThemedView>
            )}
        </>
    );
}
