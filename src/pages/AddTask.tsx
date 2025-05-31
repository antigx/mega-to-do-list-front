import { CalendarIcon, StarIcon } from "@heroicons/react/24/outline";
import Button from "../components/Button";
import Header from "../components/Header";
import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ptBR } from "date-fns/locale/pt-BR";
import { setDefaultOptions } from "date-fns/setDefaultOptions";
import api from "../services/api";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { useData } from "../contexts/DataContext";
import type { Task } from "../types/Task";
import { getColor } from "../utils/getColor";
import { format } from "date-fns-tz";

setDefaultOptions({ locale: ptBR });

const formatDateLocal = (date: Date) =>
  format(date, "yyyy-MM-dd'T'HH:mm:ssXXX", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

interface TaskForm {
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  priority: 1 | 2 | 3;
}

export default function AddTask() {
  const navigate: NavigateFunction = useNavigate();
  const [form, setForm] = useState<TaskForm>({
    title: "",
    description: "",
    start_date: new Date(),
    end_date: new Date(),
    priority: 2,
  });
  const { addTask } = useData();
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (
    date: Date | null,
    field: "start_date" | "end_date"
  ) => {
    if (date) {
      setForm((prev) => ({ ...prev, [field]: date }));
    }
  };

  const handleSubmit = async () => {
    try {
      // Força a data de término para o fim do dia local
      const fixedEndDate = new Date(form.end_date);
      fixedEndDate.setHours(23, 59, 59, 999);

      const fixedStartDate = new Date(form.start_date);
      fixedStartDate.setHours(0, 0, 0, 0);

      const taskData = {
        ...form,
        start_date: formatDateLocal(fixedStartDate),
        end_date: formatDateLocal(fixedEndDate),
      };

      const response = await api.post("/tasks", taskData);
      addTask(response.data as Task);
      navigate("/dash", { state: { shouldRefresh: true } });
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to create task"
      );
      console.error("Task creation error:", err);
    }
  };

  return (
    <>
      <Header text="Adicionar Tarefa" />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="flex flex-col gap-6 w-full lg:w-1/2 order-1 lg:order-1">
              <div className="bg-gray-primary rounded-lg shadow-md h-20 w-full px-5 flex justify-between items-center">
                <span className="flex gap-2 w-full">
                  <StarIcon className="w-8" />
                  <span className="w-full">
                    <p className="text-sm text-gray-600">Título</p>
                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="dark:text-black text-lg font-bold w-full bg-transparent focus:outline-none"
                      placeholder="Título da tarefa"
                    />
                  </span>
                </span>
              </div>

              <div className="bg-gray-primary rounded-lg shadow-md gap-2 w-full p-5 flex flex-col items-center order-2 lg:order-4 lg:hidden">
                <p className="text-sm text-left text-gray-600 w-full">
                  Descrição
                </p>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="dark:text-black text-lg w-full min-h-40 align-top bg-transparent focus:outline-none"
                  placeholder="Descrição de tarefa"
                />
              </div>

              <div className="flex flex-col gap-6 w-full order-3 lg:order-2">
                <DatePicker
                  selected={form.end_date}
                  onChange={(date) => handleDateChange(date, "end_date")}
                  customInput={<CustomDateInput label="Data de término" />}
                  dateFormat="dd MMMM, yyyy"
                  minDate={new Date()}
                  popperPlacement="bottom-start"
                  portalId="root-portal" // ID da div principal (geralmente root)
                  popperClassName="z-50"
                />
              </div>

              <div className="bg-gray-primary rounded-lg shadow-md h-20 w-full px-5 flex justify-between items-center order-4 lg:order-3">
                <span className="flex gap-2">
                  <StarIcon className="w-8" />
                  <span>
                    <p className="text-sm text-gray-600">Prioridade</p>
                    <div className="flex gap-3">
                      {[1, 2, 3].map((priority) => (
                        <button
                          key={priority}
                          onClick={() =>
                            setForm({
                              ...form,
                              priority: priority as 1 | 2 | 3,
                            })
                          }
                          className="text-lg font-medium text-gray-400"
                          style={{
                            color:
                              form.priority === priority
                                ? getColor(priority as 1 | 2 | 3)
                                : "",
                          }}
                        >
                          {priority === 1
                            ? "Baixa"
                            : priority === 2
                            ? "Normal"
                            : "Alta"}
                        </button>
                      ))}
                    </div>
                  </span>
                </span>
              </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 flex-col gap-6 order-2 lg:order-2 items-center">
              <div className="bg-gray-primary rounded-lg shadow-md gap-2 w-full p-5 flex flex-col items-center h-full">
                <p className="text-sm text-left text-gray-600 w-full">
                  Descrição
                </p>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="dark:text-black text-lg w-full flex-grow min-h-[200px] align-top bg-transparent focus:outline-none"
                  placeholder="Descrição de tarefa"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                text="Adicionar tarefa"
                handleClick={handleSubmit}
                disabled={!form.title.trim()}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex lg:hidden mt-6 justify-center">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <Button
            text="Adicionar tarefa"
            handleClick={handleSubmit}
            disabled={!form.title.trim()}
          />
        </div>
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
      className="flex justify-between items-center w-full bg-gray-primary text-black px-4 py-3 rounded-2xl shadow-md hover:bg-gray-200 transition-colors"
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
