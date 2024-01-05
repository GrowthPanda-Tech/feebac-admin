import { useState } from "react";
import { useNavigate } from "react-router-dom";

import makeRequest from "@/utils/makeRequest";
import swal from "@/utils/swal";

export default function SubmitButton({ data }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const formdata = new FormData();

    //TODO: refactor
    if (data.id) formdata.append("id", data.id);

    if (data.survey && data.survey !== "")
      formdata.append("survey", data.survey);

    if (data.image instanceof File) formdata.append("image", data.image);

    if (data.id && data.remove_page.length > 0)
      formdata.append("remove_page", data.remove_page);

    //only appends files ensuring create and edit aren't affected
    data.pages
      .filter(({ element }) => element instanceof File)
      .forEach((file) => {
        formdata.append("pages", file);
      });

    const route = data.id
      ? "insights/update-insights"
      : "insights/create-insights";
    const method = data.id ? "PUT" : "POST";

    setLoading(true);

    try {
      const response = await makeRequest(route, method, formdata);
      if (!response.isSuccess) throw new Error(response.message);

      swal("success", response.message);
      navigate("/insights");
    } catch (error) {
      swal("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn-primary disabled:btn-secondary w-fit"
      type="submit"
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? "Submitting..." : "Submit"}
    </button>
  );
}
