import { CalendarIcon, StarIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Header from "../components/Header";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

import { ptBR } from "date-fns/locale/pt-BR";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import { ColorPicker } from "../components/ColorPicker";
setDefaultOptions({ locale: ptBR });

export default function AddTask() {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2025-05-07")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2025-05-30"));
  const [color, setColor] = useState<string>("#6633ff");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  return (
    <>
      <Header text="Adicionar Tarefa" />
      <div className="flex flex-col gap-6 justify-center items-center py-10">
        <div className="bg-gray-primary rounded-lg shadow-md h-20 w-full px-5 flex justify-between items-center">
          <span className="flex gap-2">
            <StarIcon className="w-8" />
            <span>
              <p className="text-sm  text-gray-600 ">Grupo de tarefas</p>
              <h2 className="text-lg font-bold">*Grupo ou novo grupo*</h2>
            </span>
          </span>

          <div className="w-8 h-8 relative">
            <div
              style={{ backgroundColor: color }}
              onClick={() => setShowColorPicker(true)}
              className="w-full h-full rounded-full cursor-pointer border"
            ></div>

            {showColorPicker && (
              <ColorPicker
                setColor={setColor}
                color={color}
                setShowColorPicker={setShowColorPicker}
              />
            )}
          </div>
        </div>

        <div className="bg-gray-primary rounded-lg shadow-md gap-2 w-full p-5 flex flex-col items-center">
          <p className="text-sm text-left text-gray-600 w-full ">Descrição </p>
          <textarea
            className="text-lg w-full min-h-20 align-top"
            placeholder="Descrição de tarefa"
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<CustomDateInput label="Data de início" />}
            dateFormat="dd MMMM, yyyy"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            customInput={<CustomDateInput label="Data de término" />}
            dateFormat="dd MMMM, yyyy"
          />
        </div>
        <Button text="Adicionar tarefa" />
      </div>
    </>
  );
}

const CustomDateInput = forwardRef<HTMLButtonElement, any>(
  ({ value, onClick, label }: any, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      /* bg-gray-200 */ className="flex justify-between items-center w-full bg-gray-primary text-black px-4 py-3 rounded-2xl shadow-md"
    >
      <span className="flex gap-5">
        <CalendarIcon className="w-8" />
        <div className="text-left">
          <div className="text-xs text-gray-600">{label}</div>
          <div className="text-lg font-medium">{value}</div>
        </div>
      </span>
      <ChevronDownIcon className="w-8" />
    </button>
  )
);
