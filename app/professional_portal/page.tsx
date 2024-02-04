import React, { Suspense } from "react";
import Dashboard from "./_components/Dashboard";
import DashboardFilter from "./_components/DashboardFilter";

const page = () => {
  return (
    <div className="relative flex gap-5">
      <Suspense fallback={<p>loading ... </p>}>
        <DashboardFilter />
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
