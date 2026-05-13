"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, Square } from "lucide-react";

export default function SoundWave({ blogPost, dict }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speechProgress, setSpeechProgress] = useState(0);
  const [audioError, setAudioError] = useState(null);
  const speakRef = useRef(null);
  const intervalRef = useRef(null);
  const startEpochRef = useRef(0);
  const startOffsetRef = useRef(0);
  const audioRef = useRef(null);

  const audioFile = blogPost?.audioFile;
  const hasAudioFile = !!audioFile;

  const waveCount = 20;
  const waves = Array.from({ length: waveCount }, (_, i) => i);

  const getContentText = () => {
    if (typeof blogPost.content === "object" && blogPost.content?.text)
      return blogPost.content.text;
    if (typeof blogPost.content === "string") return blogPost.content;
    return "";
  };

  // --- Audio file mode ---
  useEffect(() => {
    if (!hasAudioFile) return;
    const audio = new Audio(audioFile);
    audioRef.current = audio;

    const onLoadedMetadata = () => setDuration(audio.duration);
    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setSpeechProgress(
        audio.duration ? audio.currentTime / audio.duration : 0,
      );
    };
    const onEnded = () => {
      setIsPlaying(false);
      setSpeechProgress(1);
      setCurrentTime(audio.duration);
    };
    const onError = (e) => {
      console.error("Audio load error:", e);
      setAudioError("Ses dosyası yüklenemedi.");
      setIsPlaying(false);
    };

    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFile]);

  // --- TTS mode ---
  useEffect(() => {
    if (hasAudioFile) return;
    let cancelled = false;
    import("speak-tts").then(({ default: Speech }) => {
      if (cancelled) return;
      const sp = new Speech();
      sp.init({
        lang: "tr-TR",
        rate: 0.97,
        pitch: 1.12,
        volume: 1,
        splitSentences: true,
      })
        .then(() => {
          if (!cancelled) speakRef.current = sp;
        })
        .catch((e) => console.warn("speak-tts init error:", e));
    });

    const wordCount = getContentText().split(" ").length;
    setDuration((wordCount / 200) * 60);

    return () => {
      cancelled = true;
      speakRef.current?.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogPost.content]);

  const startProgressTracking = (fromProgress = 0) => {
    const initialTime = fromProgress * duration;
    setCurrentTime(initialTime);
    setSpeechProgress(fromProgress);
    startEpochRef.current = Date.now();
    startOffsetRef.current = initialTime;

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startEpochRef.current) / 1000;
      const newTime = startOffsetRef.current + elapsed;
      const newProgress = newTime / duration;
      setCurrentTime(newTime);
      setSpeechProgress(Math.min(newProgress, 1));
      if (newProgress >= 1) {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
        setSpeechProgress(1);
        setCurrentTime(duration);
      }
    }, 100);
  };

  const stopProgressTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (hasAudioFile) {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setAudioError(null);
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch((e) => {
            console.error("audio play error:", e);
            setAudioError("Ses dosyası oynatılamadı: " + (e?.message || e));
            setIsPlaying(false);
          });
      }
      return;
    }

    if (!speakRef.current) {
      alert(
        dict?.toast?.common?.browserNotSupported ||
          "Bu tarayıcı sesli okuma özelliğini desteklemiyor.",
      );
      return;
    }

    if (isPlaying) {
      speakRef.current.cancel();
      stopProgressTracking();
      setIsPlaying(false);
    } else {
      const contentText = getContentText();
      setIsPlaying(true);
      startProgressTracking(0);
      speakRef.current
        .speak({
          text: contentText,
          listeners: {
            onstart: () => {},
            onend: () => {
              setIsPlaying(false);
              stopProgressTracking();
              setSpeechProgress(1);
              setCurrentTime(duration);
            },
            onerror: (e) => {
              console.warn("speak-tts error:", e);
              setIsPlaying(false);
              stopProgressTracking();
            },
          },
        })
        .catch((e) => {
          console.warn("speak-tts speak error:", e);
          setIsPlaying(false);
          stopProgressTracking();
        });
    }
  };

  const stopPlaying = () => {
    if (hasAudioFile) {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
      setIsPlaying(false);
      setSpeechProgress(0);
      setCurrentTime(0);
      return;
    }
    speakRef.current?.cancel();
    stopProgressTracking();
    setIsPlaying(false);
    setSpeechProgress(0);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));

    if (hasAudioFile) {
      const audio = audioRef.current;
      if (!audio || !audio.duration) return;
      const newTime = clickRatio * audio.duration;
      audio.currentTime = newTime;
      setCurrentTime(newTime);
      setSpeechProgress(clickRatio);
      return;
    }

    const contentText = getContentText();

    speakRef.current?.cancel();
    stopProgressTracking();

    const newTime = clickRatio * duration;
    setCurrentTime(newTime);
    setSpeechProgress(clickRatio);

    let adjustedIndex = Math.floor(contentText.length * clickRatio);
    while (adjustedIndex > 0 && contentText[adjustedIndex] !== " ")
      adjustedIndex--;
    const partialContent = contentText.slice(adjustedIndex).trim();

    if (!partialContent || !speakRef.current) return;

    setIsPlaying(true);
    startProgressTracking(clickRatio);
    speakRef.current
      .speak({
        text: partialContent,
        listeners: {
          onstart: () => {},
          onend: () => {
            setIsPlaying(false);
            stopProgressTracking();
            setSpeechProgress(1);
            setCurrentTime(duration);
          },
          onerror: (er) => {
            console.warn("speak-tts seek error:", er);
            setIsPlaying(false);
            stopProgressTracking();
          },
        },
      })
      .catch((er) => {
        console.warn("speak-tts seek speak error:", er);
        setIsPlaying(false);
        stopProgressTracking();
      });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gray-100 rounded-full">
          <Volume2 className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800">{dict?.readMode}</h3>
          <p className="text-sm text-gray-500">{dict?.listenpaper}</p>
        </div>
      </div>

      {audioError && <p className="text-sm text-red-500 mb-3">{audioError}</p>}

      {/* Player Controls */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-900 text-white rounded-full shadow-sm transition-all duration-200 hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </button>

        {/* Stop Button */}
        {isPlaying && (
          <button
            onClick={stopPlaying}
            className="flex items-center justify-center w-10 h-10 bg-gray-500 hover:bg-gray-600 text-white rounded-full shadow-sm transition-all duration-200 hover:scale-105"
          >
            <Square className="w-4 h-4" />
          </button>
        )}

        {/* Sound Wave Animation */}
        <div className="flex items-center gap-1 flex-1 justify-center">
          {waves.map((wave) => (
            <div
              key={wave}
              className={`bg-gray-400 rounded-full transition-all duration-150 ${
                isPlaying ? "animate-pulse" : ""
              }`}
              style={{
                width: "3px",
                height: isPlaying ? `${Math.random() * 20 + 10}px` : "8px",
                animationDelay: `${wave * 50}ms`,
                animationDuration: `${Math.random() * 500 + 500}ms`,
              }}
            />
          ))}
        </div>

        {/* Time Display */}
        <div className="text-sm text-gray-500 font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="w-full bg-gray-200 rounded-full h-2 cursor-pointer hover:h-3 transition-all duration-200 relative group"
        onClick={handleProgressClick}
      >
        <div
          className="bg-gray-700 h-full rounded-full transition-all duration-300 relative"
          style={{
            width: `${speechProgress * 100}%`,
          }}
        >
          {/* Progress thumb */}
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              right: "-6px",
              display: speechProgress > 0 ? "block" : "none",
            }}
          />
        </div>

        {/* Hover preview */}
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
      </div>

      {/* Info Text */}
      <p className="text-xs text-gray-400 mt-3 text-center">
        {dict?.listenModeInfo}
      </p>
    </div>
  );
}
