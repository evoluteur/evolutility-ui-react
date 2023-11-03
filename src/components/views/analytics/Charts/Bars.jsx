// - Wrapper for @nivo ResponsiveBar

import React, { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import chartPropTypes from "./chartProps";
import { colors, labelColor } from "./chartOptions";

const Bars = ({ data, showLegend = true }) => {
  const { cleanData, keys } = useMemo(() => {
    const cleanData = {};
    data.forEach((row) => {
      cleanData[row.label] = row.value;
    });
    return {
      cleanData,
      keys: Object.keys(cleanData),
    };
  }, [data]);

  return (
    <div className="i-chart" role="contentinfo">
      <ResponsiveBar
        data={[cleanData]}
        keys={keys}
        indexBy="label"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={colors}
        groupMode="grouped"
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
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={labelColor}
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
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]
        }
        animate={false}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default Bars;

Bars.propTypes = chartPropTypes;
