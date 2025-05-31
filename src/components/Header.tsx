import { ButtonBack, ButtonNotification } from "./Button";

export default function Header({ text }: { text: string }) {
  return (
    <div className=" py-4 w-full flex items-center justify-between gap-4 font-family-body font-bold text-xl">
      <ButtonBack />

      <div className="flex-1 text-center">
        <h1 className="truncate">{text}</h1>
      </div>

      <ButtonNotification />
    </div>
  );
}
