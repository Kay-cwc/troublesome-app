import { Controller, useForm } from "react-hook-form";
import {
  TaskCreateForm,
  TaskCreateFormSchema,
  TaskRecurranceUnit,
} from "@/types/task";
import { Button, StyleSheet, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";

import { ThemedInput } from "../form/ThemedInput";
import ControllerBase from "../form/ControllerBase";
import { ThemedText } from "../ThemedText";
import { TaskRecurranceUnitOptions } from "@/constants/options";
import ThemedDropdown from "../form/ThemedDropdown";

type Props = {
  isEdit?: boolean;
};
export default function TaskForm({ isEdit = false }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskCreateForm>({
    resolver: zodResolver(TaskCreateFormSchema),
    defaultValues: {
      title: "",
      remarks: "",
      recurrance: {
        unit: TaskRecurranceUnit.Daily,
        value: 1,
      },
    },
  });

  const onSubmit = (data: TaskCreateForm) => {
    console.log(data);
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
                multiline={true}
                numberOfLines={4}
              />
            )}
            name="remarks"
          />
        </ControllerBase>
        <Button title="submit" onPress={handleSubmit(onSubmit)} />
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
