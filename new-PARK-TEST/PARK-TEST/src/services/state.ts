import { atom, selector } from "recoil";
import { Task, TaskStatus, User } from "./types";

interface Alert {
  content: string;
  type: "info" | "success" | "warning" | "error" | "none";
}

// export const consentState = atom({
//   key: "consentState",
//   default: false,
// });

export const alertState = atom<Alert>({
  key: "alertState",
  default: {
    content: "",
    type: "none",
  },
});

type Auth = User | null;
export const authState = atom<Auth>({
  key: "authState",
  default: null,
});

interface Session {
  startDate: Date | null;
  endDate: Date | null;
  currentTask: Task;
  taskProgress: {
    [K in Task]?: TaskStatus;
  };
}

export const sessionState = atom<Session>({
  key: "sessionState",
  default: {
    startDate: null,
    endDate: null,
    currentTask: Task.quick_brown_fox,
    taskProgress: {},
  },
});

// helper selector to get/set current task's status
export const currentTaskState = selector<TaskStatus | undefined>({
  key: "currentTaskState",
  get: ({ get }) => {
    const { currentTask, taskProgress } = get(sessionState);
    return taskProgress[currentTask];
  },
  set: ({ get, set }, newStatus) => {
    const session = get(sessionState);
    set(sessionState, {
      ...session,
      taskProgress: {
        ...session.taskProgress,
        [session.currentTask]: newStatus,
      },
    });
  },
});
