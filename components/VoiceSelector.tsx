import type { NextPage } from "next";
import React from "react";
import { FormEvent, useCallback, useEffect, useState } from "react";

type VoiceSelectorProps = {
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  synth: SpeechSynthesis;
};

const VoiceSelector = ({
  selected = 0,
  setSelected,
  synth,
}: VoiceSelectorProps) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  const populateVoiceList = useCallback(() => {
    const newVoices = synth.getVoices();
    setVoices(newVoices);
  }, [synth]);

  useEffect(() => {
    populateVoiceList();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoiceList;
    }
  }, [populateVoiceList, synth]);

  return (
    <select
      value={selected}
      onChange={(e) => setSelected(parseInt(e.target.value))}
    >
      {voices.map((voice, index) => (
        <option key={index} value={index}>
          {voice.name} ({voice.lang}) {voice.default && " [Default]"}
        </option>
      ))}
    </select>
  );
};
export default VoiceSelector;
