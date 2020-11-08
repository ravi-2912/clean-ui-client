/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import {
    Row,
    Col,
    ToggleButton,
    Button,
    ToggleButtonGroup,
    Dropdown,
    InputGroup,
    FormControl,
} from 'react-bootstrap'
import Select from 'react-select'
import NumericInput from 'react-numeric-input'
import classNames from 'classnames'
import { ReactComponent as SettingsSVG } from './svgs/settings.svg'
import { ReactComponent as LayersSVG } from './svgs/layers.svg'
import { ReactComponent as RightPaneSVG } from './svgs/rightpane.svg'
import { ReactComponent as IndicatorSVG } from './svgs/indicator.svg'
import { ReactComponent as FxSVG } from './svgs/indicator-fx.svg'
import { ReactComponent as RightCaratSVG } from './svgs/right-carat.svg'

// import './select.scss'
import style from './style.module.scss'
import { granularities, chartTypes, pointerTypes, selectStyles, selectTheme } from './dataUI'
import Keys from './utils'

const TobBarContent = props => {
    const { rightPaneOpen, rightPaneClose, rightPaneCollapsed } = props
    const { leftPaneOpen, leftPaneClose, leftPaneCollapsed } = props
    const [rightPaneVisible, toggleRightPaneVisible] = useState(false)
    const [leftPaneVisible, toggleLeftPaneVisible] = useState(false)
    const [leftPaneContent, setLeftPaneContent] = useState('')
    const [timeframe, setTimeframe] = useState('H1')
    const [chartType, setChartType] = useState('candles')
    const [pointerType, setPointerType] = useState('arrow')

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    const smallIconStyle = {
        height: 22,
        width: 22,
        className: 'align-middle',
    }

    const dropdownMenu = (items, type = 'tf', collapsed = false) => (
        <Dropdown
            className={classNames('d-inline-block', style.noCarat, collapsed && 'w-100')}
            drop={collapsed ? 'right' : 'down'}
        >
            <Dropdown.Toggle
                variant="outline-light"
                id={`topbar-dropdown-${type}`}
                className={classNames(
                    !collapsed && style.topbarBtn,
                    collapsed && style.topBarDropDownMenuAsSubMenu,
                    style.noCarat,
                )}
            >
                <Row style={{ width: collapsed && 165 }}>
                    {collapsed && (
                        <Col xs={3}>
                            {type === 'tf' && timeframe}
                            {type === 'ct' && chartTypes[chartType].icon(smallIconStyle)}
                            {type === 'pt' && pointerTypes[pointerType].icon(smallIconStyle)}
                        </Col>
                    )}
                    <Col>
                        <div
                            className={classNames('d-inline-block align-middle')}
                            style={{ lineHeight: !collapsed && '30px', fontSize: !collapsed && 20 }}
                        >
                            {type === 'tf' &&
                                (collapsed ? 'Timeframes' : <>&nbsp;{timeframe}&nbsp;</>)}
                            {type === 'ct' &&
                                (collapsed ? 'Chart Types' : chartTypes[chartType].icon())}
                            {type === 'pt' &&
                                (collapsed ? 'Cursor Types' : pointerTypes[pointerType].icon())}
                        </div>

                        <div
                            className={classNames(
                                'd-inline-block',
                                !collapsed
                                    ? `align-${type === 'tf' ? 'bottom' : 'middle'}`
                                    : 'align-middle',
                                style.svgFill,
                            )}
                            style={{ height: collapsed && 16 }}
                        >
                            &nbsp;
                            <RightCaratSVG width={5} />
                        </div>
                    </Col>
                </Row>
            </Dropdown.Toggle>

            <Dropdown.Menu className={style.topbarDropDownMenu}>
                {Keys(items).map(item =>
                    item === 'divider' ? (
                        <Dropdown.Divider key={item} />
                    ) : (
                        <Dropdown.Item className={style.topbarDropDownMenuItem} key={item}>
                            {'icon' in items[item] ? (
                                <>
                                    {items[item].icon(smallIconStyle)}{' '}
                                    <div className="d-inline h100 align-middle ml-3">
                                        {items[item].text}
                                    </div>
                                </>
                            ) : (
                                <Row>
                                    <Col xs={3}>{item}</Col>
                                    <Col>{items[item].text}</Col>
                                </Row>
                            )}
                        </Dropdown.Item>
                    ),
                )}
            </Dropdown.Menu>
        </Dropdown>
    )

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
                <Dropdown className="d-inline-block" style={{ borderRight: '2px solid #c8c4db' }}>
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="dropdown-tools"
                        className={classNames(style.topbarBtn, style.noCarat)}
                    >
                        <div
                            className="d-inline-block align-middle"
                            style={{ lineHeight: '30px', fontSize: 20 }}
                        >
                            <FxSVG />
                        </div>
                        <div
                            className={classNames('d-inline-block', 'align-middle', style.svgFill)}
                        >
                            &nbsp;
                            <RightCaratSVG width={5} />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        {dropdownMenu(granularities, 'tf', true)}
                        {dropdownMenu(chartTypes, 'ct', true)}
                        {dropdownMenu(pointerTypes, 'pt', true)}
                        <Dropdown.Divider />
                        <Dropdown.Item className={style.topbarDropDownMenuItem}>
                            <Row>
                                <Col xs={3}>
                                    <LayersSVG height={22} width={22} className="align-middle" />
                                </Col>
                                <Col>Layers</Col>
                            </Row>
                        </Dropdown.Item>
                        <Dropdown.Item className={style.topbarDropDownMenuItem}>
                            <Row>
                                <Col xs={3}>
                                    <SettingsSVG height={22} width={22} className="align-middle" />
                                </Col>
                                <Col>Settings</Col>
                            </Row>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <ToggleButtonGroup
                    type="checkbox"
                    onChange={v => {
                        setLeftPaneContent(v[v.length - 1])
                    }}
                    className="d-none d-lg-inline-block"
                    name="settingOptions"
                    value={leftPaneContent}
                >
                    <ToggleButton
                        className={style.topbarBtn}
                        value="settings"
                        variant="outline-light"
                    >
                        <SettingsSVG />
                    </ToggleButton>
                    <ToggleButton
                        className={classNames(style.topbarBtn)}
                        value="layers"
                        variant="outline-light"
                    >
                        <LayersSVG />
                    </ToggleButton>
                </ToggleButtonGroup>
                <div
                    className="d-inline-block"
                    style={{
                        width: '25%',
                        minWidth: 100,
                        height: '100%',
                        borderLeft: '2px solid #c8c4db',
                        borderRight: '2px solid #c8c4db',
                    }}
                >
                    <Select options={options} styles={selectStyles()} theme={selectTheme} />
                </div>
                {dropdownMenu(granularities)}
                {dropdownMenu(chartTypes, 'ct')}
                {dropdownMenu(pointerTypes, 'pt')}
                <Dropdown className="d-inline-block" style={{ borderRight: '2px solid #c8c4db' }}>
                    <Dropdown.Toggle
                        variant="outline-light"
                        id="topbard-dropdown-indicators"
                        className={classNames(style.topbarBtn, style.noCarat)}
                    >
                        <div
                            className="d-inline-block align-middle"
                            // style={{ lineHeight: '30px', fontSize: 20 }}
                        >
                            <IndicatorSVG />
                        </div>
                        <div
                            className={classNames('d-inline-block', 'align-middle', style.svgFill)}
                        >
                            &nbsp; <RightCaratSVG width={5} />
                        </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={style.topbarDropDownMenu}>
                        <Select
                            options={options}
                            styles={selectStyles(35, true)}
                            theme={selectTheme}
                            isClearable
                            components={{ DropdownIndicator: null }}
                        />
                        <Dropdown.Divider />
                        <Dropdown.Item className={style.topbarDropDownMenuItem}>
                            {/* <ToolSVG height={22} width={22} className="align-middle" />
                            <div className="d-inline h100 align-middle ml-3">Tools</div> */}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="d-inline-block">
                    <Button
                        variant="success"
                        className={classNames(style.topbarTradeBtn, style.topbarLongBtn)}
                    >
                        Long
                    </Button>
                    <NumericInput
                        step={0.1}
                        precision={1}
                        value={1.0}
                        max={10.0}
                        min={0.1}
                        format={num => `${num} %`}
                        style={{
                            wrap: {
                                background: 'none',
                                boxShadow: 'none',
                                padding: 0,
                                margin: 0,
                                borderRadius: 0,
                                border: 'none',
                                outline: 'none',
                            },
                            input: {
                                height: 36,
                                width: 70,
                                margin: 0,
                                padding: 0,
                                paddingLeft: 0,
                                border: 0,
                                outline: 'none',
                            },
                        }}
                    />
                    <Button
                        variant="danger"
                        className={classNames(style.topbarTradeBtn, style.topbarShortBtn)}
                    >
                        Short
                    </Button>
                </div>
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
                    className={classNames('float-right', style.topbarBtn)}
                    style={{ borderLeft: '2px solid #c8c4db' }}
                >
                    <RightPaneSVG />
                </ToggleButton>
            </Col>
        </Row>
    )
}

export default TobBarContent
