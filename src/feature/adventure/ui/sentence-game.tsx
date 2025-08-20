import type { SentenceTask } from "../types/types";
import { useState } from "react";
import { DragDropProvider } from '@dnd-kit/react';
import { move } from '@dnd-kit/helpers';
import { AvaliableWords } from "./sentenceComponents/avaliable-words";
import { SentenceField } from "./sentenceComponents/sentence-field";
import { Word } from "./word";
import { Button } from "@/shared/ui/button";


interface wordRow { id: string, word: string };



function SentenceGame({
  gameData,
  answerHandler,
}: { gameData: SentenceTask; answerHandler: (answerSentence: string[]) => void }) {


  const [items, setItems] = useState<{ avaliableWords: wordRow[], sentenceWords: wordRow[] }>({
    avaliableWords: gameData.words,
    sentenceWords: [],
  });



  return (
    <DragDropProvider
      onDragOver={(event) => {
        setItems((items) => move(items, event));
      }}


    >
      <div className=" w-full h-full px-10 flex flex-col py-10">

        <SentenceField key={"sentenceWords"} id={"sentenceWords"}>
          {items.sentenceWords.map((wordRow, index) => (
            <Word word={wordRow.word} key={wordRow.id} id={wordRow.id} index={index} />
          ))}
        </SentenceField>


        <AvaliableWords key={"avaliableWords"} id={"avaliableWords"}>
          {items.avaliableWords.map((wordRow, index) => (
            <Word word={wordRow.word} key={wordRow.id} id={wordRow.id} index={index} />
          ))}
        </AvaliableWords>

        <Button onClick={() => answerHandler(items.sentenceWords.map((w) => w.word))}>
          Ответить
        </Button>

      </div>


    </DragDropProvider>
  );
}

export default SentenceGame;


