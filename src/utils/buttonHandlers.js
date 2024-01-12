import makeRequest from "./makeRequest";
import swal from "./swal";

export async function surveyActions(type, surveyId, setLoading, navigate) {
  const route = "survey/start-survey";
  const method = "PATCH";
  const request = {
    surveyId: surveyId,
    isStartNow: type === "schedule" ? false : type === "publish" ? true : null,
  };

  setLoading((prev) => ({ ...prev, [type]: true }));

  try {
    const response = await makeRequest(route, method, request);
    if (!response.isSuccess) throw new Error(response.message);

    swal("success", response.message);
    navigate("/survey");
  } catch (error) {
    swal("error", error.message);
  } finally {
    setLoading((prev) => ({ ...prev, [type]: false }));
  }
}
