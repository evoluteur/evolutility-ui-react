// - Wrapper for @nivo ResponsivePie

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import chartPropTypes from "./chartProps";
import { colors, labelColor, innerLabelColor } from "./chartOptions";

const Pie = ({ data, showLegend = true }) => {
  const pData = data?.map((d) => ({
    id: d.label,
    _id: d.id,
    value: d.value,
  }));
  return (
    <div className="i-chart chart-pie" role="contentinfo">
      <ResponsivePie
        data={pData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padAngle={0.7}
        cornerRadius={3}
        colors={colors}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor={labelColor}
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor={labelColor}
        arcLinkLabelsTextColor={labelColor}
        arcLabelsTextColor={innerLabelColor}
        animate
        motionStiffness={90}
        motionDamping={15}
        legends={
          showLegend && [
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: labelColor,
              symbolSize: 18,
              symbolShape: "square",
            },
          ]
        }
        role="application"
        ariaLabel="Pie chart"
      />
    </div>
  );
};

export default Pie;

Pie.propTypes = chartPropTypes;
