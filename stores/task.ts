import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Task, TaskCreateForm } from "@/types/task";

type State = {
    tasks: Task[];
};

type Action = {
    refreshTasks: () => Promise<void>;
    addTask: (task: TaskCreateForm) => Promise<string>;
    updateTask: (task: Partial<TaskCreateForm>) => void;
    removeTask: (task: string) => void;
    clearTasks: () => void;
};

const TASK_STORAGE_KEY = "@tasks";

export const useTaskStore = create<State & Action>()(
    immer((set, get) => ({
        tasks: [],
        refreshTasks: async () => {
            const tasks = await AsyncStorage.getItem(TASK_STORAGE_KEY);
            if (tasks) {
                set((state) => {
                    state.tasks = JSON.parse(tasks);
                });
            }
        },
        addTask: async (task: TaskCreateForm) => {
            const id = uuid();
            const updatedTaskList = [{ id, ...task }, ...get().tasks];
            set((state) => {
                state.tasks = updatedTaskList;
            });

            await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTaskList));

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
    }))
);
