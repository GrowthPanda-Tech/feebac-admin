import DefaultLayout from "./layouts/DefaultLayout";
import EighthLayout from "./layouts/EighthLayout";
import FifthLayout from "./layouts/FifthLayout";
import FourthLayout from "./layouts/FourthLayout";
import SeventhLayout from "./layouts/SeventhLayout";
import SixthLayout from "./layouts/SixthLayout";
import ThirdLayout from "./layouts/ThirdLayout";

export default function LayoutFactory({ parent, activeLayout }) {
    switch (activeLayout) {
        case 1:
            return <DefaultLayout parent={parent} pageType={1} />;

        case 2:
            return <DefaultLayout parent={parent} pageType={2} />;

        case 3:
            return <ThirdLayout parent={parent} />;

        case 4:
            return <FourthLayout parent={parent} />;

        case 5:
            return <FifthLayout parent={parent} />;

        case 6:
            return <SixthLayout parent={parent} />;

        case 7:
            return <SeventhLayout parent={parent} />;

        case 8:
            return <EighthLayout parent={parent} />;

        default:
            break;
    }
}
