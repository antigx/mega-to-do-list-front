import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { PauseIcon } from "@heroicons/react/24/outline";
import { TrashIcon, ArrowPathIcon, PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

interface CronometerProps {
  setTime: Dispatch<SetStateAction<number>>;
  time: number;
  setPlay: Dispatch<SetStateAction<boolean>>;
  play: boolean;
  setShowCronometer: Dispatch<SetStateAction<boolean>>;
}

export default function Cronometer({
  setTime,
  time,
  setPlay,
  play,
  setShowCronometer,
}: CronometerProps) {
  const [key, setKey] = useState<number>(0); // Key to force timer reset
  const [timerSize, setTimerSize] = useState(150); // Default size (mobile)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setTimerSize(300); // sm
      else if (window.innerWidth < 768) setTimerSize(300); // md
      else if (window.innerWidth < 1024) setTimerSize(300); // lg
      else setTimerSize(300); // xl+
    };

    handleResize(); // Set initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const resetTimer = () => {
    setKey((prevKey) => prevKey + 1); // Change key to force timer remount
    setPlay(true); // Auto-start on reset
  };
  return (
    <>
      <CountdownCircleTimer
        key={key}
        isPlaying={play}
        duration={time}
        colors="#333333"
        size={timerSize}
        strokeWidth={15}
        trailColor="#d9d9d9"
      >
        {({ remainingTime }) => {
          const min = String(Math.floor(remainingTime / 60)).padStart(2, "0");
          const sec = String(remainingTime % 60).padStart(2, "0");
          return (
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
              {`${min}:${sec}`}
            </div>
          );
        }}
      </CountdownCircleTimer>
      <div className="flex items-center gap-5">
        <div
          onClick={() => {
            setTime(0);
            setShowCronometer(false);
          }}
          className="p-4 rounded-full border hover:border-red-400 hover:bg-red-400/40 hover:text-red-500"
        >
          <TrashIcon className="w-8" />
        </div>
        <div
          onClick={() => {
            setPlay(!play);
          }}
          className="bg-gray-secondary p-4 rounded-full border"
        >
          {play ? (
            <PauseIcon className="w-12 text-white " />
          ) : (
            <PlayIcon className="w-12 text-white" />
          )}
        </div>
        <div
          onClick={() => {
            setTime(time);
            resetTimer();
          }}
          className="p-4 rounded-full border hover:border-green-400 hover:bg-green-400/40 hover:text-green-500"
        >
          <ArrowPathIcon className="w-8" />
        </div>
      </div>
    </>
  );
}
