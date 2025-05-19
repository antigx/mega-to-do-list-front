import { useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

export default function TimePicker({
  handleClickTimer,
}: {
  handleClickTimer: (hour: number, minute: number) => void;
}) {
  const [hour, setHour] = useState(20);
  const [minute, setMinute] = useState(0);
  const [isAM, setIsAM] = useState(false);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setHour(Math.min(23, Math.max(0, value)));
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) setMinute(Math.min(59, Math.max(0, value)));
  };

  const toggleAMPM = () => {
    setIsAM(!isAM);
    if (hour >= 12) {
      setHour(hour - 12);
    } else {
      setHour(hour + 12);
    }
  };

  const handleClick = () => {
    handleClickTimer(hour, minute);
  };

  return (
    <>
      <h1>Determine o horário que encerrará seu horário de foco</h1>
      <div className="flex flex-col gap-4 max-w-2/3 h-full rounded-xl bg-gray-primary p-8 shadow-md text-center space-y-4 shadow-inner">
        <p className="text-sm w-full text-left text-gray-600">Enter time</p>
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
          <div className="ml-2 flex flex-col text-white">
            <button
              className={`text-xs p-3 rounded-t ${
                isAM ? "bg-gray-secondary" : "bg-gray-400 border"
              }`}
              onClick={() => {
                if (!isAM) toggleAMPM();
              }}
            >
              AM
            </button>
            <button
              className={`text-xs p-3 rounded-b ${
                !isAM ? "bg-gray-secondary " : "bg-gray-400 border"
              }`}
              onClick={() => {
                if (isAM) toggleAMPM();
              }}
            >
              PM
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-700">
          <ClockIcon className="w-5 h-5 text-gray-500" />
          <div className="space-x-4">
            <button className="hover:underline">Cancel</button>
            <button className="font-bold hover:underline">OK</button>
          </div>
        </div>
      </div>
      <Button text="Definir Foco" handleClick={handleClick} />
    </>
  );
}
