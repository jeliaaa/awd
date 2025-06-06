import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ChevronRight from '../../assets/icons/chevron-right.svg?react';
import image1 from '../../assets/mainSlider/image1.jpg';
import image2 from '../../assets/mainSlider/image2.jpg';

const slides = [
    {
        image: image1,
        text: 'Welcome to our platform!',
        link: '/news/welcome',
    },
    {
        image: image2,
        text: 'Discover amazing features.',
        link: '/news/features',
    },
    {
        image: 'https://picsum.photos/1400/1000',
        text: 'Join us today!',
        link: '/news/join',
    },
];

const SLIDE_INTERVAL = 5000;

export default function MainSlider() {
    const [current, setCurrent] = useState(0);
    const [timeLeft, setTimeLeft] = useState(SLIDE_INTERVAL / 1000);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goToNext = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setTimeLeft(SLIDE_INTERVAL / 1000);
    };

    const goToPrev = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setTimeLeft(SLIDE_INTERVAL / 1000);
    };

    useEffect(() => {
        timerRef.current = setInterval(goToNext, SLIDE_INTERVAL);
        countdownRef.current = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : SLIDE_INTERVAL / 1000));
        }, 1000);

        return () => {
            clearInterval(timerRef.current!);
            clearInterval(countdownRef.current!);
        };
    }, []);

    return (
        <div className="relative w-full h-[60dvh] overflow-hidden shadow-lg">
            <div className="relative w-full h-full group">
                <img
                    src={slides[current].image}
                    alt={`Slide ${current + 1}`}
                    className="w-full h-full object-cover"
                />

                {/* Black Overlay with Text Link */}
                <Link to={slides[current].link} className="absolute inset-0 bg-black/50 transition-opacity duration-500 group-hover:opacity-0 flex items-center justify-center">
                    <p

                        className="text-white text-2xl sm:text-4xl font-bold px-6 py-4 rounded-md bg-black/30 hover:bg-black/60 transition"
                    >
                        {slides[current].text}
                    </p>
                </Link>

                {/* Center Chevron Link */}
                {/* <div
                    className="absolute bottom-3 group left-1/2 transform -translate-x-1/2 cursor-pointer hover:bottom-0.5 transition-all border border-primary p-4 rounded-full flex items-center justify-center"
                    onClick={goToNext}
                >
                    <ChevronRight className="text-3xl group-hover:fill-white rotate-90 fill-primary" />
                </div> */}

                {/* Timer */}
                <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 title rounded-full">
                    {timeLeft}s
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 cursor-pointer -translate-y-1/2 p-2 rounded-full"
                >
                    <ChevronRight className="text-4xl fill-primary rotate-180" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 cursor-pointer -translate-y-1/2 p-2 rounded-full"
                >
                    <ChevronRight className="text-4xl fill-primary" />
                </button>
            </div>
        </div>
    );
}
