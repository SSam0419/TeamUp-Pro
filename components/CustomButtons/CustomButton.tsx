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
};

const CustomButton = ({
  action,
  text,
  isLoading,
  type,
  disabled,
  icon,
  variant = "primary",
}: Props) => {
  const buttonClassName =
    variant === "primary"
      ? "bg-primary"
      : variant === "secondary"
      ? "bg-secondary"
      : "";

  return (
    <Button
      className={`${buttonClassName} w-full text-white h-[40px] font-normal px-10 py-2 rounded-2xl flex items-center justify-center gap-2 hover:opacity-80`}
      type={type || "button"}
      isLoading={isLoading}
      disabled={disabled || isLoading || false}
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
