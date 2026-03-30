// components/DonateButton.tsx
import { useState } from "react";
import DonateModal from "./DonateModal";
import HeartIcon from '../assets/icons/heart.svg'

export default function DonateButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/50 text-white p-4 rounded-full shadow-lg transition"
      >
        <img src={HeartIcon} className="w-14 h-14" alt="heart"/>
      </button>

      <DonateModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}