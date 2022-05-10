import { CloseButton } from "../../CloseButton";

interface FeedbackSuccessStepProps {
  onFeedbackRestartRequested: () => void
}

export function FeedbackSuccessStep({ onFeedbackRestartRequested }: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>
      <div className="flex flex-col items-center py-10 w-[304px]">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 34C42 36.209 40.209 38 38 38H10C7.791 38 6 36.209 6 34V6C6 3.791 7.791 2 10 2H38C40.209 2 42 3.791 42 6V34Z" fill="#77B255" />
          <path d="M35.28 8.36202C34.124 7.61102 32.576 7.94002 31.822 9.09802L20.936 25.877L15.907 21.227C14.893 20.289 13.311 20.352 12.374 21.365C11.437 22.379 11.499 23.961 12.513 24.898L19.722 31.564C20.202 32.009 20.812 32.229 21.418 32.229C22.091 32.229 22.952 31.947 23.517 31.09C23.849 30.584 36.017 11.82 36.017 11.82C36.768 10.661 36.438 9.11302 35.28 8.36202Z" fill="white" />
        </svg>
        <span className="text-xl mt-2">Agradecemos o Feedback!</span>
        <button onClick={onFeedbackRestartRequested} className="py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500">
          Quero enviar outro
        </button>
      </div>
    </>
  )
}