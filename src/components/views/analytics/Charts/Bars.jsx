// - Wrapper for @nivo ResponsiveBar

import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import chartPropTypes from "./chartProps";
import { colors, labelColor, innerLabelColor } from "./chartOptions";

const theme = {
  axis: {
    ticks: { text: { fill: labelColor } },
  },
};

const Bars = ({ data, showLegend = true }) => {
  const { cleanData, keys } = useMemo(() => {
    const cleanData = {};
    data.forEach((row) => {
      cleanData[row.label] = row.value;
    });
    cleanData["_"] = "";
    return {
      cleanData,
      keys: Object.keys(cleanData),
    };
  }, [data]);

  return (
    <div className="i-chart chart-bars" role="contentinfo">
      <ResponsiveBar
        data={[cleanData]}
        keys={keys}
        indexBy="_"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        colors={colors}
        groupMode="grouped"
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -40,
          labelTextColor: innerLabelColor,
        }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        innerPadding={5}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={innerLabelColor}
        legends={
          showLegend && [
            {
              dataFrom: "keys",
              anchor: "bottom-right",
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
              itemTextColor: labelColor,
            },
          ]
        }
        theme={theme}
        animate={false}
        motionStiffness={90}
        motionDamping={15}
        role="application"
        ariaLabel="Bar chart"
      />
      <div className="label-patch"></div>
    </div>
  );
};

export default Bars;

Bars.propTypes = chartPropTypes;
