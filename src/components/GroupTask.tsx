import GroupTaskCard from "./GroupTaskCard";

export default function GroupTask() {
  const groupTasks = [
    {
      name: "Trabalho",
      nTasks: 5,
      color: "#FF5733",
      percentage: 80,
    },
    {
      name: "Estudos",
      nTasks: 3,
      color: "#33C1FF",
      percentage: 60,
    },
    {
      name: "Saúde",
      nTasks: 1,
      color: "#28A745",
      percentage: 100,
    },
  ];
  return (
    <div className="container my-2">
      <h2 className="text-xl font-semibold">Tarefas em Grupos</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {groupTasks.map((task, index) => (
          <GroupTaskCard
            key={index}
            name={task.name}
            nTasks={task.nTasks}
            color={task.color}
            percentage={task.percentage}
          />
        ))}
      </div>
    </div>
  );
}
