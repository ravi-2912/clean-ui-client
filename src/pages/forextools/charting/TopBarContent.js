/* eslint-disable no-unused-vars */
import React from 'react'
// import { Col, Row, Menu, Button, Select, Dropdown, message } from 'antd'
import { Row, Col } from 'reactstrap'
import { Button, Select, Dropdown, Menu, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ReactComponent as SettingsSVG } from './svgs/settings.svg'
import { ReactComponent as LayersSVG } from './svgs/layers.svg'
import { ReactComponent as RightPaneSVG } from './svgs/rightpane.svg'
import { ReactComponent as CandlesSVG } from './svgs/charts/candles3.svg'
import { ReactComponent as HeikinAshiSVG } from './svgs/charts/heikinashi.svg'

import './select.scss'
import style from './style.module.scss'

const TobBarContent = () => {
    const { Option } = Select
    const children = []
    for (let i = 10; i < 36; i += 1) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>)
    }

    function handleChange(value) {
        console.log(`selected ${value}`)
    }

    function handleMenuClick(e) {
        message.info('Click on menu item.')
        console.log('click', e)
    }

    const chartMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">
                <Row>
                    <Col>
                        <CandlesSVG />
                    </Col>
                    <Col>Candlestick</Col>
                </Row>
            </Menu.Item>
            <Menu.Item key="2">
                <Row>
                    <Col>
                        <HeikinAshiSVG />
                    </Col>
                    <Col>Heikin Ashi</Col>
                </Row>
            </Menu.Item>
        </Menu>
    )

    return (
        <Row className={style.topbar}>
            <Col style={{ padding: 0, height: '100%' }}>
                <Button
                    style={{
                        height: '100%',
                        borderRadius: 'none',
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                >
                    <SettingsSVG />
                </Button>
                <Button
                    style={{
                        height: '100%',
                        borderRadius: 'none',
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                >
                    <LayersSVG />
                </Button>

                <Select
                    showSearch
                    placeholder="Select a currency"
                    optionFilterProp="children"
                    onChange={handleChange}
                    // bordered={false}
                    // onFocus={onFocus}
                    // onBlur={onBlur}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {children}
                </Select>
                <Dropdown overlay={chartMenu} trigger="click">
                    <Button
                        style={{
                            height: '100%',
                            borderRadius: 'none',
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        <CandlesSVG />

                        <DownOutlined className="align-text-top" />
                    </Button>
                </Dropdown>

                <Button
                    className="float-right"
                    style={{
                        height: '100%',
                        borderRadius: 'none',
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                >
                    <RightPaneSVG />
                </Button>
            </Col>
        </Row>
    )
}

export default TobBarContent
