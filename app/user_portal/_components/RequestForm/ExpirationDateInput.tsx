import { Input } from "@nextui-org/react";
import React from "react";

type props = {
  daysUntilExpiration: number;
  setDaysUntilExpiration: Function;
};

const ExpirationDateInput = ({
  daysUntilExpiration,
  setDaysUntilExpiration,
}: props) => {
  return (
    <Input
      value={daysUntilExpiration.toString()}
      onChange={(e) => setDaysUntilExpiration(e.target.value)}
      label="Expired After"
      variant="flat"
      placeholder="the request will expired after .."
      endContent={<p>Days</p>}
    />
  );
};

export default ExpirationDateInput;
