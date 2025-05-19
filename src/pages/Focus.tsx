import Header from "../components/Header";
import { useState } from "react";
import TimePicker from "../components/TimePicker";
import Cronometer from "../components/Cronometer";

export default function Focus() {
  const [time, setTime] = useState<number>(30);
  const [showCronometer, setShowCronometer] = useState(false);
  const [play, setPlay] = useState<boolean>(false);

  // Update size on window resize

  const handleClickTimer = (hour: number, minute: number) => {
    setTime(hour * 60 + minute);
    setShowCronometer(true);
    setPlay(true);
  };
  return (
    <>
      <Header text="Hora do Foco" />
      <div className="flex flex-col gap-10 items-center justify-evenly w-full py-30">
        {!showCronometer ? (
          <TimePicker handleClickTimer={handleClickTimer} />
        ) : (
          <Cronometer
            setTime={setTime}
            time={time}
            setPlay={setPlay}
            play={play}
            setShowCronometer={setShowCronometer}
          />
        )}
      </div>
    </>
  );
}
