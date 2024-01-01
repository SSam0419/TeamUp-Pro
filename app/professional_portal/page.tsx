import React, { Suspense } from "react";
import Dashboard from "./_components/Dashboard";

const page = () => {
  return (
    <div className="relative">
      <Suspense fallback={<p>loading ... </p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
