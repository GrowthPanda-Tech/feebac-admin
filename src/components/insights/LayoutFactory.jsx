import { useContext } from "react";
import { PageContext } from "../../contexts/InsightPageContext";

import DefaultLayout from "./layoutComponents/DefaultLayout";
import ThirdLayout from "./layoutComponents/ThirdLayout";
// import FourthLayout from "./layoutComponents/FourthLayout";
// import FifthLayout from "./layoutComponents/FifthLayout";
// import SixthLayout from "./layoutComponents/SixthLayout";
// import SeventhLayout from "./layoutComponents/SeventhLayout";
// import EighthLayout from "./layoutComponents/EighthLayout";

export default function LayoutFactory() {
    const { state } = useContext(PageContext);

    switch (state.pageType) {
        case 1:
            return <DefaultLayout pageType={1} />;

        case 2:
            return <DefaultLayout pageType={2} />;

        case 3:
            return <ThirdLayout />;

        // case 4:
        //     return <FourthLayout />;
        //
        // case 5:
        //     return <FifthLayout />;
        //
        // case 6:
        //     return <SixthLayout />;
        //
        // case 7:
        //     return <SeventhLayout />;
        //
        // case 8:
        //     return <EighthLayout />;

        default:
            return null;
    }
}
