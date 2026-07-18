// - Wrapper for @nivo ResponsivePie

import { ResponsivePie } from "@nivo/pie";
import type { ChartCommonProps } from "./chartProps";
import { colors, labelColor, innerLabelColor } from "./chartOptions";

const Pie = ({ data = [], showLegend = true }: ChartCommonProps) => {
  const pData =
    data?.map((d) => ({
      id: d.label,
      _id: d.id,
      value: d.value,
    })) || [];
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
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={labelColor}
        arcLinkLabelsOffset={0}
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsStraightLength={24}
        arcLinkLabelsThickness={1}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={innerLabelColor}
        animate
        motionConfig="stiff"
        legends={
          showLegend
            ? [
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
            : []
        }
        role="application"
      />
    </div>
  );
};

export default Pie;
