import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";

export default function Overview() {
  const [color, setColor] = useState<string>("");
  const percentage = 90;
  useEffect(() => {
    if (percentage >= 80) {
      setColor("#00ff00");
    } else if (percentage >= 50) {
      setColor("#fff000");
    } else {
      setColor("#ff00ff");
    }
  }, [percentage]);

  return (
    <>
      <Header text={"Resumo rápido"} />
      <div className="w-full h-full p-10 justify-center items-center flex-shrink-0">
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
      </div>
    </>
  );
}
