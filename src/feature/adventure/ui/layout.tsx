import { useAdventureStore } from "../model/adventureStore";
import SocketService from "@/shared/api/sockets";
import { Button } from "@/shared/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
// import type { SentenceTask } from "../types/types";
import ChoiceGame from "./choice-game";
import SentenceGame from "./sentence-game";
// import Sentence from "./sentence-game";
const Layout = () => {
  // const { sendAnswer } = useAdventureStore();
  const {
    currentTask,
    sendAnswer,
    isFinished,
    score,
    place,
    totalPlayers,
    setGameResult,
    resetGame,
  } = useAdventureStore();
  const navigate = useNavigate();

  useEffect(() => {
    const socket = SocketService.getInstance();
    const handleFinish = (data: { score: number; place: number; total_players: number }) => {
      setGameResult(data);
    };
    socket.on("game_finished", handleFinish);
    return () => {
      socket.off("game_finished", handleFinish);
    };
  }, [setGameResult]);



  console.log(currentTask)


  // const currentTask: SentenceTask = {
  //   words:
  //     [
  //       { id: "1", word: "Привет" },
  //       { id: "2", word: "мир" },
  //       { id: "3", word: "как" },
  //       { id: "4", word: "дела" },
  //       { id: "5", word: "сегодня" },
  //       { id: "6", word: "погода" },
  //       { id: "7", word: "отлично" },
  //       { id: "8", word: "солнечно" },
  //       { id: "9", word: "гулять" },
  //       { id: "10", word: "хорошо" }
  //     ],
  //   id: "0",
  //   stepNumber: 0,
  //   type: "sentence"
  // }

  const answerHandler = (answerId: (number | string[])) => {
    sendAnswer(answerId);
  };
  const exitToMain = () => {
    SocketService.getInstance().disconnect();
    resetGame();
    navigate("/");
  };

  return (
    <>
      {isFinished ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-[520px] bg-white rounded-[20px] p-6 sm:p-8 flex flex-col gap-4">
            <div className="text-2xl sm:text-3xl font-bold text-secondary">
              Игра завершена
            </div>
            <div className="text-sm sm:text-base text-primary">
              Ваше место: {place ?? "-"} из {totalPlayers || "-"}
            </div>
            <div className="text-4xl sm:text-5xl font-bold text-primary">
              {score} очков
            </div>
            <div className="pt-2">
              <Button onClick={exitToMain}>Выйти в главное меню</Button>
            </div>
          </div>
        </div>
      ) : currentTask === null ? (
        <div>
          <div>Немного подождите...</div>
        </div>
      ) : currentTask === undefined ? (
        <div>Подсчитываем результаты...</div>
      ) : currentTask.type === "quiz" ? (
        <ChoiceGame answerHandler={answerHandler} gameData={currentTask} />
      ) : (
        <SentenceGame answerHandler={answerHandler} gameData={currentTask} />
        // <Sentence gameData={currentTask} />
      )}
    </>
  );
};

export default Layout;
