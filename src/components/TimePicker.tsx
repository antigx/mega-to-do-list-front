import { useState } from "react";
import Button from "./Button";

export default function TimePicker({
  handleClickTimer,
}: {
  handleClickTimer: (hour: number, minute: number) => void;
}) {
  const [hour, setHour] = useState(20);
  const [minute, setMinute] = useState(0);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setHour(Math.min(23, Math.max(0, value)));
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setMinute(Math.min(59, Math.max(0, value)));
  };

  const handleClick = () => {
    handleClickTimer(hour, minute);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <h1>Determine o tempo de foco</h1>
      <div className="flex flex-col gap-4 max-w-2/3 h-full rounded-xl bg-gray-primary p-8 shadow-md text-center space-y-4 shadow-inner">
        <div className="flex justify-center items-center space-x-2 text-2xl font-family-body">
          <input
            type="number"
            value={formatNumber(hour)}
            onChange={handleHourChange}
            className="bg-white w-20 h-20 rounded-md border text-center text-4xl"
          />
          <span>:</span>
          <input
            type="number"
            value={formatNumber(minute)}
            onChange={handleMinuteChange}
            className="bg-white w-20 h-20 rounded-md border text-center text-4xl"
          />
        </div>
      </div>
      <Button text="Definir Foco" handleClick={handleClick} />
    </div>
  );
}
