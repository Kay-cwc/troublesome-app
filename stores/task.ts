import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { findNextActionDate } from "@/lib/task";
import { Task, TaskCreateForm } from "@/types/task";

type State = {
    tasks: Task[];
};

type Action = {
    addTask: (task: TaskCreateForm) => Promise<string>;
    updateTask: (id: string, updateVal: Partial<Task>) => void;
    removeTask: (task: string) => void;
    clearTasks: () => void;
};

const TASK_STORAGE_KEY = "@tasks";

function sortTasksByNextActionDate(tasks: Task[]) {
    return tasks.sort((a, b) => a.nextActionDate.getTime() - b.nextActionDate.getTime());
}

export const useTaskStore = create<State & Action>()(
    persist(
        immer((set, get) => ({
            tasks: [],
            addTask: async (task: TaskCreateForm) => {
                const id = uuid();
                const updatedTaskList: Task[] = [
                    { id, nextActionDate: findNextActionDate(task), ...task },
                    ...(get().tasks || []),
                ];
                set((state) => {
                    state.tasks = sortTasksByNextActionDate(updatedTaskList);
                });

                return id;
            },
            updateTask: (id: string, updateVal: Partial<Task>) => {
                const prev = get().tasks.find((t) => t.id === id);
                if (!prev) return;
                const updatedTask = { ...prev, ...updateVal };
                // update nextActionDate if lastActionDate is updated
                if (updateVal.lastActionDate) {
                    updatedTask.nextActionDate = findNextActionDate(updatedTask);
                }
                set((state) => {
                    state.tasks = sortTasksByNextActionDate(state.tasks.map((t) => (t.id === id ? updatedTask : t)));
                });
            },
            removeTask: (task: string) => {
                set((state) => {
                    state.tasks = state.tasks.filter((t) => t.title !== task);
                });
            },
            clearTasks: () => {
                set((state) => {
                    state.tasks = [];
                });
            },
        })),
        {
            version: 2,
            name: TASK_STORAGE_KEY,
            storage: createJSONStorage(() => AsyncStorage, {
                reviver: (key, value) => {
                    if (typeof value == "string" && dayjs(value).isValid()) {
                        return new Date(value);
                    }
                    return value;
                },
            }),
            migrate: async (prevState, version) => {
                if (version === 0) {
                    (prevState as State).tasks = (prevState as State).tasks.map((t) => ({
                        ...t,
                        nextActionDate: findNextActionDate(t),
                    }));
                }

                if (version === 1) {
                    // sort by nextActionDate, ASC
                    (prevState as State).tasks = (prevState as State).tasks.sort(
                        (a, b) => a.nextActionDate.getTime() - b.nextActionDate.getTime()
                    );
                }

                return prevState;
            },
        }
    )
);
