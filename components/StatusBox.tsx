import React from "react";

type props = {
  status: "Active" | "Cancelled" | "Hired";
};

const StatusBox = ({ status }: props) => {
  return <div>StatusBox</div>;
};

export default StatusBox;
