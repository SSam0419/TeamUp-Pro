import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

type props = {
  setWorkmode: Function;
};

export default function WorkModeSelect({ setWorkmode }: props) {
  const options = ["Remote Only", "On Site Only", "Hybrid"];
  return (
    <Select
      isRequired
      label="Collaboration Mode"
      placeholder="Select a collaboration mode"
      className=""
      onChange={(mode) => setWorkmode(mode.target.value)}
    >
      {options.map((model) => (
        <SelectItem key={model} value={model}>
          {model}
        </SelectItem>
      ))}
    </Select>
  );
}
