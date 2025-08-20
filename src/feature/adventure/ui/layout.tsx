import { useAdventureStore } from "../model/adventureStore";
// import type { SentenceTask } from "../types/types";
import ChoiceGame from "./choice-game";
import SentenceGame from "./sentence-game";
// import Sentence from "./sentence-game";
const Layout = () => {
  // const { sendAnswer } = useAdventureStore();
  const { currentTask, sendAnswer } = useAdventureStore();



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
  return (
    <>
      {currentTask === null ? (
        <div>
          <div>Немного подождите...</div>
        </div>
      ) : currentTask === undefined ? (
        <div>Игра закончена!</div>
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
