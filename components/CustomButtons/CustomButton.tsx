import React, { ReactElement } from "react";
import { Button } from "@nextui-org/react";

type Props = {
  action: Function;
  text: string;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: ReactElement | null;
  variant?: "primary" | "secondary";
  style?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
};

const CustomButton = ({
  action,
  text,
  isLoading,
  type,
  disabled,
  icon,
  variant = "primary",
  style = "solid",
}: Props) => {
  return (
    <Button
      className={`w-full h-[40px] font-normal px-10 py-2 rounded-2xl flex items-center justify-center gap-2 hover:opacity-80`}
      type={type || "button"}
      color={variant}
      variant={style}
      isLoading={isLoading}
      isDisabled={disabled || isLoading || false}
      onClick={(e) => action(e)}
    >
      {icon && (
        <div className="flex items-center justify-center gap-2">
          {icon} {text}
        </div>
      )}
      {!icon && text}
    </Button>
  );
};

export default CustomButton;
