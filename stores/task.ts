import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Task, TaskCreateForm } from "@/types/task";

type State = {
    tasks: Task[];
};

type Action = {
    addTask: (task: TaskCreateForm) => Promise<string>;
    updateTask: (task: Partial<TaskCreateForm>) => void;
    removeTask: (task: string) => void;
    clearTasks: () => void;
};

const TASK_STORAGE_KEY = "@tasks";

export const useTaskStore = create<State & Action>()(
    persist(
        immer((set, get) => ({
            tasks: [],
            addTask: async (task: TaskCreateForm) => {
                const id = uuid();
                const updatedTaskList = [{ id, ...task }, ...(get().tasks || [])];
                set((state) => {
                    state.tasks = updatedTaskList;
                });

                return id;
            },
            updateTask: (task: Partial<Task>) => {
                set((state) => {
                    state.tasks = state.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));
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
            name: TASK_STORAGE_KEY,
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
