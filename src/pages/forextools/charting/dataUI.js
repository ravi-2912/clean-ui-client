/* eslint-disable no-unused-vars */
import React from 'react'
import { ReactComponent as CandlesSVG } from './svgs/charts/candles3.svg'
import { ReactComponent as HeikinAshiSVG } from './svgs/charts/heikinashi.svg'
import { ReactComponent as LineChartSVG } from './svgs/charts/line2.svg'
import { ReactComponent as AreaChartSVG } from './svgs/charts/area2.svg'
import { ReactComponent as DotSVG } from './svgs/cursors/dot.svg'
import { ReactComponent as CrossSVG } from './svgs/cursors/crosshair.svg'
import { ReactComponent as CrossToolSVG } from './svgs/cursors/crosshair-tooltip.svg'
import { ReactComponent as ArrowSVG } from './svgs/cursors/arrow.svg'
import { ReactComponent as ArrowToolSVG } from './svgs/cursors/arrow-tooltip.svg'
import { ReactComponent as EraserSVG } from './svgs/cursors/eraser.svg'
import { ReactComponent as MeasureSVG } from './svgs/cursors/measure2.svg'
import { ReactComponent as LineArrowSVG } from './svgs/lines/arrow.svg'
import { ReactComponent as LineSVG } from './svgs/lines/line.svg'
import { ReactComponent as LineHorizontalSVG } from './svgs/lines/horizontal-line.svg'
import { ReactComponent as LineHorizontalRaySVG } from './svgs/lines/horizontal-ray.svg'
import { ReactComponent as LineVerticalSVG } from './svgs/lines/vertical-line.svg'
import { ReactComponent as LineParallelChannelSVG } from './svgs/lines/parallel-channel.svg'

export const granularities = {
    M1: { text: '1 minute' },
    M2: { text: '2 minutes' },
    M5: { text: '5 minutes' },
    M10: { text: '10 minutes' },
    M15: { text: '15 minutes' },
    M30: { text: '30 minutes' },
    H1: { text: '1 hour' },
    H2: { text: '2 hours' },
    H4: { text: '4 hours' },
    H6: { text: '6 hours' },
    H8: { text: '8 hours' },
    D: { text: 'Daily' },
    W: { text: 'Weekly' },
    MN: { text: 'Monthly' },
}

export const chartTypes = {
    candles: {
        text: 'Candlestick',
        icon: props => <CandlesSVG {...props} />,
    },

    heikinashi: {
        text: 'Heikin Ashi',
        icon: props => <HeikinAshiSVG {...props} />,
    },

    line: {
        text: 'Line',
        icon: props => <LineChartSVG {...props} />,
    },

    area: {
        text: 'Area',
        icon: props => <AreaChartSVG {...props} />,
    },
}

export const pointerTypes = {
    dot: { text: 'Dot', icon: props => <DotSVG {...props} /> },
    arrow: { text: 'Arrow', icon: props => <ArrowSVG {...props} /> },
    arrowTool: { text: 'Arrow Tooltip', icon: props => <ArrowToolSVG {...props} /> },
    cross: { text: 'Crosshair', icon: props => <CrossSVG {...props} /> },
    crossTool: { text: 'Crosshair Tooltip', icon: props => <CrossToolSVG {...props} /> },
    divider: {},
    eraser: { text: 'Eraser', icon: props => <EraserSVG {...props} /> },
    measure: { text: 'Measure', icon: props => <MeasureSVG {...props} /> },
}

export const selectStyles = (height = 37, border = false) => ({
    container: (provided, state) => ({
        ...provided,
        height,
        // border: 'none',
    }),
    control: (provided, state) => ({
        ...provided,
        maxHeight: height,
        minHeight: height,
        border: !border && 'none',
    }),
    valueContainer: (provided, state) => ({
        ...provided,
        maxHeight: height - 2,
        minHeight: height - 2,
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        maxHeight: height - 2,
        minHeight: height - 2,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: '#595c97',
    }),
    option: (provided, state) => ({
        ...provided,
        color: '#595c97',
    }),
})

export const selectTheme = theme => ({
    ...theme,
    borderRadius: 0,
    border: 'none',

    colors: {
        ...theme.colors,
        primary: '#d9dee9',
        primary25: '#e4e9f0',
        primary50: '#e4e9f0',
    },
})

export const lineTypes = {
    line: { text: 'Arrow', icon: props => <LineSVG {...props} /> },
    arrow: {
        text: 'Arrow',
        icon: props => <LineArrowSVG {...props} />,
    },
    vertical: {
        text: 'Vertical Line',
        icon: props => <LineVerticalSVG {...props} />,
    },
    horizontal: {
        text: 'Horizontal Line',
        icon: props => <LineHorizontalSVG {...props} />,
    },
    horizontalRay: {
        text: 'Horizontal Ray',
        icon: props => <LineHorizontalRaySVG {...props} />,
    },
    parallelChannel: {
        text: 'Parallel Channel',
        icon: props => <LineParallelChannelSVG {...props} />,
    },
}

export const smallIconStyle = {
    height: 22,
    width: 22,
    className: 'align-middle',
}
