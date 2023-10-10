import { Spinner } from "@material-tailwind/react";

export default function LoadingSpinner() {
    return (
        <div className="flex h-full w-full justify-center items-center">
            <Spinner className="h-12 w-12" />
        </div>
    );
}
