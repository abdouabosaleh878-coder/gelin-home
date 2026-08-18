export type QuestionOption = {
  label: string;
  score: number;
};

export type Question = {
  id: string;
  prompt: string;
  helpText?: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    id: "conversation-groups",
    prompt: "Do you have trouble following conversations when several people are talking at once?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "background-noise",
    prompt: "Is it difficult to understand speech in noisy places, like restaurants?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "tv-volume",
    prompt: "Do others mention that you play the television or radio louder than they'd like?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "phone-calls",
    prompt: "Do you find phone conversations more difficult than face-to-face ones?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "asking-repeat",
    prompt: "Do you find yourself asking people to repeat what they said?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "ringing",
    prompt: "Do you notice ringing, buzzing, or hissing sounds in your ears?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "social-avoidance",
    prompt: "Do you avoid social situations because following conversation feels tiring or stressful?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Often", score: 2 },
      { label: "Almost always", score: 3 },
    ],
  },
  {
    id: "family-feedback",
    prompt: "Have family members or friends mentioned that you might be having trouble hearing?",
    options: [
      { label: "No", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Frequently", score: 3 },
    ],
  },
];

export type ResultBand = {
  minScore: number;
  maxScore: number;
  title: string;
  summary: string;
  recommendation: string;
};

export const resultBands: ResultBand[] = [
  {
    minScore: 0,
    maxScore: 5,
    title: "Your responses suggest minimal difficulty",
    summary:
      "Based on your answers, you don't show many common signs of hearing difficulty right now. That's great news.",
    recommendation:
      "Hearing can change gradually over time, so it's still a good idea to have a baseline hearing assessment every few years, especially after age 50.",
  },
  {
    minScore: 6,
    maxScore: 12,
    title: "Your responses suggest mild signs of difficulty",
    summary:
      "You noted a few situations — like noisy environments or group conversations — where hearing can feel more effortful.",
    recommendation:
      "A professional hearing assessment can clarify whether these moments point to early hearing loss and what options, if any, could help.",
  },
  {
    minScore: 13,
    maxScore: 19,
    title: "Your responses suggest moderate signs of difficulty",
    summary:
      "Several of your answers point to real, recurring difficulty following conversations in everyday situations.",
    recommendation:
      "We'd recommend booking a professional hearing assessment soon. Many people in a similar range find that properly fitted hearing aids make a noticeable difference.",
  },
  {
    minScore: 20,
    maxScore: 24,
    title: "Your responses suggest significant signs of difficulty",
    summary:
      "Your answers suggest hearing difficulty is affecting your daily life fairly consistently, including conversations, phone calls, and social settings.",
    recommendation:
      "Please book a professional hearing assessment as a next step. A licensed hearing care provider can give you a precise picture and walk through solutions built around your needs.",
  },
];

export function getResultBand(score: number) {
  return (
    resultBands.find((band) => score >= band.minScore && score <= band.maxScore) ??
    resultBands[resultBands.length - 1]
  );
}

export const maxPossibleScore = questions.length * 3;
