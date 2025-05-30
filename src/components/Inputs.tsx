import type { ChangeEventHandler } from "react";

export function InputSign({
  text,
  type,
  id,
  name,
  placeholder = undefined,
  value,
  onChange,
}: {
  text: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  value?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-sm  font-bold">
        {text}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        className="bg-gray-primary w-full py-2 px-4 border border-gray-400 rounded-xl "
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
