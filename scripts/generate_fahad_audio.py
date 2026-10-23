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

COURSE_FILE = Path("src/data/pythonKidsCourseData.js")
OUTPUT_DIR = Path("public/audio/pythonKids")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

VOICE = "ur-IN-SalmanNeural"
PITCH = "+8Hz"
RATE = "+6%"

async def generate_lesson_audio(lesson_id, urdu_text):
    out_file = OUTPUT_DIR / f"{lesson_id}_fahad.mp3"
    print(f"Generating {out_file.name} for: {urdu_text[:35]}...")
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
    print(f"Found {len(matches)} lessons to generate Fahad motivational audio.")

    for lesson_id, urdu_text in matches:
        clean_text = urdu_text.replace('\\"', '"').replace("\\'", "'").strip()
        await generate_lesson_audio(lesson_id, clean_text)

    # Also generate a welcome/intro sample audio for Fahad
    intro_text = "السلام علیکم نوجوان ساتھیو! میں فہد ہوں، آپ کا موٹیویشنل کوڈنگ اسپیکر۔ پائتھن پروگرامنگ کی اس شاندار دنیا میں خوش آمدید!"
    intro_file = OUTPUT_DIR / "fahad_intro.mp3"
    comm = edge_tts.Communicate(text=intro_text, voice=VOICE, pitch=PITCH, rate=RATE)
    await comm.save(str(intro_file))
    print(f"Generated intro: {intro_file.name}")

if __name__ == "__main__":
    asyncio.run(main())
