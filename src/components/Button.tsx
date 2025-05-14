import type { MouseEventHandler } from "react";

export default function Button({
    text,
    handleClick = undefined,
}: {
    text: string;
    handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
    return (
        <button
            type="submit"
            onClick={handleClick}
            className="
                bg-gray-secondary 
                font-family-body 
                text-white 
                text-lg 
                py-2 
                px-6 
                my-4 
                rounded-xl
                shadow-md 
                hover:shadow-lg 
                transition-all 
                duration-200 
                hover:bg-opacity-90 
                w-full 
                max-w-[200px]
                focus:outline-none
                focus:ring-2
                focus:ring-gray-400
                active:scale-[0.98]
            "
        >
            {text}
        </button>
    );
}
