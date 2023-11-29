import Skeleton from "react-loading-skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-4 gap-6">
        <Skeleton height={250} className="rounded-lg" />
        <Skeleton height={250} className="rounded-lg" />
        <Skeleton height={250} className="rounded-lg" />
        <Skeleton height={250} className="rounded-lg" />
      </div>

      <div>
        <Skeleton height={400} />
      </div>
    </div>
  );
}
