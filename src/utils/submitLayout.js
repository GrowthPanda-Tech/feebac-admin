import swal from "./swal";
import makeRequest from "./makeRequest";

export default async function submitLayout(layout, index, pages, setPages) {
    let route = "insights/add-insights-pages";
    let method = "POST";

    if (layout.id) {
        route = "insights/update-insight-pages";
        method = "PUT";
    }

    try {
        const response = await makeRequest(route, method, layout);

        if (!response.isSuccess) {
            throw new Error(response.message);
        }

        if (layout.id) {
            const updatedPages = [...pages];
            updatedPages[index] = layout;

            setPages(updatedPages);
        } else {
            const updatedPages = [...pages, { ...layout, id: response.data }];

            setPages(updatedPages);
        }

        swal("success", response.message);
    } catch (error) {
        swal("error", error.message);
    }
}
