import { GithubPicker, type ColorResult } from "react-color";
import { type Dispatch, type SetStateAction } from "react";

interface Props {
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  setShowColorPicker: Dispatch<SetStateAction<boolean>>;
}

export function ColorPicker({ color, setColor, setShowColorPicker }: Props) {
  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    setShowColorPicker(false);
  };

  return (
    <GithubPicker
      color={color}
      onChange={handleChange}
      triangle="top-right"
      width={"212px"}
      className="relative right-45 top-3 z-1 "
    />
  );
}
