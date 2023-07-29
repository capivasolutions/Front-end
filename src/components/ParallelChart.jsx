import React from "react";
import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";
import {Box, Typography, useTheme} from "@mui/material";
import { tokens } from "../theme";

export const ParallelChart = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const chartColors = data.map((item) => {
    if (item.classification === "FRAUDULENT") return colors.blueAccent[400];
    else return colors.greenAccent[500];
  });
  const axes = [
    { key: "v17", type: "linear" },
    { key: "v14", type: "linear" },
    { key: "v12", type: "linear" },
    { key: "v10", type: "linear" },
    { key: "v16", type: "linear" },
    { key: "v11", type: "linear" },
    { key: "v9", type: "linear" },
    { key: "v4", type: "linear" },
    { key: "v18", type: "linear" },
    { key: "v7", type: "linear" },
  ];

  const labels = axes.map(({ key }) => key);
  console.log(labels);

  return (
    <Box width="100%" height="100%" position="relative">
      <Box
        position="absolute"
        bottom={20}
        left={0}
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
        paddingLeft={6}
        paddingRight={9}
      >
        {labels.map((label) => <Typography>{label}</Typography>)}
      </Box>
      <ResponsiveParallelCoordinates
          data={data}
          variables={axes}
          curve="monotoneX"
          colors={chartColors}
          lineWidth={10}
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
          lineOpacity={0.50}
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
    </Box>
  );
};
