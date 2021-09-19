// - Wrapper for @nivo ResponsivePie

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import ChartProps from "./ChartProps";

export default class Pie extends React.Component {
  render() {
    let data = this.props.data;
    if (data) {
      let dh = {};
      let label;
      data = data.map((d) => {
        label = d.label;
        if (dh[label]) {
          dh[label] += 1;
          label += " (" + dh[label] + ")";
        } else {
          dh[label] = 1;
        }
        return {
          id: "" + label,
          label: "" + label,
          value: d.value,
        };
      });
    }

    return (
      <div className="i-chart" role="contentinfo">
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: "category10" }}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor={{ from: "color" }}
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate
          motionStiffness={90}
          motionDamping={15}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: "#999",
              symbolSize: 18,
              symbolShape: "square",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000",
                  },
                },
              ],
            },
          ]}
        />
      </div>
    );
  }
}

Pie.propTypes = ChartProps.chartProps;
