import { useRoom } from "@/feature/enterToRoom/hooks/useRoom";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import Loader from "@/shared/ui/loader/loader";

import { useState } from "react";
import { useLocation, useNavigate } from "react-router";


function HomePage() {
  const navigate = useNavigate()
  const location = useLocation();
  const scannedCode = location.state ? location.state.scannedCode : "";

  const [isEnterLoading, setIsEnterLoading] = useState<boolean>(false);
  const [joinError, setJoinError] = useState<string | null>(null);

  const [roomCode, setRoomCode] = useState<string>(scannedCode);
  const [username, setUsername] = useState<string>("");


  const enterToRoom = useRoom()

  const enterRoom = () => {
    setJoinError(null);
    setIsEnterLoading(true)
    enterToRoom(roomCode, username)
      .then(() => {
        setIsEnterLoading(false);
        navigate("/lobby");
      })
      .catch((err) => {
        setIsEnterLoading(false);
        setJoinError(typeof err === "string" ? err : "Не удалось подключиться к игре");
      });

  }



  return (
    <div className=" w-full h-full flex justify-center items-center">

      <div className=" w-full flex-1 flex flex-col gap-2 px-10">

        <div className=" flex flex-row gap-2">
          <Input value={roomCode} onChange={(e) => { setRoomCode(e.target.value) }} placeholder="Введите код комнаты" />

          {/* <Button onClick={() => navigate("/qr-scan")} className="p-0 aspect-square rounded-[20px]" variant={"secondary"}>
            <QrCode height={30} width={30} color="white"/>
          </Button> */}
        </div>

        <Input onChange={(e) => { setUsername(e.target.value) }} placeholder="Введите ваше имя" />


        <Button onClick={enterRoom} className="w-full">
          <div className="h-[30px] flex items-center justify-center">
            {
              isEnterLoading ?
                <div>
                  <Loader />
                </div>
                :

                <div>
                  Войти
                </div>

            }

          </div>


        </Button>

      </div>

      {joinError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md bg-white rounded-[20px] p-6 flex flex-col gap-4">
            <div className="text-xl font-semibold text-secondary">
              {joinError}
            </div>
            <div className="text-sm text-primary">
              Попробуйте снова или подождите следующую игру.
            </div>
            <Button
              onClick={() => {
                setJoinError(null);
                navigate("/");
              }}
            >
              На главный экран
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

export default HomePage;
