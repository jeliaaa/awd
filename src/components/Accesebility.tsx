import { useState } from "react";
import AccessIcon from "../assets/icons/access-solid.svg?react";
import CloseIcon from "../assets/icons/xmark.svg?react";

const Accesebility = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className="bg-blue-800 cursor-pointer fixed bottom-4 right-4 w-15 md:w-20 aspect-square text-white p-1 rounded-full z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="w-full h-full flex items-center justify-center aspect-square rounded-full border">
                    <AccessIcon className="text-5xl fill-background" />
                </div>
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
                    <div className="bg-white w-11/12 md:w-1/2 h-1/2 rounded-lg flex flex-col items-center py-3 overflow-auto">
                        <div className="title font-bold border-b-2 w-full pb-3 px-3 flex justify-between items-center">
                            <h1 className="text-2xl">Accessibility Options</h1>
                            <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
                                <CloseIcon className="fill-text" />
                            </button>
                        </div>
                        <h1 className="text-2xl font-bold">Accessibility Options</h1>
                        <p className="text-center mt-4">Here you can add your accessibility options.</p>
                        <button
                            className="mt-4 bg-blue-800 text-white px-4 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Accesebility;
