import { Task, TaskCreateForm, TaskRecurranceUnit } from "@/types/task";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { v4 as uuid } from "uuid";

type State = {
  tasks: Task[];
};

type Action = {
  addTask: (task: TaskCreateForm) => void;
  updateTask: (task: Partial<TaskCreateForm>) => void;
  removeTask: (task: string) => void;
  clearTasks: () => void;
};

const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Clean Toilet",
    remarks: "Remarks 1",
    recurrance: {
      unit: TaskRecurranceUnit.Daily,
      value: 1,
    },
  },
  {
    id: "2",
    title: "餵杜蟲藥",
    remarks: "Remarks 2",
    recurrance: {
      unit: TaskRecurranceUnit.Monthly,
      value: 3,
    },
  },
  {
    id: "3",
    title: "打針",
    remarks: "Remarks 3",
    recurrance: {
      unit: TaskRecurranceUnit.Weekly,
      value: 3,
    },
  },
];

export const useTaskStore = create<State & Action>()(
  immer((set) => ({
    tasks: [...sampleTasks],
    addTask: (task: TaskCreateForm) => {
      set((state) => {
        state.tasks.push({
          id: uuid(),
          ...task,
        });
      });
    },
    updateTask: (task: Partial<Task>) => {
      set((state) => {
        state.tasks = state.tasks.map((t) =>
          t.id === task.id ? { ...t, ...task } : t,
        );
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
);
