

type RawOption = {
  id: number;
  text: string;
};

type RawQuiz = {
  type: "quiz";
  step_id: number;
  step_number: number;
  question: string;
  options: RawOption[];
};

type RawSentence = {
  type: "word_order";
  step_id: number;
  step_number: number;
  sentence: string;
  words: string[];
};

export type RawTask = RawQuiz | RawSentence;

type BaseTask = {
  id: string;
  stepNumber: number;
};

export type QuizTask = {
  wordQuestion: string;
  type: "quiz";
  options: { text: string; id: number }[];
} & BaseTask;

export type SentenceTask = {
  type: "sentence";
  words: string[];
} & BaseTask;

export type Task = QuizTask | SentenceTask;