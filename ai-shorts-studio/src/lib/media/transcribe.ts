import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";

const execFileAsync = promisify(execFile);

export interface TranscribedWord {
  word: string;
  start: number;
  end: number;
}

export interface TranscriptionResult {
  text: string;
  words: TranscribedWord[];
}

const SCRIPT_PATH = path.join(process.cwd(), "scripts", "transcribe.py");

/** Real speech-to-text (faster-whisper, CPU) with word-level timestamps — used for clipped (non-generated) shorts. */
export async function transcribeAudio(audioPath: string, outJsonPath: string, modelSize = "base.en"): Promise<TranscriptionResult> {
  await execFileAsync("python3", [SCRIPT_PATH, audioPath, outJsonPath, modelSize], {
    maxBuffer: 1024 * 1024 * 20,
    timeout: 10 * 60 * 1000,
  });
  const raw = await readFile(outJsonPath, "utf8");
  const result = JSON.parse(raw) as TranscriptionResult;
  await rm(outJsonPath, { force: true });
  return result;
}
