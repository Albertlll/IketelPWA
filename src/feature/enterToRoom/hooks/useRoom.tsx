import { useAdventureStore } from "@/feature/adventure";
import { transformRawToTasks } from "@/feature/adventure/lib/transformRawToTasks";
import SocketService from "@/shared/api/sockets";
import { useNavigate } from "react-router";

export const useRoom = () => {
  const { setSteps } = useAdventureStore();
  const navigate = useNavigate();
  const socket = SocketService.getInstance();

  const enterToRoom = async (roomCode: string, nickname: string) => {
    await socket.connect();

    const handleGameStarted = (steps: unknown) => {
      setSteps(transformRawToTasks(steps));
      navigate("/adventure");
    };

    let resolvePromise: () => void = () => {};
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
      cleanupListeners();
      resolvePromise();
    }

    function onJoinError(error: unknown) {
      cleanupListeners();
      rejectPromise(extractErrorText(error));
    }

    function cleanupListeners() {
      socket.off("student_joined", onStudentJoined);
      socket.off("join_error", onJoinError);
      socket.off("game_started", handleGameStarted);
    }

    const joinPromise = new Promise<void>((resolve, reject) => {
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
