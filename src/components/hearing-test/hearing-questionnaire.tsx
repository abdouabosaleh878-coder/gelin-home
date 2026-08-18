"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";
import { questions, getResultBand } from "@/data/questionnaire";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CtaButton } from "@/components/shared/cta-button";
import { cn } from "@/lib/utils";

export function HearingQuestionnaire() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[step];
  const isLastStep = step === questions.length - 1;
  const progressValue = submitted ? 100 : Math.round((step / questions.length) * 100);

  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, value) => sum + value, 0),
    [answers]
  );

  const result = useMemo(() => getResultBand(totalScore), [totalScore]);

  function selectAnswer(score: number) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: score }));
    if (isLastStep) {
      setSubmitted(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step > 0) setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-10">
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="h-12 w-12 text-teal-600" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold text-navy-900 sm:text-3xl">{result.title}</h2>
          <p className="mt-3 max-w-xl text-lg text-ink-600 text-pretty">{result.summary}</p>
          <p className="mt-3 max-w-xl text-base text-ink-600 text-pretty">{result.recommendation}</p>

          <div
            className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-left"
            role="note"
          >
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
            <p className="text-sm text-amber-900">
              This questionnaire is an informal screening tool and does not replace a
              professional hearing evaluation. Only a licensed hearing care provider can
              accurately diagnose hearing loss.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <CtaButton href="/book-appointment" icon="calendar" size="lg">
              Book a Professional Assessment
            </CtaButton>
            <Button variant="outline" size="lg" onClick={restart}>
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
              Retake the Check
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-6 sm:p-10">
      <div>
        <div className="flex items-center justify-between text-sm font-medium text-ink-500">
          <span>
            Question {step + 1} of {questions.length}
          </span>
          <span>{progressValue}% complete</span>
        </div>
        <Progress value={progressValue} label="Hearing check progress" className="mt-2" />
      </div>

      <fieldset className="mt-8">
        <legend className="text-2xl font-semibold text-navy-900 text-balance">
          {currentQuestion.prompt}
        </legend>
        {currentQuestion.helpText ? (
          <p className="mt-2 text-base text-ink-500">{currentQuestion.helpText}</p>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {currentQuestion.options.map((option) => {
            const selected = answers[currentQuestion.id] === option.score;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => selectAnswer(option.score)}
                aria-pressed={selected}
                className={cn(
                  "rounded-xl border-2 px-5 py-4 text-left text-lg font-medium transition-colors",
                  selected
                    ? "border-teal-600 bg-teal-50 text-teal-900"
                    : "border-navy-200 bg-white text-navy-800 hover:border-teal-400 hover:bg-teal-50/40"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center justify-between">
        <Button variant="ghost" onClick={goBack} disabled={step === 0}>
          Back
        </Button>
        <p className="text-sm text-ink-400">Takes about 5 minutes total</p>
      </div>
    </div>
  );
}
