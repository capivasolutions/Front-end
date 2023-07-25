import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const LineChart = ({
  data = [],
  isCustomLineColors = false,
  isDashboard = false,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const aggregateDataByTime = (transactions) => {
    // Sort transactions by created_at time
    const sortedTransactions = transactions.sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );

    // Create a new map to aggregate data by time
    const aggregatedData = new Map();

    sortedTransactions.forEach((transaction) => {
      const timeKey = new Date(transaction.created_at).toLocaleTimeString();
      const existingData = aggregatedData.get(timeKey) || {
        time: timeKey,
        fraudAmount: 0,
        normalAmount: 0,
      };

      if (transaction.classification === "GENUINE") {
        existingData.normalAmount += transaction.amount;
      } else if (transaction.classification === "FRAUDULENT") {
        existingData.fraudAmount += transaction.amount;
      }

      aggregatedData.set(timeKey, existingData);
    });

    // Return an array of aggregated data objects
    return Array.from(aggregatedData.values());
  };

  const getFormattedData = () => {
    /* if (loading || error || !data || data.length === 0) {
      return []; // Return empty data when loading, error, no data, or empty data array
    } */

    // Slice the last 10 transactions from the data array
    const lastTenTransactions = data.slice(-10);

    const aggregatedData = aggregateDataByTime(lastTenTransactions);

    const normalData = {
      id: "Normal",
      color: tokens("dark").blueAccent[300],
      data: aggregatedData.map((entry) => ({
        x: entry.time,
        y: entry.normalAmount,
      })),
    };

    const fraudData = {
      id: "Fraude",
      color: tokens("dark").greenAccent[500],
      data: aggregatedData.map((entry) => ({
        x: entry.time,
        y: entry.fraudAmount,
      })),
    };

    return [fraudData, normalData];
  };
  const dataNew = getFormattedData();
  /* console.log(dataNew) */

  return (
    <ResponsiveLine
      data={dataNew}
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
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
