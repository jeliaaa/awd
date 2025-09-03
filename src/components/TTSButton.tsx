import React from "react";
import { useTTSStore } from "../store/useTTSStore";

interface Props {
  text: string;
}

const TTSButton: React.FC<Props> = ({ text }) => {
  const { loading, playTTS } = useTTSStore();

  return (
    <button onClick={() => playTTS(text, 3)} disabled={loading}>
      {loading ? "Loading..." : "Play"}
    </button>
  );
};

export default TTSButton;