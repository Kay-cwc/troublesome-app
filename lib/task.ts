import dayjs from "dayjs";

import { Task, TaskRecurranceUnit } from "@/types/task";

import { assertUnreachable } from "./common";

export function findNextActionDate(task: Pick<Task, "lastActionDate" | "recurrance">) {
    let next = dayjs(task.lastActionDate);
    switch (task.recurrance.unit) {
        case TaskRecurranceUnit.Daily:
            next = next.add(task.recurrance.value, "day");
            break;
        case TaskRecurranceUnit.Weekly:
            next = next.add(task.recurrance.value, "week");
            break;
        case TaskRecurranceUnit.Monthly:
            next = next.add(task.recurrance.value, "month");
            break;
        default:
            assertUnreachable(task.recurrance.unit);
    }

    return next.toDate();
}
