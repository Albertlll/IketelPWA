import type { RawTask, Task } from "../types/types";

export function transformRawToTasks(raw: RawTask[]): Task[] {
  return raw.map((item): Task => {
    if (item.type === "quiz") {
      return {
        id: item.step_id.toString(),
        stepNumber: item.step_number,
        type: "quiz",
        wordQuestion: item.question,
        options: item.options.map((opt) => ({
          id: opt.id,
          text: opt.text,
        })),
      };
    }

    if (item.type === "word_order") {
      return {
        id: item.step_id.toString(),
        stepNumber: item.step_number,
        type: "sentence",
        words: item.words.map((wrd, ind) => ({word : wrd, id :  `${item.step_id.toString()}-${ind}` })),
      };
    }

    throw new Error("Unknown task type:");
  });
}
