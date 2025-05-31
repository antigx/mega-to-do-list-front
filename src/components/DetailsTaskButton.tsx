import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

export default function DetailsTaskButton({ taskId }: { taskId: string }) {
  return (
    <Link
      to={`/tarefa/${taskId}`}
      aria-label="Ver detalhes da tarefa"
      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
      title="Ver detalhes"
    >
      <ChevronDoubleRightIcon className="w-5 h-5 dark:text-gray-100" />
    </Link>
  );
}
