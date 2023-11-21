import { Spinner } from "@material-tailwind/react";

export default function LoadingSpinner({ size = 12 }) {
  return (
    <div className="flex leading-5 h-full w-full justify-center items-center">
      <Spinner className={`w-${size} h-${size}`} />
    </div>
  );
}
