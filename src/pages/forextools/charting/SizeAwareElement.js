/* eslint-disable no-unused-vars */
import React from 'react'
import Chart from './Chart'

class SizeAwareElement extends React.Component {
    componentDidMount() {
        const script1 = document.createElement('script')
        script1.type = 'text/javascript'
        script1.src = 'https://s3.tradingview.com/tv.js'
        script1.async = true

        document.body.appendChild(script1)
        const script2 = document.createElement('script')
        script2.type = 'text/javascript'
        script2.async = true
        script2.innerHTML =
            "new TradingView.widget({autosize: true, symbol: 'OANDA:EURUSD',timezone: 'Etc/UTC',theme: 'light',style: '0,locale: 'uk',toolbar_bg: '#f1f3f6',enable_publishing: false,range: 'YTD',hide_side_toolbar: false,allow_symbol_change: true,details: true,hotlist: true,calendar: true,show_popup_button: true,popup_width: '1000',popup_height: '650',container_id: 'tradingview_2250e'});"
    }

    render() {
        const { data } = this.props
        // return <p>{dimensions.width}</p>
        // return data ? <Chart {...this.props} /> : <p>Loading</p>
        return (
            <div className="tradingview-widget-container">
                <div id="tradingview_2250e" />
                <div classNAme="tradingview-widget-copyright">
                    <a
                        href="https://uk.tradingview.com/symbols/EURUSD/?exchange=OANDA"
                        rel="noopener"
                        // eslint-disable-next-line react/jsx-no-target-blank
                        target="_blank"
                    >
                        <span className="blue-text">EURUSD Chart</span>
                    </a>{' '}
                    by TradingView
                </div>
            </div>
        )
    }
}

export default SizeAwareElement
