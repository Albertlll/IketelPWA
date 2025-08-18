import { useAdventureStore } from "../model/adventureStore";
import ChoiceGame from "./choice-game";
// import Sentence from "./sentence-game";
const Layout = () => {
  const { currentTask, sendAnswer } = useAdventureStore();

  const answerHandler = (answerId: number) => {
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
        <>cdssdc </>
        // <Sentence gameData={currentTask} />
      )}
    </>
  );
};

export default Layout;
