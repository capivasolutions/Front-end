import React from "react";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

export const ParallelChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fraudulentData = data.filter(
    (transaction) => transaction.classification === "FRAUDULENT"
  );
  const genuineData = data.filter(
    (transaction) => transaction.classification === "GENUINE"
  );
  const filteredData = [
    ...genuineData.slice(0, 200),
    ...fraudulentData.slice(0, 1),
  ];

  const chartColors = filteredData.map((item) => {
    if (item.classification === "FRAUDULENT") return colors.blueAccent[500];
    else return colors.greenAccent[500];
  });

  return (
    <ResponsiveParallelCoordinates
      data={filteredData}
      variables={[
        { key: "v1", type: "linear" },
        { key: "v2", type: "linear" },
        { key: "v3", type: "linear" },
        { key: "v4", type: "linear" },
        { key: "v5", type: "linear" },
      ]}
      curve="monotoneX"
      colors={chartColors}
      margin={{ top: 50, right: 80, bottom: 50, left: 50 }}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 60,
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
};
