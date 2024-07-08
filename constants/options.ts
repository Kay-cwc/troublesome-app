import { TaskRecurranceUnit } from "@/types/task";

type GenericOptions<T> = {
    label: string;
    value: T;
};

export const TaskRecurranceUnitOptions: GenericOptions<TaskRecurranceUnit>[] = [
    { label: "Daily", value: TaskRecurranceUnit.Daily },
    { label: "Weekly", value: TaskRecurranceUnit.Weekly },
    { label: "Monthly", value: TaskRecurranceUnit.Monthly },
];
