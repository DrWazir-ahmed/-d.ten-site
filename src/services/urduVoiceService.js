/**
 * urduVoiceService.js
 * Dedicated voice service for D.TEN using the "Fahad (Motivational Speaker)" voice profile.
 * Copied and adapted from Urdu Voice Over Agent Development:
 * - Base Voice: ur-IN-SalmanNeural (Microsoft Salman Neural)
 * - Pitch Offset: +8Hz (cheerful, motivational, energetic)
 * - Rate Offset: +6% (brisk, engaging, motivational tempo)
 * - Profile: فہد (Fahad - موٹیویشنل اسپیکر)
 */

export const FAHAD_VOICE_CONFIG = {
  id: "ur-IN-FahadMotiv",
  name: "اُردو آواز",
  title: "Urdu Voice (Motivational)",
  baseVoice: "ur-IN-SalmanNeural",
  pitchOffsetHz: 8,
  rateOffsetPercent: 6,
  webSpeechPitch: 1.08, // Maps +8Hz to Web Speech API pitch scale
  webSpeechRate: 1.06,  // Maps +6% to Web Speech API rate scale
  badge: "اُردو آواز",
  description: "پرجوش اور ترغیبی انداز - موٹیویشنل تقاریر، رہنمائی، کوڈنگ سیشن اور پریزنٹیشنز",
  sample: "کامیابی کا راز مسلسل محنت اور تجسس میں ہے! کوڈنگ سیکھنا ایک شاندار ایڈونچر ہے۔",
};

// Singleton tracking active playback
let activeAudio = null;
let isSpeakingState = false;
let studioServerAvailable = null; // null = untried, true/false cached

/**
 * Check if the standalone Urdu Voice Studio agent server is running locally on port 8765
 */
async function checkStudioServer() {
  if (studioServerAvailable !== null) return studioServerAvailable;
  try {
    const res = await fetch("http://127.0.0.1:8765/api/voices", {
      method: "GET",
      signal: AbortSignal.timeout ? AbortSignal.timeout(1200) : undefined,
    });
    studioServerAvailable = res.ok;
  } catch {
    studioServerAvailable = false;
  }
  return studioServerAvailable;
}

/**
 * Find the best matching browser SpeechSynthesis voice for Fahad (Salman Neural / Urdu Male)
 */
export function getFahadBrowserVoice() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;

  const voices = window.speechSynthesis.getVoices() || [];
  if (!voices.length) return null;

  // 1. Highest priority: Salman Neural (the base voice of Fahad in Microsoft Speech)
  const salmanVoice = voices.find((v) => {
    const n = (v.name || "").toLowerCase();
    const l = (v.lang || "").toLowerCase();
    return n.includes("salman") || (l.includes("ur") && n.includes("salman"));
  });
  if (salmanVoice) return salmanVoice;

  // 2. Urdu male voices (Asad / Urdu India / Urdu Pakistan)
  const urduMaleVoice = voices.find((v) => {
    const n = (v.name || "").toLowerCase();
    const l = (v.lang || "").toLowerCase();
    return (l.startsWith("ur") || l.includes("urdu")) && (n.includes("asad") || n.includes("male") || n.includes("natural"));
  });
  if (urduMaleVoice) return urduMaleVoice;

  // 3. Any Urdu voice
  const anyUrduVoice = voices.find((v) => {
    const l = (v.lang || "").toLowerCase();
    return l.startsWith("ur") || l.includes("urdu");
  });
  if (anyUrduVoice) return anyUrduVoice;

  // 4. Hindi natural male voices (close acoustic phonetic match if Urdu is not installed)
  const hindiVoice = voices.find((v) => {
    const n = (v.name || "").toLowerCase();
    const l = (v.lang || "").toLowerCase();
    return l.startsWith("hi") && (n.includes("madhur") || n.includes("male") || n.includes("natural"));
  });
  if (hindiVoice) return hindiVoice;

  return null;
}

/**
 * Stop any active Urdu playback (both HTML5 Audio and Web Speech)
 */
export function stopUrduSpeech() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch {
      // ignore
    }
    activeAudio = null;
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
  }

  isSpeakingState = false;
}

/**
 * Return current speaking status
 */
export function isUrduSpeaking() {
  return isSpeakingState;
}

