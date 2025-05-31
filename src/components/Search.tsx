import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Search({
  setSearching,
  searching,
  setSearchString,
}: {
  setSearching?: Dispatch<SetStateAction<boolean>>;
  searching?: boolean;
  setSearchString: Dispatch<SetStateAction<string>>;
}) {
  const [query, setQuery] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    setSearching && setSearching(true);
    setSearchString(text);
    if (text == "") {
      setSearching && setSearching(false);
    }
  };

  return (
    <div className="flex items-center bg-gray-primary px-4 py-2 rounded-xl shadow-sm w-full">
      <MagnifyingGlassIcon className="h-5 w-5 text-gray-secondary mr-2" />
      <input
        type="text"
        placeholder="Buscar tarefas..."
        className="bg-transparent flex-1 outline-none text-gray-secondary placeholder-gray-secondary text-sm"
        value={query}
        onChange={handleChange}
        onFocus={() => setSearching && setSearching(true)}
      />
      {(searching || query) && (
        <button
          onClick={() => {
            setQuery("");
            setSearching && setSearching(false);
            setSearchString("");
          }}
        >
          <XMarkIcon className="h-5 w-5 text-gray-secondary" />
        </button>
      )}
    </div>
  );
}
