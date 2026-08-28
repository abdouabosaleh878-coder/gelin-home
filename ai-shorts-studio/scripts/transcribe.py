#!/usr/bin/env python3
"""Transcribes an audio/video file with word-level timestamps using
faster-whisper (CPU, int8) and writes the result as JSON to out_path.

Usage: transcribe.py <audio_path> <out_path> [model_size]
"""
import sys
import json


def main() -> None:
    if len(sys.argv) < 3:
        print("usage: transcribe.py <audio_path> <out_path> [model_size]", file=sys.stderr)
        sys.exit(2)

    audio_path = sys.argv[1]
    out_path = sys.argv[2]
    model_size = sys.argv[3] if len(sys.argv) > 3 else "base.en"

    from faster_whisper import WhisperModel

    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, _info = model.transcribe(audio_path, word_timestamps=True, vad_filter=False)

    words = []
    text_parts = []
    for segment in segments:
        text_parts.append(segment.text.strip())
        for word in segment.words or []:
            words.append({"word": word.word.strip(), "start": word.start, "end": word.end})

    result = {"text": " ".join(text_parts).strip(), "words": words}
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(result, f)


if __name__ == "__main__":
    main()
