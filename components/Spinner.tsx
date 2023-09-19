import React from "react";
import { MoonLoader } from "react-spinners";
import PuffLoader from "react-spinners/PuffLoader";

type props = {
  size?: 18 | number;
};

const Spinner = ({ size }: props) => {
  return (
    <div>
      <MoonLoader color="#F7717D" size={size} />
    </div>
  );
};

export default Spinner;
