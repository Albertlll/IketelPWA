import { Button } from "@/shared/ui/button";

function Lobby() {
  return (
    <div className=" w-full h-full flex items-center justify-center p-10">

      <div className=" flex items-center justify-center flex-col gap-5">
        <div className=" text-primary text-3xl">
          Вы в комнате. <br />Ожидайте пока хост начнет игру
        </div>

        <Button>
          Выйти из комнаты
        </Button>
      </div>

    </div>
  );
}

export default Lobby;