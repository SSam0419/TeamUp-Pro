import { Chip } from "@nextui-org/react";
import React from "react";

const StatusChip = ({
  status,
}: {
  status: "Active" | "Expired" | "Cancelled" | "Hired";
}) => {
  let color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger" = "default";
  switch (status) {
    case "Active":
      color = "primary";
      break;
    case "Expired":
      color = "warning";
      break;
    case "Cancelled":
      color = "danger";
      break;
    case "Hired":
      color = "success";
  }
  return (
    <Chip color={color} className="text-white">
      {status}
    </Chip>
  );
};

export default StatusChip;
