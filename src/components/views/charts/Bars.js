// - Wrapper for @nivo ResponsiveBar

import React from 'react';
import { ResponsiveBar } from '@nivo/bar'
import ChartProps from './ChartProps'

export default class Bars extends React.Component {

    render() {
        let data = this.props.data
        let d2 = {
            _name: ''
        }
        data.forEach(row => {
            d2[row.label] = row.value
        })
        let keys = Object.keys(d2)

        return <div className="i-chart" role="contentinfo">
            <ResponsiveBar
                data={[d2]} 
                keys={keys}
                indexBy="_name"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                colors={{ scheme: 'category10' }}
                groupMode='grouped'
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                axisTop={null}
                axisRight={null}
                axisBottom={null}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }} 
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
                animate={false}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    }
}

Bars.propTypes = ChartProps.props