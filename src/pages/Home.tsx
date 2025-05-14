import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="h-100vh text-center font-family-heading flex flex-col items-center justify-evenly w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="w-80 text-8xl">Task Master</h1>
        <p className="my-6 mx-9 italic text-3xl font-thin">
          Organize suas ideias, priorize seu tempo e aumente sua produtividade.
          Sua vida organizada em um só lugar!
        </p>
      </div>
      <Link
        to="/login"
        className="bg-gray-secondary rounded-xl border-2 border-white text-white px-6 py-4 text-4xl" // Tamanho maior (24px)
      >
        Entrar →
      </Link>
      <Link
        title="Temporario até gerenciar usuários"
        to="/dash"
        className="fixed bottom-0 right-0 m-4 bg-gray-secondary rounded-xl border-2 border-white text-white px-6 py-4 text-1xl"
      >
        Temp. Dash
      </Link>
    </div>
  );
}
