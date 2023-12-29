import pageNotFoundImage from "../../assets/pageNotFound.png";
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <>
      <div className="flex h-auto flex-col items-center justify-center">
        <img
          className="h-auto md:h-[70vh]"
          src={pageNotFoundImage}
          alt="page"
        />
        <Link to="/" className="btn-primary drop-shadow-md">
          Go to Dashboard
        </Link>
      </div>
    </>
  );
}
