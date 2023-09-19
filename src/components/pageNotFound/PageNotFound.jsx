import pageNotFoundImage from "../../assets/pageNotFound.png";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    return <>
    <div className="flex flex-col justify-center h-auto items-center">
        <img className="h-auto md:h-[70vh]" src={pageNotFoundImage} alt="page" />
        <Link to="/" className="btn-primary drop-shadow-md">
            Go to Dashboard
        </Link>

    </div>
  
    </>;
}
