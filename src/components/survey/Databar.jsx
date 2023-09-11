import { ResponsiveBar } from "@nivo/bar";
import { mockAgeData as data } from "./mockSurveyAgeData";

const MyResponsiveBar = ({}) => (
    <ResponsiveBar
        data={data}
        keys={["male", "female"]}
        indexBy="age"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.5}
        innerPadding={1}
        groupMode="grouped"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "red_blue" }}
        defs={[
            {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        borderColor={{
            from: "color",
            modifiers: [["darker", "1.1"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Age Group",
            legendPosition: "middle",
            legendOffset: 32,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={21}
        labelTextColor={{ theme: "background" }}
        legends={[
            {
                dataFrom: "keys",
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: "hover",
                        style: {
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
    />
);

export default MyResponsiveBar;
