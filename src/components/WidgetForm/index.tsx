import { useState } from "react";
import bugImageUrl from "../../assets/Bug.png";
import ideaImageUrl from "../../assets/Idea.png";
import thoughtImageUrl from "../../assets/Thought.png";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";


export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto"
    }
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lâmpada"
    }
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balão de pensamento"
    }
  },
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {

  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

  function handleRestartFeedback() {
    setFeedbackType(null)
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">

      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : (
        <FeedbackContentStep feedbackType={feedbackType} onFeedbackRestartRequested={handleRestartFeedback} />
      )}

      <footer className="text-xs text-neutral-400">
        Feito com :heart: <a className="underline underline-offset-2" href="http://landir.com.br">Landir</a>
      </footer>

    </div>
  )
}