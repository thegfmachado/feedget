import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "../Index";
import apiClient from "../../../services/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenShotButton } from "../ScreenShotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
};

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const { title, image } = feedbackTypeInfo;
  const { source, alt } = image;

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await apiClient.post('/feedbacks', {
        type: feedbackType,
        comment,
        screenshot,
      })

      setIsSubmitting(false);
      onFeedbackSent();

    } catch (err: any) {
      setIsSubmitting(false);
      throw new Error(err);
    }
  }

  return (
    <>
      <header>
        <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
          <ArrowLeft weight="bold" className="w-4 h-4" onClick={onFeedbackRestartRequested} />
        </button>
        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={source} alt={alt} className="w-6 h-6" />
          {title}
        </span>
        <CloseButton />
      </header>
      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenShotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />
          <button
            disabled={isSubmitting || !comment.length}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {
              isSubmitting
                ? <Loading />
                : 'Enviar Feedback'
            }
          </button>
        </footer>
      </form>
    </>
  );
}
