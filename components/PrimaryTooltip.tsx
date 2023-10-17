import { Tooltip } from "@nextui-org/react";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tooltipText: string;
};

const PrimaryTooltip = ({ children, tooltipText }: Props) => {
  return (
    <Tooltip
      content={tooltipText}
      showArrow={true}

      // className="bg-black text-white rounded-lg"
    >
      {children}
    </Tooltip>
  );
};

export default PrimaryTooltip;
