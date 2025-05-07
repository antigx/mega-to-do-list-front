import { Home, Calendar, Plus, ClipboardList, User } from "lucide-react";

export default function Navbar() {
  return (
<aside className="text-gray-100 sm:text-gray-700 bg-gray-600 sm:bg-gray-primary 
  rounded-t-3xl sm:rounded-none sm:rounded-tr-3xl sm:rounded-br-3xl
  w-full min-w-[400px] sm:min-w-0 sm:w-20 h-14 sm:h-auto shadow-md flex sm:flex-col gap-10 
  justify-center items-center sm:py-4 sm:my-2 fixed bottom-0 left-0 
  sm:relative sm:bottom-auto sm:left-auto">
  <Home size={40} className="icon-hover" />
  <Calendar size={40} className="icon-hover" />
  <div className="bg-black text-white p-2 rounded-full icon-hover">
    <Plus size={40}/>
  </div>
  <ClipboardList size={40} className="icon-hover" />
  <User size={40} className="icon-hover" />
</aside>

  );
}
