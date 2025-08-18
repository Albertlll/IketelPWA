import { useRoom } from "@/feature/enterToRoom/hooks/useRoom";
import httpConfig from "@/shared/api/httpClient";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import Loader from "@/shared/ui/loader/loader";

// import {QrCode} from "lucide-react"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


function HomePage() {
  console.log("mvkdmfvmdlfm")

  useEffect(() => {

    console.log("mvkdmfvmdlfm")
    httpConfig.get("/").then((resp) => {
      console.log(resp)
    }
    )
  }, [])
  const navigate = useNavigate()
  const location = useLocation();
  const scannedCode = location.state ? location.state.scannedCode[0].rawValue : "";
  console.log(scannedCode)

  const [isEnterLoading, setIsEnterLoading] = useState<boolean>(false);

  const [roomCode, setRoomCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");





  const enterToRoom = useRoom()

  const enterRoom = () => {
    setIsEnterLoading(true)
    enterToRoom(roomCode, username).then(() => { navigate("/lobby") })

  }




  return (
    <div className=" w-full h-full flex justify-center items-center">

      <div className=" w-full flex-1 flex flex-col gap-2 px-10">

        <div className=" flex flex-row gap-2">
          <Input onChange={(e) => { setRoomCode(e.target.value) }} placeholder="Введите код комнаты" />

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

    </div>
  );
}

export default HomePage;