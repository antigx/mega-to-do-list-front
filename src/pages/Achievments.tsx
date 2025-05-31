import Header from "../components/Header";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Achievments() {
  return (
    <>
      <Header text={"Conquistas"} />
      <div className="flex flex-col items-center justify-center text-center gap-6 py-20 px-4">
        <WrenchScrewdriverIcon className="w-20 h-20 text-gray-400" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Página em construção
        </h2>
        <p className="text-gray-500 max-w-md">
          Estamos trabalhando para trazer suas conquistas em breve. Fique
          ligado!
        </p>
        <Link to="/dash">
          <Button text="Voltar para o início" />
        </Link>
      </div>
    </>
  );
}
