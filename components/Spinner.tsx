import { Spinner as S } from "@nextui-org/react";
import React from "react";
import { MoonLoader } from "react-spinners";
import PuffLoader from "react-spinners/PuffLoader";

type props = {
  size?: 18 | number;
};

const Spinner = ({ size }: props) => {
  return (
    <div className="">
      <MoonLoader color="#6c63ff" size={size} />
    </div>
  );
};

export default Spinner;
