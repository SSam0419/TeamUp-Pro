import React, { ReactNode } from "react";

type props = {
  children: ReactNode;
  onClose: Function;
};

const GlobalPopUp = ({ onClose, children }: props) => {
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 shadow-md rounded"
        onClick={() => {
          onClose();
        }}
      >
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative p-6 flex-auto">
              <div className="my-4 text-slate-500 text-lg leading-relaxed">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default GlobalPopUp;
