import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Overview() {
  const [color, setColor] = useState<string>("");
  const percentage = 80;
  useEffect(() => {
    if (percentage >= 80) {
      setColor("#00ff00");
    } else if (percentage >= 50) {
      setColor("#fff000");
    } else {
      setColor("#ff0000");
    }
  }, [percentage]);

  return (
    <>
      <Header text={"Resumo rápido"} />
      <div className="flex flex-col gap-10 w-full h-full py-2 px-10 justify-center items-center flex-shrink-0">
        <p className="text-2xl text-center">
          Você está indo bem! Continue assim...
        </p>
        <span>
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            counterClockwise
            styles={buildStyles({
              rotation: 0.2,
              strokeLinecap: "round",
              pathColor: color,
              trailColor: "#e0e0e0",
              textColor: "#333",
              textSize: "20px",
              pathTransitionDuration: 0.5,
            })}
          />
        </span>
        <p className="text-2xl text-center">{percentage}/100 </p>
      </div>
    </>
  );
}
