import { useAdventureStore } from "@/feature/adventure";
import { transformRawToTasks } from "@/feature/adventure/lib/transformRawToTasks";
import type { RawTask } from "@/feature/adventure/types/types";
import SocketService from "@/shared/api/sockets";
import { useNavigate } from "react-router";

export const useRoom = () => {
  const { setSteps } = useAdventureStore();
  const navigate = useNavigate();
  const socket = SocketService.getInstance();

  const enterToRoom = async (roomCode: string, nickname: string) => {
    await socket.connect();

    let isResolved = false;
    const handleGameStarted = (steps: unknown) => {
      console.log(steps)
      if (!Array.isArray(steps)) {
        rejectPromise("Некорректный формат шагов");
        cleanupJoinListeners();
        socket.off("game_started", handleGameStarted);
        return;
      }
      setSteps(transformRawToTasks(steps as RawTask[]));
      cleanupJoinListeners();
      socket.off("game_started", handleGameStarted);
      if (!isResolved) {
        isResolved = true;
        resolvePromise("started");
      }

      console.log("csdcsdc")
      navigate("/adventure");
    };

    let resolvePromise: (value: "lobby" | "started") => void = () => {};
    let rejectPromise: (reason?: unknown) => void = () => {};

    const extractErrorText = (payload: unknown) => {
      if (typeof payload === "string") return payload;
      if (payload && typeof payload === "object") {
        if ("error" in payload && typeof (payload as Record<string, unknown>).error === "string") {
          return (payload as Record<string, unknown>).error;
        }
        if ("message" in payload && typeof (payload as Record<string, unknown>).message === "string") {
          return (payload as Record<string, unknown>).message;
        }
      }
      return "Ошибка подключения к игре";
    };

    function onStudentJoined() {
      cleanupJoinListeners();
      if (!isResolved) {
        isResolved = true;
        resolvePromise("lobby");
      }
    }

    function onJoinError(error: unknown) {
      cleanupJoinListeners();
      socket.off("game_started", handleGameStarted);
      rejectPromise(extractErrorText(error));
    }

    function cleanupJoinListeners() {
      socket.off("student_joined", onStudentJoined);
      socket.off("join_error", onJoinError);
    }

    const joinPromise = new Promise<"lobby" | "started">((resolve, reject) => {
      resolvePromise = resolve;
      rejectPromise = reject;

      socket.once("student_joined", onStudentJoined);
      socket.once("join_error", onJoinError);
    });

    socket.once("game_started", handleGameStarted);

    socket.emit("student_join", {
      room_code: roomCode,
      username: nickname,
    });

    return joinPromise;
  };

  return enterToRoom;
};
