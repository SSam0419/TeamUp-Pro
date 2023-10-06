import React, { Suspense } from "react";
import Dashboard from "./_components/Dashboard";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>loading ... </p>}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
