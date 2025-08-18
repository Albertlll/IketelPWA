import SocketService from '@/shared/api/sockets';
import { create } from 'zustand'
import type { Task } from '../types/types';

interface AdventureState {
  joinCode: string;
  nickname: string;
  isConnected: boolean;
  error: string | null;

  taskStartTime: number;

  setJoinCode: (code: string) => void;
  setNickname: (name: string) => void;
  setConnected: (value: boolean) => void;
  setError: (error: string | null) => void;
  setSteps: (steps: Task[]) => void;
  sendAnswer: (answer: number | string) => void;

  tasks: Task[] | null;
  currentTaskNumber: number;
  currentTask: Task | null;
}





export const useAdventureStore = create<AdventureState>((set, get) => ({
  joinCode: "",
  nickname: "",
  isConnected: false,
  error: null,
  currentTaskNumber: 0,
  tasks: null,
  currentTask: null,
  taskStartTime: 0,

  setJoinCode: (code) => set({ joinCode: code }),
  setNickname: (name) => set({ nickname: name }),
  setConnected: (value) => set({ isConnected: value }),
  setError: (error) => set({ error }),

  setSteps: (steps) => {
    console.log(steps);

    set({
      tasks: steps,
      currentTask: steps[0],
      taskStartTime: Date.now(),
      currentTaskNumber: 0,
    });
  },

  sendAnswer: (answer: number | string) => {
    const tasks = get().tasks;
    if (tasks === null) return;


    const socket = SocketService.getInstance();

    socket.emit("check_answer", {
      step: get().currentTaskNumber,
      answer: answer,
      time_spent: (Date.now() - get().taskStartTime) / 1000,
    });

    set((prev) => ({
      currentTaskNumber: prev.currentTaskNumber + 1,
      currentTask:
        prev.tasks === null ? null : prev.tasks[prev.currentTaskNumber + 1],
      taskStartTime: Date.now(),
    }));
  },

  nextTask: () =>
    set((prev) => ({
      currentTaskNumber: prev.currentTaskNumber + 1,
      currentTask:
        prev.tasks === null ? null : prev.tasks[prev.currentTaskNumber + 1],
    })),
}));