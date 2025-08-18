import { useAdventureStore } from "@/feature/adventure";
import { transformRawToTasks } from "@/feature/adventure/lib/transformRawToTasks";
import SocketService from "@/shared/api/sockets";
import { useNavigate } from "react-router";

export const useRoom = () => {
  const { setSteps } = useAdventureStore();
  const navigate = useNavigate();
  const socket = SocketService.getInstance();

  const enterToRoom = async (roomCode : string, nickname : string) => {


    await socket.connect();

    socket.emit("student_join", {
      room_code: roomCode,
      username: nickname,
    });

    socket.on("game_started", (steps) => {
      console.log(`csscmjs ${steps}`);
      setSteps(transformRawToTasks(steps))
      navigate("/adventure")
    })


    await new Promise((resolve, reject) => {
    
      socket.on("student_joined", () => {
        resolve("Подключен к игре!");
      })
      socket.on("join_error", (error) => {
          reject(error)
      });


    });

  }

  return enterToRoom


}