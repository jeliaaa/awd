import { motion, AnimatePresence } from "framer-motion";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function DonateModal({ open, onClose }: Props) {
  const accounts = [
    {
      bank: "TBC Bank",
      number: "GE00 TB0000 0000 0000 0000",
    },
    {
      bank: "BOG Bank",
      number: "GE00 BG0000 0000 0000 0000",
    },
  ];

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

          {/* backdrop */}
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/50"
          />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative p-6 rounded-2xl shadow-xl w-[90%] max-w-md z-10"
            style={{
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            }}
          >
            <h2
              className="text-xl font-bold mb-2"
              style={{ color: "var(--color-primary)" }}
            >
              Support Us 💙
            </h2>

            <p className="text-sm mb-4 opacity-70">
              Your support helps us grow and improve the platform.
            </p>

            {/* BANK LIST */}
            <div className="space-y-3">
              {accounts.map((acc, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl flex flex-col gap-2"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #eee",
                  }}
                >
                  {/* bank name */}
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {acc.bank}
                  </div>

                  {/* account */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm break-all">
                      {acc.number}
                    </span>

                    <button
                      onClick={() => copy(acc.number)}
                      className="text-xs px-3 py-1 rounded-md"
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "white",
                      }}
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* close */}
            <button
              onClick={onClose}
              className="mt-5 w-full py-2 rounded-lg"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
              }}
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}