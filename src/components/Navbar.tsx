import { Home, Calendar, Plus, ClipboardList, User } from "lucide-react";

export default function Navbar() {
  return (
    <aside
      className="text-white bg-[#333333] 
      rounded-t-3xl sm:rounded-none sm:rounded-r-3xl
      w-full sm:w-20 h-16 sm:h-full shadow-lg
      flex sm:flex-col justify-center items-center
      fixed bottom-0 left-0 sm:relative
      px-4 sm:px-0 sm:py-6 gap-15 sm:gap-20 z-40"
    >
      {/* Ícones regulares */}
      <Home
        size={35}
        className="opacity-80 hover:opacity-100 transition-opacity"
      />
      <Calendar
        size={35}
        className="opacity-80 hover:opacity-100 transition-opacity"
      />

      {/* Botão central destacado */}
      <div className="relative -top-6 sm:top-0 sm:-right-4">
        <div
          className="bg-[#333333] text-white p-4 rounded-full 
        shadow-xl transition-all transform 
        border-1 border-white z-50
        w-20 h-20 flex items-center justify-center
        origin-bottom
        sm:origin-left
        hover:w-[95px] hover:h-[95px]
        sm:hover:w-[95px] sm:hover:h-[95px]

        sm:hover:translate-x-0 sm:hover:translate-y-2  /* Move para baixo em desktop */"
        >
          <Plus size={40} />
        </div>
      </div>

      {/* Ícones regulares */}
      <ClipboardList
        size={35}
        className="opacity-80 hover:opacity-100 transition-opacity"
      />
      <User
        size={35}
        className="opacity-80 hover:opacity-100 transition-opacity"
      />
    </aside>
  );
}
