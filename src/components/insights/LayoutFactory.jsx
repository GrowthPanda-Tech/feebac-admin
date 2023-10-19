import DefaultLayout from "./layouts/DefaultLayout";
import EighthLayout from "./layouts/EighthLayout";
import FifthLayout from "./layouts/FifthLayout";
import FourthLayout from "./layouts/FourthLayout";
import SeventhLayout from "./layouts/SeventhLayout";
import SixthLayout from "./layouts/SixthLayout";
import ThirdLayout from "./layouts/ThirdLayout";

export default function LayoutFactory({ parent, activeLayout, setPages }) {
    switch (activeLayout) {
        case 1:
            return (
                <DefaultLayout
                    parent={parent}
                    pageType={1}
                    setPages={setPages}
                />
            );

        case 2:
            return (
                <DefaultLayout
                    parent={parent}
                    pageType={2}
                    setPages={setPages}
                />
            );

        case 3:
            return <ThirdLayout parent={parent} setPages={setPages} />;

        case 4:
            return <FourthLayout parent={parent} setPages={setPages} />;

        case 5:
            return <FifthLayout parent={parent} setPages={setPages} />;

        case 6:
            return <SixthLayout parent={parent} setPages={setPages} />;

        case 7:
            return <SeventhLayout parent={parent} setPages={setPages} />;

        case 8:
            return <EighthLayout parent={parent} setPages={setPages} />;

        default:
            break;
    }
}
