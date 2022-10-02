import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import VoiceSelector from "../components/VoiceSelector";
import Words from "../components/Words";
import useSynthHook from "../hooks/useSynthHook";
import useWordshook from "../hooks/useWordsHook";
import "../styles/Home.module.css";

const Home: NextPage = () => {
  const {
    synth,
    words,
    speakOne,
    speakIdx,
    pauseVoice,
    playVoice,
    stopVoice,
    selectedVoice,
    setSelectedVoice,
    selectedIdx,
    forwardVoice,
    rewindVoice,
  } = useSynthHook();
  const [textValue, setTextValue] = useState<string>("");

  if (synth === null) {
    return <span>Aw... your browser does not support Speech Synthesis</span>;
  }

  const speakHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    speakOne(textValue);
  };

  return (
    <div>
      <form onSubmit={speakHandler}>
        <input
          type="text"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
        <VoiceSelector
          selected={selectedVoice}
          setSelected={setSelectedVoice}
          synth={synth}
        />
        <button type="submit">Speak</button>
      </form>

      <div>
        <Words
          words={words}
          speakIdx={speakIdx}
          selectedIdx={selectedIdx}
        ></Words>
      </div>
      <button onClick={rewindVoice}>rewindVoice</button>
      <button onClick={forwardVoice}>forwardVoice</button>
      <button onClick={playVoice}>playVoice</button>
      <button onClick={pauseVoice}>pauseVoice</button>
      <button onClick={stopVoice}>stopVoice</button>
    </div>
  );
};

export default Home;
