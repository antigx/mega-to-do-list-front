import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useData } from "../contexts/DataContext";

export default function Overview() {
  const { tasks } = useData();
  const [color, setColor] = useState<string>("");
  const [totalCount, setTotalCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Filtra apenas tarefas que já deveriam ter sido concluídas (datas passadas)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const pastTasks = tasks.filter((task) => {
      if (!task.end_date) return false;
      const endDate = new Date(task.end_date);
      endDate.setHours(0, 0, 0, 0);
      return endDate <= today;
    });

    const completed = pastTasks.filter((task) => task.completed);

    setTotalCount(pastTasks.length);
    setPercentage(
      pastTasks.length
        ? Math.round((completed.length / pastTasks.length) * 100)
        : 0
    );
  }, [tasks]);

  useEffect(() => {
    if (percentage >= 80) {
      setColor("#00ff00"); // Verde
    } else if (percentage >= 50) {
      setColor("#fff000"); // Amarelo
    } else {
      setColor("#ff0000"); // Vermelho
    }
  }, [percentage]);

  const getMotivationalMessage = () => {
    if (percentage >= 80) {
      return "Excelente trabalho! Você está indo muito bem!";
    } else if (percentage >= 50) {
      return "Bom trabalho! Você está no caminho certo!";
    } else if (totalCount > 0) {
      return "Você pode fazer melhor! Vamos lá!";
    } else {
      return "Nenhuma tarefa vencida encontrada.";
    }
  };

  return (
    <>
      <Header text={"Resumo rápido"} />
      <div className="flex flex-col gap-6 w-full h-full py-6 px-4 sm:px-10 justify-center items-center">
        <p className="text-xl sm:text-2xl text-center">
          {getMotivationalMessage()}
        </p>

        <div className="w-48 h-48 sm:w-64 sm:h-64 dark:text-white">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            counterClockwise
            styles={buildStyles({
              rotation: 0.2,
              strokeLinecap: "round",
              pathColor: color,
              trailColor: "#e0e0e0",
              textSize: "24px",
              pathTransitionDuration: 0.5,
              textColor: "inherit",
            })}
          />
        </div>
        {/* 
        <div className="text-center">
          <p className="text-2xl font-semibold">
            {completedCount}/{totalCount} tarefas
          </p>
          <p className="text-lg text-gray-600">
            {totalCount > 0 ? "concluídas" : "para acompanhar"}
          </p>
        </div> */}
      </div>
    </>
  );
}
