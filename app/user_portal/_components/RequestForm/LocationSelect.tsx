import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

const locations = [
  { value: "Tokyo", label: "Tokyo" },
  { value: "Beijing", label: "Beijing" },
  { value: "Seoul", label: "Seoul" },
  { value: "Bangkok", label: "Bangkok" },
];

type props = {
  setLocation: Function;
};

const LocationDropdown = ({ setLocation }: props) => {
  return (
    <Select
      label="Base location"
      placeholder="Select a base location"
      className=""
      isRequired
      onChange={(location) => setLocation(location.target.value)}
    >
      {locations.map((location) => (
        <SelectItem key={location.value} value={location.value}>
          {location.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default LocationDropdown;
