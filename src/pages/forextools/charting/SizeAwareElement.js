/* eslint-disable no-unused-vars */
import React from 'react'
import Chart from './Chart'
import StockChart from './Chart2'

class SizeAwareElement extends React.Component {
    render() {
        const { data } = this.props
        // return <p>{dimensions.width}</p>
        return data ? <StockChart /> : <p>Loading</p>
        // return data ? <Chart {...this.props} /> : <p>Loading</p>
    }
}

export default SizeAwareElement
