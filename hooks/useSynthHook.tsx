import React, { useCallback, useEffect, useState } from "react";
import useWordshook from "./useWordsHook";

const useSynthHook = () => {
  const wordList: string[] = ["asdf", "qwer", "안녕", "둘둘셋"];
  const { words, addWord, deleteWord } = useWordshook(wordList);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [selectedVoice, setSelectedVoice] = useState<number>(0);
  const [selectedIdx, setSelectedIdx] = useState<number>(-1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSynth(window.speechSynthesis);
      setPaused(window.speechSynthesis.paused);
    }
  }, []);

  const speakOne = (text: string) => {
    if (synth === null) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = synth.getVoices()[selectedVoice];
    synth.cancel();
    synth.resume();
    synth.speak(utterance);
  };

  const speakIdx = (idx: number) => {
    if (synth === null) return;
    console.log("paused", paused);
    synth.cancel();
    for (let i = idx; i < words.length; i++) {
      const utterance = new SpeechSynthesisUtterance(words[i]);
      utterance.voice = synth.getVoices()[selectedVoice];
      utterance.onstart = () => {
        setSelectedIdx(i);
      };
      utterance.onend = () => {
        if (i === words.length - 1) setSelectedIdx(-1);
      };
      synth.speak(utterance);
    }
  };

  const pauseVoice = () => {
    if (synth === null) return;
    console.log("pause");
    synth.pause();
  };

  const playVoice = () => {
    if (synth === null) return;
    console.log("resume");
    synth.resume();
  };

  const forwardVoice = () => {
    if (synth === null) return;
    speakIdx(selectedIdx + 1);
  };
  const rewindVoice = () => {
    if (synth === null) return;
    speakIdx(selectedIdx - 1);
  };

  const stopVoice = () => {
    if (synth === null) return;
    synth.cancel();
  };

  const isPaused = () => {
    if (synth === null) return null;
    return synth.paused;
  };

  return {
    synth,
    speakOne,
    speakIdx,
    selectedVoice,
    setSelectedVoice,
    pauseVoice,
    playVoice,
    stopVoice,
    forwardVoice,
    rewindVoice,
    words,
    addWord,
    deleteWord,
    selectedIdx,
  };
};
export default useSynthHook;
