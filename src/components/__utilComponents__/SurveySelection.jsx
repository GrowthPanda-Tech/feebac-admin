import useFetch from "@/hooks/useFetch";

export default function SurveySelection({ survey, setter }) {
  const { fetchedData } = useFetch(
    "site-admin/get-all-survey?time=live&page=1&count=100",
  );

  const handleChange = (e) => {
    setter((prev) => ({ ...prev, survey: e.target.value }));
  };

  return (
    <label className="flex w-1/3 flex-col gap-4">
      <span className="text-lg font-semibold capitalize">
        Attach a Survey (Optional)
      </span>
      <select
        name="survey"
        value={survey}
        onChange={handleChange}
        className="appearance-none rounded-xl border border-[#1D1D1D] bg-white px-10 py-5 capitalize"
      >
        <option value={""}>Select a survey</option>
        {fetchedData?.data.map(({ survey_id, survey_title }) => (
          <option key={survey_id} value={survey_id}>
            {survey_title}
          </option>
        ))}
      </select>
    </label>
  );
}
