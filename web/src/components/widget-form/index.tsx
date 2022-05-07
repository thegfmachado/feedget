import { ReactElement, useState } from "react";
import { CloseButton } from "../CloseButton";

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'
import { FeedbackTypeStep } from "./steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./steps/FeedbackSuccessStep";

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Image de um inseto',
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Image de uma lâmpada',
    }
  },
  OTHER: {
    title: 'Outros',
    image: {
      source: thoughtImageUrl,
      alt: 'Image de um balão de pensamento',
    }
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  function renderFormContent(): ReactElement {
    if (feedbackSent) {
      return (
        <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
      );
    }

    if (!feedbackType) {
      return (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      );
    }

    return (
      <FeedbackContentStep
        onFeedbackSent={() => setFeedbackSent(true)}
        feedbackType={feedbackType}
        onFeedbackRestartRequested={handleRestartFeedback}
      />
    );

  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {renderFormContent()}
      <footer className="text-xs text-neutral-400">
        Feito com ❤ por <a className="underline underline-offset-2" href="https://github.com/1GabrielMachado1">Gabriel Machado</a>
      </footer>
    </div>
  );
}