/**
 * Synthesizes or plays Urdu speech using the Fahad Motivational Speaker profile.
 * Hierarchy:
 * 1. Pre-generated studio audio if lessonId is given (/audio/pythonKids/{lessonId}_fahad.mp3)
 * 2. Live Urdu Voice Studio API if local server is active (http://127.0.0.1:8765/api/synthesize)
 * 3. Browser Web Speech API tuned with Fahad's exact pitch (+8Hz -> 1.08) and rate (+6% -> 1.06)
 */
export async function speakUrduFahad({
  text,
  lessonId = null,
  courseType = 'pythonKids', // 'pythonKids' | 'htmlTeens'
  onStart = () => {},
  onEnd = () => {},
  onError = () => {},
}) {
  stopUrduSpeech();
  isSpeakingState = true;

  // ─── OPTION 1: Static Pre-recorded Studio Audio for Lessons ────────
  if (lessonId) {
    const audioUrl = courseType === 'htmlTeens'
      ? `/audio/htmlTeens/${lessonId}_urdu.mp3`
      : `/audio/pythonKids/${lessonId}_fahad.mp3`;
    try {
      const audio = new Audio(audioUrl);
      activeAudio = audio;

      audio.onplay = () => {
        isSpeakingState = true;
        onStart();
      };

      audio.onended = () => {
        isSpeakingState = false;
        activeAudio = null;
        onEnd();
      };

      audio.onerror = async () => {
        console.info(`[UrduVoice] Pre-recorded audio not found for ${lessonId} (${courseType}), falling back...`);
        activeAudio = null;
        await fallbackToLiveOrWebSpeech(text, onStart, onEnd, onError);
      };

      await audio.play();
      return;
    } catch {
      activeAudio = null;
      // Fall through to fallback
    }
  }

  await fallbackToLiveOrWebSpeech(text, onStart, onEnd, onError);
}

/**
 * Helper: tries live server, then Web Speech API
 */
async function fallbackToLiveOrWebSpeech(text, onStart, onEnd, onError) {
  if (!text || !text.trim()) {
    isSpeakingState = false;
    onEnd();
    return;
  }

  // ─── OPTION 2: Local Urdu Voice Studio API (if running) ────────────
  const hasStudioServer = await checkStudioServer();
  if (hasStudioServer) {
    try {
      const resp = await fetch("http://127.0.0.1:8765/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text,
          voice: FAHAD_VOICE_CONFIG.id, // "ur-IN-FahadMotiv"
          pitch: 0,
          rate: 0,
          volume: 0,
          formats: ["mp3"],
        }),
      });

      if (resp.ok) {
        const data = await resp.json();
        const mp3RelPath = data.formats?.mp3;
        if (mp3RelPath) {
          const liveAudioUrl = `http://127.0.0.1:8765${mp3RelPath}`;
          const liveAudio = new Audio(liveAudioUrl);
          activeAudio = liveAudio;

          liveAudio.onplay = () => {
            isSpeakingState = true;
            onStart();
          };
          liveAudio.onended = () => {
            isSpeakingState = false;
            activeAudio = null;
            onEnd();
          };
          liveAudio.onerror = () => {
            activeAudio = null;
            speakViaWebSpeech(text, onStart, onEnd, onError);
          };

          await liveAudio.play();
          return;
        }
      }
    } catch (e) {
      console.warn("[FahadVoice] Live studio synthesis error, using Web Speech:", e);
    }
  }

  // ─── OPTION 3: In-Browser Web Speech API with Fahad Parameters ─────
  speakViaWebSpeech(text, onStart, onEnd, onError);
}

/**
 * Web Speech API configured to Fahad's Motivational Speaker acoustic properties
 */
function speakViaWebSpeech(text, onStart, onEnd, onError) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    isSpeakingState = false;
    onError(new Error("Speech synthesis not supported in this browser"));
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const chosenVoice = getFahadBrowserVoice();

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || "ur-PK";
    } else {
      utterance.lang = "ur-PK";
    }

    // Fahad Motivational Speaker acoustic adjustments
    utterance.pitch = FAHAD_VOICE_CONFIG.webSpeechPitch; // 1.08 (+8Hz)
    utterance.rate = FAHAD_VOICE_CONFIG.webSpeechRate;   // 1.06 (+6%)

    utterance.onstart = () => {
      isSpeakingState = true;
      onStart();
    };

    utterance.onend = () => {
      isSpeakingState = false;
      onEnd();
    };

    utterance.onerror = (err) => {
      isSpeakingState = false;
      onError(err);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    isSpeakingState = false;
    onError(err);
  }
}
