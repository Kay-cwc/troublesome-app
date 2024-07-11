import dayjs from "dayjs";
import { useMemo } from "react";

import { assertUnreachable } from "@/lib/common";
import { Task, TaskRecurranceUnit } from "@/types/task";

export const useNextActionDate = (task: Task) => {
    const nextActionDate: Date = useMemo(() => {
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
    }, [task.lastActionDate, task.recurrance.unit, task.recurrance.value]);

    return { nextActionDate };
};
