import React from "react";
import { useTranslation } from "react-i18next";
import { useTTSStore } from "../store/useTTSStore";

interface Props {
  text: string;
}

const TTSButton: React.FC<Props> = ({ text }) => {
  const { t } = useTranslation();
  const { loading, playTTS } = useTTSStore();

  return (
    <button onClick={() => playTTS(text, 3)} disabled={loading}>
      {loading ? t("tts.loading") : t("tts.play")}
    </button>
  );
};

export default TTSButton;