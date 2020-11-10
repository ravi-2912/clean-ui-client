/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import PropTypes from 'prop-types'

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { scaleTime, scaleLinear } from 'd3-scale'

import { ChartCanvas, Chart, ZoomButtons } from 'react-stockcharts'
import { BarSeries, CandlestickSeries } from 'react-stockcharts/lib/series'
import { XAxis, YAxis } from 'react-stockcharts/lib/axes'
import {
    CrossHairCursor,
    Cursor,
    MouseCoordinateX,
    MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates'

import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale'
import { OHLCTooltip } from 'react-stockcharts/lib/tooltip'
// eslint-disable-next-line no-unused-vars
import { fitWidth, fitDimensions } from 'react-stockcharts/lib/helper'
import { last } from 'react-stockcharts/lib/utils'
// import { configConsumerProps } from 'antd/lib/config-provider'

class CandleStickChartWithZoomPan extends React.Component {
    constructor(props) {
        super(props)
        this.saveNode = this.saveNode.bind(this)
        this.resetYDomain = this.resetYDomain.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    componentWillMount() {
        this.setState({
            suffix: 1,
        })
    }

    saveNode(node) {
        this.node = node
    }

    resetYDomain() {
        this.node.resetYDomain()
    }

    handleReset() {
        this.setState({
            suffix: this.state.suffix + 1,
        })
    }

    render() {
        const type = 'hybrid'
        const ratio = 1

        // eslint-disable-next-line no-unused-vars
        const { cursor } = this.props

        let { height } = this.props
        height = height !== null && height > 200 ? height : 200
        let { width } = this.props
        width = width !== null && width > 200 ? width : 200

        const { mouseMoveEvent, panEvent, zoomEvent, zoomAnchor } = this.props
        const { clamp } = this.props

        const { data: initialData } = this.props

        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(d => d.date)
        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(initialData)

        const start = xAccessor(last(data))
        const end = xAccessor(data[Math.max(0, data.length - 150)])
        const xExtents = [start + 50, end]

        const xAccessor2 = d => d.date
        const start2 = xAccessor2(last(data))
        const end2 = xAccessor2(data[Math.max(0, data.length - 150)])
        const xExtents2 = [start2, end2]

        console.log(scaleTime().domain())

        const margin = { left: 70, right: 70, top: 50, bottom: 70 }

        // const height = 400

        const gridHeight = height - margin.top - margin.bottom
        const gridWidth = width - margin.left - margin.right

        const showGrid = true
        const yGrid = showGrid ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.2 } : {}
        const xGrid = {
            innerTickSize: -1 * gridHeight,
            tickStrokeOpacity: 0.2,
        }

        return (
            <ChartCanvas
                ref={this.saveNode}
                height={height}
                ratio={ratio}
                width={width}
                margin={margin}
                mouseMoveEvent={mouseMoveEvent}
                panEvent={panEvent}
                zoomEvent={zoomEvent}
                clamp={clamp}
                zoomAnchor={zoomAnchor}
                type={type}
                seriesName={`MSFT_${this.state.suffix}`}
                data={data}
                xScale={xScale}
                xExtents={xExtents}
                xAccessor={xAccessor}
                displayXAccessor={displayXAccessor}
            >
                <Chart id={1} yExtents={d => [d.high, d.low]}>
                    <XAxis axisAt="top" orient="top" zoomEnabled={zoomEvent} flexTicks />
                    <XAxis axisAt="bottom" orient="bottom" zoomEnabled={zoomEvent} {...xGrid} />
                    <YAxis
                        axisAt="right"
                        orient="right"
                        ticks={10}
                        {...yGrid}
                        zoomEnabled={zoomEvent}
                        stroke="#000"
                        tickStroke="#000"
                    />

                    <MouseCoordinateY at="right" orient="right" displayFormat={format('.2f')} />

                    <CandlestickSeries />
                    <OHLCTooltip origin={[-40, 0]} />
                    <ZoomButtons onReset={this.handleReset} />
                </Chart>
                {/* <Chart id={2} yExtents={d => d.volume} height={150} origin={(w, h) => [0, h - 150]}>
                    <YAxis
                        axisAt="left"
                        orient="left"
                        ticks={5}
                        tickFormat={format('.2s')}
                        zoomEnabled={zoomEvent}
                    />

                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={timeFormat('%Y-%m-%d')}
                    />
                    <MouseCoordinateY at="left" orient="left" displayFormat={format('.4s')} />

                    <BarSeries
                        yAccessor={d => d.volume}
                        fill={d => (d.close > d.open ? '#6BA583' : '#FF0000')}
                    />
                </Chart> */}
                <CrossHairCursor />
            </ChartCanvas>
        )
    }
}

CandleStickChartWithZoomPan.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

CandleStickChartWithZoomPan.defaultProps = {
    mouseMoveEvent: true,
    panEvent: true,
    zoomEvent: true,
    clamp: false,
}

// eslint-disable-next-line no-class-assign
CandleStickChartWithZoomPan = fitDimensions(CandleStickChartWithZoomPan)

export default CandleStickChartWithZoomPan
