export default function SurveyDetails({ info }) {
    return (
        <>
            {info && (
                <div className="flex flex-col gap-4">
                    <h1 className="heading">{info.survey_title}</h1>
                    <p className="capitalize font-semibold">
                        {info?.category.category_name &&
                            info.category.category_name}
                    </p>
                    <div>
                        <p className="font-semibold">
                            {info.created_date.split(" ")[0]} -{" "}
                            {info.end_date.split(" ")[0]}
                        </p>
                        <p>
                            {info.created_date.split(" ")[1]} -{" "}
                            {info.end_date.split(" ")[1]}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">About Survey</p>
                        <p>{info.survey_description}</p>
                    </div>
                </div>
            )}
        </>
    );
}
