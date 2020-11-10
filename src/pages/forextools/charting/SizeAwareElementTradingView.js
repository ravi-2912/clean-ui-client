/* eslint-disable no-unused-vars */
import React from 'react'
import Chart from './Chart'
// import StockChart from './Chart2.tsx'
// import { TradingView } from './tv'

class SizeAwareElementTradingView extends React.Component {
    componentDidMount() {
        const { dimensions } = this.props

        const script2 = document.createElement('script')
        script2.type = 'text/javascript'
        script2.innerHTML = `new TradingView.widget({
                width: '${dimensions.width}',
                height: '${dimensions.height}',
                symbol: 'OANDA:EURUSD',
                timezone: 'Etc/UTC',
                theme: 'light',
                style: '0',
                locale: 'uk',
                toolbar_bg: '#f1f3f6',
                enable_publishing: false,
                range: 'YTD',
                hide_side_toolbar: false,
                allow_symbol_change: true,
                details: true,
                hotlist: true,
                calendar: true,
                show_popup_button: true,
                popup_width: '1000',
                popup_height: '650',
                container_id: 'tradingview_2250e'
            });`

        document.body.appendChild(script2)
    }

    render() {
        // const { data, } = this.props
        // return <p>{dimensions.width}</p>
        // return data ? <Chart {...this.props} /> : <p>Loading</p>
        return (
            <div className="tradingview-widget-container h-100">
                <div id="tradingview_2250e" />
                <div classNAme="tradingview-widget-copyright h-100">
                    <a
                        href="https://uk.tradingview.com/symbols/EURUSD/?exchange=OANDA"
                        rel="noopener"
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                    />
                </div>
            </div>
        )
    }
}

export default SizeAwareElementTradingView
