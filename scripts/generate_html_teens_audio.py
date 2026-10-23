import sys
import re
import os
import asyncio
from pathlib import Path

# Fix Windows console UTF-8 encoding for Urdu
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

import edge_tts

COURSE_FILE = Path("src/data/htmlTeensCourseData.js")
OUTPUT_DIR = Path("public/audio/htmlTeens")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "ur-IN-SalmanNeural"
PITCH = "+8Hz"
RATE = "+6%"

async def generate_lesson_audio(lesson_id, urdu_text):
    out_file = OUTPUT_DIR / f"{lesson_id}_urdu.mp3"
    print(f"Generating {out_file.name}...")
    communicate = edge_tts.Communicate(
        text=urdu_text,
        voice=VOICE,
        pitch=PITCH,
        rate=RATE
    )
    await communicate.save(str(out_file))
    print(f"Saved: {out_file.name} ({out_file.stat().st_size} bytes)")

async def main():
    with open(COURSE_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # Match lesson blocks
    pattern = re.compile(
        r'id:\s*["\'](m\d+-l\d+)["\'].*?urduVoice:\s*["\'](.*?)["\']\s*,',
        re.DOTALL
    )

    matches = pattern.findall(content)
    print(f"Found {len(matches)} HTML teen lessons to synthesize.")

    for lesson_id, urdu_text in matches:
        clean_text = urdu_text.replace('\\"', '"').replace("\\'", "'").strip()
        await generate_lesson_audio(lesson_id, clean_text)

    print("All HTML Teens audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
