import React from "react";
import Skeleton from "react-loading-skeleton";

function DashboardSkeleton() {
  return (
    <>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 px-2 mt-4">
        <Skeleton height={250} />
        <Skeleton height={250} />
        <Skeleton height={250} />
        <Skeleton height={250} />
      </div>
      <div className="mt-5">
        <Skeleton height={400} />
      </div>
    </>
  );
}

export default DashboardSkeleton;
