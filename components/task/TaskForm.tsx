import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

import { TaskRecurranceUnitOptions } from "@/constants/options";
import { useTaskStore } from "@/stores/task";
import { TaskCreateForm, TaskCreateFormSchema, TaskRecurranceUnit } from "@/types/task";

import { ThemedButton } from "../ThemedButton";
import { ThemedText } from "../ThemedText";
import { SingleCalendarController } from "../form/CalendarController";
import ControllerBase from "../form/ControllerBase";
import ThemedDropdown from "../form/ThemedDropdown";
import { ThemedInput } from "../form/ThemedInput";
import { ButtonGroup } from "./ButtonGroup";

type Props = {
    isEdit?: boolean;
};

export default function TaskForm({ isEdit = false }: Props) {
    const router = useRouter();
    const { addTask, updateTask } = useTaskStore();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TaskCreateForm>({
        resolver: zodResolver(TaskCreateFormSchema),
        defaultValues: {
            title: "Zuul打針",
            remarks: "",
            recurrance: {
                unit: TaskRecurranceUnit.Weekly,
                value: 3,
            },
            lastActionDate: new Date(),
        },
    });

    const onSubmit = async (data: TaskCreateForm) => {
        if (isEdit) {
            const FAKE_ID = "1";
            updateTask(FAKE_ID, data);
        } else {
            await addTask(data);
            // disimss the modal
            router.dismiss();
        }
    };

    return (
        <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.base}>
                <ControllerBase label="The Trouble" error={errors.title}>
                    <Controller
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedInput
                                placeholder="your troublesome task..."
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                        name="title"
                    />
                </ControllerBase>

                <ControllerBase error={errors.recurrance?.value}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <ThemedText>Repeat Every</ThemedText>
                        <View style={{}}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                    min: 1,
                                    max: 100,
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <ThemedInput
                                        placeholder=""
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value.toString()}
                                    />
                                )}
                                name="recurrance.value"
                            />
                        </View>
                        <View>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <ThemedDropdown
                                        style={{ inputIOS: { color: "black" } }}
                                        onValueChange={onChange}
                                        value={value}
                                        items={TaskRecurranceUnitOptions}
                                    />
                                )}
                                name="recurrance.unit"
                            />
                        </View>
                    </View>
                </ControllerBase>

                <ControllerBase label="Remarks">
                    <Controller
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <ThemedInput
                                placeholder="describe the task..."
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                multiline
                                numberOfLines={4}
                            />
                        )}
                        name="remarks"
                    />
                </ControllerBase>
                <ControllerBase>
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <SingleCalendarController
                                onDayPress={onChange}
                                selectedDate={value}
                                maxDate={dayjs().format("YYYY-MM-DD")}
                            />
                        )}
                        name="lastActionDate"
                    />
                </ControllerBase>
                <ButtonGroup>
                    <ThemedButton type="buttonPrimary" onPress={handleSubmit(onSubmit)}>
                        <ThemedText type="defaultSemiBold">{isEdit ? "UPDATE" : "CREATE"}</ThemedText>
                    </ThemedButton>
                    <ThemedButton type="buttonWarning" onPress={() => router.dismiss()}>
                        <ThemedText type="defaultSemiBold">CANCEL</ThemedText>
                    </ThemedButton>
                </ButtonGroup>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        flexDirection: "column",
        marginHorizontal: 20,
        marginVertical: 20,
        gap: 20,
    },
});
