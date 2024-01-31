import makeRequest from "./makeRequest";
import swal from "./swal";

export async function surveyActions({ type, surveyId, setLoading, navigate }) {
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

const BASE_URL = import.meta.env.VITE_BASE_URL;
const AUTH_TOKEN = localStorage.getItem("authToken");

export async function handleDownload({ id, setLoading }) {
  setLoading(true);

  try {
    const response = await fetch(
      `${BASE_URL}/site-admin/download-response?surveyId=${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }

    const blob = await response.blob();

    const a = document.createElement("a");
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = `${id}.xlsx`;
    a.click();
  } catch (error) {
    swal("error", error.message);
  } finally {
    setLoading(false);
  }
}
