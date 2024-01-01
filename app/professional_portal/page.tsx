import React, { Suspense } from "react";
import Dashboard from "./_components/Dashboard";
import DashboardFilter from "./_components/DashboardFilter";

const page = () => {
  return (
    <div className="relative">
      <Suspense fallback={<p>loading ... </p>}>
        <DashboardFilter />
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default page;
