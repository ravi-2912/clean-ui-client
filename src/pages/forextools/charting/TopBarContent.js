/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { Row, Col, ToggleButton, Button, ToggleButtonGroup, Dropdown } from 'react-bootstrap'
import Select from 'react-select'
import classNames from 'classnames'
import { ReactComponent as SettingsSVG } from './svgs/settings.svg'
import { ReactComponent as LayersSVG } from './svgs/layers.svg'
import { ReactComponent as RightPaneSVG } from './svgs/rightpane.svg'
import { ReactComponent as CandlesSVG } from './svgs/charts/candles3.svg'
import { ReactComponent as HeikinAshiSVG } from './svgs/charts/heikinashi.svg'
import { ReactComponent as ToolSVG } from './svgs/tool.svg'
import { ReactComponent as IndicatorSVG } from './svgs/indicator.svg'
import { ReactComponent as PencilSVG } from './svgs/pencil.svg'
import { ReactComponent as CaratSVG } from './svgs/carat.svg'
import { ReactComponent as CrossSVG } from './svgs/cursors/cross.svg'
import { ReactComponent as FxSVG } from './svgs/indicator-fx.svg'

// import './select.scss'
import style from './style.module.scss'

const TobBarContent = props => {
    const { rightPaneOpen, rightPaneClose, rightPaneCollapsed } = props
    const { leftPaneOpen, leftPaneClose, leftPaneCollapsed } = props
    const [rightPaneVisible, toggleRightPaneVisible] = useState(false)
    const [leftPaneVisible, toggleLeftPaneVisible] = useState(false)
    const [leftPaneContent, setLeftPaneContent] = useState('')

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    // const chartMenu = () => {
    //     const iconSize = 28
    //     const menuHeight = iconSize + 10
    //     return (
    //         <Menu onClick={handleMenuClick}>
    //             <Menu.Item key="1" style={{ height: menuHeight }}>
    //                 <CandlesSVG height={iconSize} width={iconSize} className="align-middle" />
    //                 <div className="d-inline h100 align-middle ml-3">Candlestick</div>
    //             </Menu.Item>
    //             <Menu.Item key="2" style={{ height: menuHeight }}>
    //                 <HeikinAshiSVG height={iconSize} width={iconSize} className="align-middle" />
    //                 <div className="d-inline h100 align-middle ml-3">Heikin Ashi</div>
    //             </Menu.Item>
    //         </Menu>
    //     )
    // }

    // const timeMenu = () => {
    //     const iconSize = 28
    //     const menuHeight = iconSize + 10
    //     return (
    //         <Menu onClick={handleMenuClick}>
    //             <Menu.Item key="1" style={{ height: menuHeight }}>
    //                 H1&nbsp;&nbsp; 1 hour
    //                 {/* <div className="d-inline h100 align-middle ml-3">Candlestick</div> */}
    //             </Menu.Item>
    //             <Menu.Item key="2" style={{ height: menuHeight }}>
    //                 H2&nbsp;&nbsp; 2 hour
    //                 {/* <div className="d-inline h100 align-middle ml-3">Heikin Ashi</div> */}
    //             </Menu.Item>
    //         </Menu>
    //     )
    // }

    // const toolMenu = () => {
    //     const iconSize = 28
    //     const menuHeight = iconSize + 10
    //     return (
    //         <Menu onClick={handleMenuClick}>
    //             <Menu.Item key="1" style={{ height: menuHeight }} onClick={leftPane}>
    //                 <SettingsSVG height={iconSize} width={iconSize} className="align-middle" />
    //                 <div className="d-inline h100 align-middle ml-3">Settings</div>
    //             </Menu.Item>
    //             <Menu.Item key="2" style={{ height: menuHeight }} onClick={leftPane}>
    //                 <LayersSVG height={iconSize} width={iconSize} className="align-middle" />
    //                 <div className="d-inline h100 align-middle ml-3">Layers</div>
    //             </Menu.Item>
    //             <Menu.Divider />
    //             <Menu.Item key="3" style={{ height: menuHeight }} onClick={leftPane}>
    //                 <PencilSVG height={iconSize} width={iconSize} className="align-middle" />
    //                 <div className="d-inline h100 align-middle ml-3">Drawings</div>
    //             </Menu.Item>
    //         </Menu>
    //     )
    // }
    useEffect(() => {
        toggleRightPaneVisible(!rightPaneCollapsed)
    }, [rightPaneCollapsed])

    useEffect(() => {
        toggleLeftPaneVisible(!leftPaneCollapsed)
    }, [leftPaneCollapsed])

    useEffect(() => {
        if (!leftPaneContent) leftPaneClose()
        if (leftPaneContent === 'settings' || leftPaneContent === 'layers') leftPaneOpen()
    }, [leftPaneContent])

    return (
        <Row className={style.topbar}>
            <Col style={{ padding: 0, height: '100%' }}>
                <Dropdown className="d-inline-block d-sm-inline-block d-md-inline-block d-lg-none">
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={style.topbarBtn}
                    >
                        <ToolSVG />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Dropdown.Item href="#/action-1" className={style.topbarDropDownMenuItem}>
                            <SettingsSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Settings</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className={style.topbarDropDownMenuItem}>
                            <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ToggleButtonGroup
                    type="checkbox"
                    onChange={v => {
                        setLeftPaneContent(v[v.length - 1])
                    }}
                    className="d-none d-lg-inline-block ml-2"
                    name="settingOptions"
                    value={leftPaneContent}
                >
                    <ToggleButton
                        className={style.topbarBtn}
                        value="settings"
                        variant="outline-light"
                    >
                        <FxSVG />
                    </ToggleButton>

                    <ToggleButton
                        className={style.topbarBtn}
                        value="settings"
                        variant="outline-light"
                    >
                        <SettingsSVG />
                    </ToggleButton>
                    <ToggleButton
                        className={classNames(style.topbarBtn, 'ml-2')}
                        value="layers"
                        variant="outline-light"
                    >
                        <LayersSVG />
                    </ToggleButton>
                </ToggleButtonGroup>

                <div
                    className="d-inline-block ml-2"
                    style={{
                        width: '25%',
                        minWidth: 100,
                        height: '100%',
                        borderLeft: '2px solid #c8c4db ',
                        borderRight: '2px solid #c8c4db ',
                    }}
                >
                    <Select
                        options={options}
                        styles={{
                            container: (provided, state) => ({
                                ...provided,
                                height: 37,
                                // border: 'none',
                            }),
                            control: (provided, state) => ({
                                ...provided,
                                maxHeight: 37,
                                minHeight: 37,
                                border: 'none',
                            }),
                            valueContainer: (provided, state) => ({
                                ...provided,
                                maxHeight: 35,
                                minHeight: 35,
                            }),
                            indicatorsContainer: (provided, state) => ({
                                ...provided,
                                maxHeight: 35,
                                minHeight: 35,
                            }),
                            singleValue: (provided, state) => ({
                                ...provided,
                                color: '#595c97',
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                color: '#595c97',
                            }),
                        }}
                        theme={theme => ({
                            ...theme,
                            borderRadius: 0,
                            border: 'none',

                            colors: {
                                ...theme.colors,
                                primary: '#d9dee9',
                                primary25: '#e4e9f0',
                                primary50: '#e4e9f0',
                            },
                        })}
                    />
                </div>
                <Dropdown className="d-inline-block ml-2">
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={style.topbarBtn}
                    >
                        <span
                            className="d-inline align-text-bottom"
                            style={{
                                fontSize: 18,
                                fontFamily: 'Montserrat, Cantarell, sans-serif',
                            }}
                        >
                            &nbsp;H1&nbsp;
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Dropdown.Item href="#/action-1" className={style.topbarDropDownMenuItem}>
                            <SettingsSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Settings</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className={style.topbarDropDownMenuItem}>
                            <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-inline-block ml-2">
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={style.topbarBtn}
                    >
                        <CandlesSVG />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Dropdown.Item href="#/action-1" className={style.topbarDropDownMenuItem}>
                            <SettingsSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Settings</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className={style.topbarDropDownMenuItem}>
                            <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-inline-block ml-2">
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={style.topbarBtn}
                    >
                        <IndicatorSVG />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Dropdown.Item href="#/action-1" className={style.topbarDropDownMenuItem}>
                            <SettingsSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Settings</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className={style.topbarDropDownMenuItem}>
                            <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="d-inline-block ml-2 mr-2">
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={style.topbarBtn}
                    >
                        <CrossSVG />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Dropdown.Item href="#/action-1" className={style.topbarDropDownMenuItem}>
                            <SettingsSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Settings</div>
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2" className={style.topbarDropDownMenuItem}>
                            <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <ToggleButton
                    type="checkbox"
                    onChange={() => {
                        if (rightPaneVisible) {
                            rightPaneClose()
                        } else {
                            rightPaneOpen()
                        }
                    }}
                    checked={rightPaneVisible}
                    variant="outline-light"
                    className={classNames('float-right mr-2', style.topbarBtn)}
                >
                    <RightPaneSVG />
                </ToggleButton>
            </Col>
        </Row>
    )
}

export default TobBarContent
