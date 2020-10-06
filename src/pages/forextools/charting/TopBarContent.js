/* eslint-disable no-unused-vars */
import React from 'react'
// import { Col, Row, Menu, Button, Select, Dropdown, message } from 'antd'
import { Row, Col } from 'reactstrap'
import { Button, Select, Dropdown, Menu, message } from 'antd'
import { ReactComponent as SettingsSVG } from './svgs/settings.svg'
import { ReactComponent as LayersSVG } from './svgs/layers.svg'
import { ReactComponent as RightPaneSVG } from './svgs/rightpane.svg'
import { ReactComponent as CandlesSVG } from './svgs/charts/candles1.svg'
import { ReactComponent as HeikinAshiSVG } from './svgs/charts/heikinashi.svg'
import { ReactComponent as ToolSVG } from './svgs/tool.svg'
import { ReactComponent as IndicatorSVG } from './svgs/indicator.svg'
import { ReactComponent as PencilSVG } from './svgs/pencil.svg'
import { ReactComponent as CaratSVG } from './svgs/carat.svg'

import './select.scss'
import style from './style.module.scss'

const TobBarContent = props => {
    const { breakpoint } = props
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

    const chartMenu = () => {
        const iconSize = 28
        const menuHeight = iconSize + 10
        return (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1" style={{ height: menuHeight }}>
                    <CandlesSVG height={iconSize} width={iconSize} className="align-middle" />
                    <div className="d-inline h100 align-middle ml-3">Candlestick</div>
                </Menu.Item>
                <Menu.Item key="2" style={{ height: menuHeight }}>
                    <HeikinAshiSVG height={iconSize} width={iconSize} className="align-middle" />
                    <div className="d-inline h100 align-middle ml-3">Heikin Ashi</div>
                </Menu.Item>
            </Menu>
        )
    }

    const timeMenu = () => {
        const iconSize = 28
        const menuHeight = iconSize + 10
        return (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1" style={{ height: menuHeight }}>
                    H1&nbsp;&nbsp; 1 hour
                    {/* <div className="d-inline h100 align-middle ml-3">Candlestick</div> */}
                </Menu.Item>
                <Menu.Item key="2" style={{ height: menuHeight }}>
                    H2&nbsp;&nbsp; 2 hour
                    {/* <div className="d-inline h100 align-middle ml-3">Heikin Ashi</div> */}
                </Menu.Item>
            </Menu>
        )
    }

    const { rightPane, leftPane } = props

    const toolMenu = () => {
        const iconSize = 28
        const menuHeight = iconSize + 10
        return (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1" style={{ height: menuHeight }} onClick={leftPane}>
                    <SettingsSVG height={iconSize} width={iconSize} className="align-middle" />
                    <div className="d-inline h100 align-middle ml-3">Settings</div>
                </Menu.Item>
                <Menu.Item key="2" style={{ height: menuHeight }} onClick={leftPane}>
                    <LayersSVG height={iconSize} width={iconSize} className="align-middle" />
                    <div className="d-inline h100 align-middle ml-3">Layers</div>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3" style={{ height: menuHeight }} onClick={leftPane}>
                    <PencilSVG height={iconSize} width={iconSize} className="align-middle" />
                    <div className="d-inline h100 align-middle ml-3">Drawings</div>
                </Menu.Item>
            </Menu>
        )
    }

    return (
        <Row className={style.topbar}>
            <Col style={{ padding: 0, height: '100%' }}>
                <Dropdown overlay={toolMenu} trigger="click">
                    <Button
                        className="d-md-inline-block d-lg-none"
                        style={{
                            height: '100%',
                            borderRadius: 'none',
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                    >
                        <ToolSVG />
                        {window.innerWidth > breakpoint && (
                            <>
                                &nbsp;
                                <CaratSVG height={28} />
                            </>
                        )}
                    </Button>
                </Dropdown>
                <Button
                    className="d-none d-lg-inline-block"
                    style={{
                        height: '100%',
                        borderRadius: 'none',
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                    onClick={leftPane}
                >
                    <SettingsSVG />
                </Button>

                <Button
                    className="d-none d-lg-inline-block"
                    style={{
                        height: '100%',
                        borderRadius: 'none',
                        paddingLeft: 5,
                        paddingRight: 5,
                    }}
                    onClick={leftPane}
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
                        {window.innerWidth > breakpoint && (
                            <>
                                &nbsp;
                                <CaratSVG height={28} />
                            </>
                        )}
                    </Button>
                </Dropdown>
                <Dropdown overlay={timeMenu} trigger="click">
                    <Button
                        style={{
                            height: '100%',
                            borderRadius: 'none',
                            paddingLeft: 5,
                            paddingRight: 5,
                            top: window.innerWidth > breakpoint ? 0 : -13,
                        }}
                    >
                        <div
                            className="d-inline align-top"
                            style={{
                                fontSize: 18,
                                fontFamily: 'Montserrat, Cantarell, sans-serif',
                            }}
                        >
                            &nbsp;H1&nbsp;
                        </div>
                        {window.innerWidth > breakpoint && <CaratSVG height={28} />}
                    </Button>
                </Dropdown>

                <Dropdown overlay={timeMenu} trigger="click">
                    <Button
                        style={{
                            height: '100%',
                            borderRadius: 'none',
                            paddingLeft: 5,
                            paddingRight: 5,
                            alignItems: 'center',
                        }}
                    >
                        <IndicatorSVG />
                        &nbsp;
                        <CaratSVG height={28} />
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
                    onClick={rightPane}
                >
                    <RightPaneSVG />
                </Button>
            </Col>
        </Row>
    )
}

export default TobBarContent
