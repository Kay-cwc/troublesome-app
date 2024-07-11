import * as z from "zod";

export enum TaskRecurranceUnit {
    Daily = "d",
    Weekly = "w",
    Monthly = "m",
}

export const TaskRecurranceUnitEnum = z.nativeEnum(TaskRecurranceUnit);

export const TaskSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    remarks: z.string().optional(),
    recurrance: z.object({
        unit: TaskRecurranceUnitEnum,
        value: z.coerce.number().min(1).max(100),
    }),
    lastActionDate: z.date(),
});

export type Task = z.infer<typeof TaskSchema>;

export const TaskCreateFormSchema = TaskSchema.pick({
    title: true,
    remarks: true,
    recurrance: true,
    lastActionDate: true,
});

export type TaskCreateForm = z.infer<typeof TaskCreateFormSchema>;
