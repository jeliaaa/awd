import { useEffect, useState } from "react";
import AccessIcon from "../assets/icons/access-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";

const Accesebility = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-multiplier', fontSizeMultiplier.toString());
    }, [fontSizeMultiplier]);

    return (
        <>
            <button
                className="bg-blue-800 cursor-pointer fixed bottom-4 right-4 w-15 md:w-20 aspect-square text-white p-1 rounded-full z-1000"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-full h-full flex items-center justify-center aspect-square rounded-full border">
                    <AccessIcon className="text-5xl fill-background" />
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-500">
                    <div className="bg-white p-6 rounded-lg z-500 h-1/2 w-4/5 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="title font-bold mb-4 text-primary">Accessibility Settings</h2>
                            <button
                                className="cursor-pointer transition-colors"
                                onClick={() => setIsOpen(false)}>
                                <CloseIcon  className="w-6 fill-primary h-6" />
                            </button>
                        </div>

                        <div className="flex flex-col space-y-2 ">
                            <label className="text-sm font-semibold text-gray-700">Font Size:</label>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setFontSizeMultiplier(prev => Math.max(0.8, prev - 0.1))}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    A-
                                </button>
                                <span className="text-gray-700">{(fontSizeMultiplier * 100).toFixed(0)}%</span>
                                <button
                                    onClick={() => setFontSizeMultiplier(prev => Math.min(1.5, prev + 0.1))}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    A+
                                </button>
                            </div>
                        </div>


                    </div>
                </div>
            )}
        </>
    );
};

export default Accesebility;
