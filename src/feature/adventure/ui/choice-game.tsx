// import type React from "react";
import { useState } from "react";
import type { QuizTask } from "../types/types";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";

const ChoiceGame = ({
  gameData,
  answerHandler,
}: { gameData: QuizTask; answerHandler: (answerId: number) => void }) => {
  const [selectedVariant, setSelectedVariant] = useState<number>(0);

  return (
    <div className="w-full h-full flex flex-col">



      <div className=" flex-1 items-center w-full h-full justify-center flex">

        <div className=" w-full text-center px-10 text-5xl text-primary">
          {gameData.wordQuestion}
        </div>

      </div>



      {/* <Text style={styles.questionWord}>{gameData.wordQuestion}</Text> */}


      {/* <Variants
          selectedVariant={selectedVariant}
          setSelectedVariant={(id) => setSelectedVariant(id)}
          variants={gameData.opptions}
        /> */}
      {/* 
        <AppButton
          onPress={() => answerHandler(selectedVariant)}
          style={styles.answerButton}
          type="default"
        >
          Ответить
        </AppButton> */}


      <div className="flex w-full gap-2 flex-col p-5">
        {
          gameData.options.map((option) =>
            <button onClick={() => setSelectedVariant(option.id)} key={option.id} className={cn(" w-full py-5 border-secondary border-2 rounded-[20px] text-secondary", selectedVariant === option.id && "border-primary text-primary")}>
              {option.text}
            </button>
          )
        }

        <Button onClick={() => answerHandler(selectedVariant)}>
          Ответить
        </Button>
      </div>

    </div>
  );
};


export default ChoiceGame;
