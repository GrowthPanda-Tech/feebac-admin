import { Spinner } from "@material-tailwind/react";

export default function LoadingSpinner({ size = 12 }) {
  return (
    <div className="flex h-full w-full items-center justify-center leading-5">
      <Spinner className={`w-${size} h-${size}`} />
    </div>
  );
}
