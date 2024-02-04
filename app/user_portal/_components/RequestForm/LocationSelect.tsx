import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

type props = {
  setLocation: Function;
  baseLocationOptions: string[];
};

const LocationDropdown = ({ setLocation, baseLocationOptions }: props) => {
  return (
    <Select
      label="Base location"
      placeholder="Select a base location"
      className=""
      isRequired
      onChange={(location) => setLocation(location.target.value)}
    >
      {baseLocationOptions.map((location) => (
        <SelectItem key={location} value={location}>
          {location}
        </SelectItem>
      ))}
    </Select>
  );
};

export default LocationDropdown;
