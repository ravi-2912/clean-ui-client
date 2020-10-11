/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { Drawer } from 'antd'
import { Tab, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { Container, Row, Col, Button, ToggleButton } from 'react-bootstrap'
import classNames from 'classnames'
import ControlledElement from './ControlledElement'
import 'react-reflex/styles.css'
import TopBarContent from './TopBarContent'
import { ReactComponent as MinimizeSVG } from './svgs/minimize.svg'
import { ReactComponent as MaximizeSVG } from './svgs/maximize.svg'
import { ReactComponent as OpenSVG } from './svgs/open.svg'
import style from './style.module.scss'

const Charting = () => {
    const breakpoint = 768
    const [dimensions, setDimensions] = React.useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const [visibleRightDrawer, setVisibleRightDrawer] = useState(false)
    const [visibleLeftDrawer, setVisibleLeftDrawer] = useState(false)

    const [bottomPaneState, setBottomPaneState] = useState({
        id: 'bottom-pane',
        name: 'bottom-pane',
        size: 37,
        minSize: 37,
        direction: -1,
        threshold: 100,
        collapsed: true,
        tabbedPane: true,
        tabPosition: 'top',
        extraContent: true,
        extraContentPosition: 'right',
        resizing: false,
        activeTabKey: '',
        borderTop: true,
        maximizing: false,
    })

    const [rightPaneState, setRightPaneState] = useState({
        id: 'right-pane',
        name: 'right-pane',
        size: 0,
        minSize: 0,
        maxSize: 600,
        direction: -1,
        threshold: 100,
        collapsed: true,
        tabbedPane: false,
        tabPosition: 'top',
        extraContent: false,
        extraContentPosition: 'right',
        resizing: false,
        activeTabKey: '',
        borderTop: false,
    })

    const [leftPaneState, setLeftPaneState] = useState({
        id: 'left-pane',
        name: 'left-pane',
        size: 0,
        minSize: 0,
        maxSize: 400,
        direction: 1,
        threshold: 100,
        collapsed: true,
        tabbedPane: false,
        tabPosition: 'top',
        extraContent: false,
        extraContentPosition: 'right',
        resizing: false,
        activeTabKey: '',
        borderTop: false,
    })

    function debounce(fn, ms) {
        let timer
        return _ => {
            clearTimeout(timer)
            // eslint-disable-next-line no-shadow
            timer = setTimeout(_ => {
                timer = null
                // eslint-disable-next-line prefer-rest-params
                fn.apply(this, arguments)
            }, ms)
        }
    }

    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            })
        }, 250)

        window.addEventListener('resize', debouncedHandleResize)

        return _ => {
            window.removeEventListener('resize', debouncedHandleResize)
        }
    })

    const animate = (from, to, step, done, fn) => {
        const stepFn = () => {
            if (!done(from, to)) {
                fn((from += step)).then(() => {
                    return setTimeout(stepFn, 1)
                })
            }
        }

        stepFn()
    }

    const onPaneOpenClicked = (paneState, paneSetState, activeTabKey = 0) => {
        const { minSize } = paneState
        const maxSize = paneState.maxSize
            ? paneState.maxSize
            : (window.innerHeight - 64 - minSize - 4 - 4) * 0.5
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    activeTabKey,
                    collapsed: size <= minSize,
                    maximizing: size < maxSize,
                })
                resolve()
            })
        }

        const done = (from, to) => {
            return from > to
        }

        animate(paneState.size, maxSize, 40, done, update)
    }

    const onPaneMinimizeClicked = (paneState, paneSetState, activeTabKey = '') => {
        const { minSize } = paneState

        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    activeTabKey,
                    collapsed: size <= minSize,
                    size: size < minSize ? minSize : size,
                    maximizing: false,
                })
                resolve()
            })
        }
        const done = (from, to) => {
            return from < to
        }

        animate(paneState.size, minSize, -40, done, update)
    }

    const onPaneMaximizeClicked = (paneState, paneSetState, activeTabKey = 0) => {
        const { minSize } = paneState
        const maxSize = window.innerHeight - 64 - minSize - 4 - 4
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    activeTabKey,
                    collapsed: size <= minSize,
                    maximizing: size < maxSize,
                })
                resolve()
            })
        }

        const done = (from, to) => {
            return from > to
        }

        animate(paneState.size, maxSize, 40, done, update)
    }

    return (
        <>
            <Container fluid className={style.containerBorder}>
                <TopBarContent
                    breakpoint={breakpoint}
                    rightPaneOpen={() =>
                        window.innerWidth > breakpoint
                            ? rightPaneState.collapsed &&
                              onPaneOpenClicked(rightPaneState, setRightPaneState)
                            : setVisibleRightDrawer(true)
                    }
                    rightPaneClose={() => onPaneMinimizeClicked(rightPaneState, setRightPaneState)}
                    rightPaneCollapsed={rightPaneState.collapsed}
                    leftPaneOpen={() =>
                        window.innerWidth > breakpoint
                            ? leftPaneState.collapsed &&
                              onPaneOpenClicked(leftPaneState, setLeftPaneState)
                            : setVisibleLeftDrawer(true)
                    }
                    leftPaneClose={() => onPaneMinimizeClicked(leftPaneState, setLeftPaneState)}
                    leftPaneCollapsed={leftPaneState.collapsed}
                />

                <Row style={{ marginLeft: -16 }}>
                    <Col className={style.chartPane}>
                        <ReflexContainer orientation="horizontal" windowResizeAware>
                            <ReflexElement>
                                <ReflexContainer orientation="vertical" windowResizeAware>
                                    {window.innerWidth > breakpoint && (
                                        <ReflexElement
                                            minSize={50}
                                            maxSize={50}
                                            style={{
                                                overflow: 'hidden',
                                                borderRight: '2px solid red',
                                            }}
                                        >
                                            <div>D</div>
                                        </ReflexElement>
                                    )}
                                    {window.innerWidth > breakpoint && !leftPaneState.collapsed && (
                                        <ControlledElement
                                            {...leftPaneState}
                                            paneState={leftPaneState}
                                            paneSetState={setLeftPaneState}
                                        />
                                    )}
                                    {window.innerWidth > breakpoint && !leftPaneState.collapsed && (
                                        <ReflexSplitter
                                            propagate
                                            className={style.splitterVertical}
                                            onResize={() =>
                                                setLeftPaneState({
                                                    ...leftPaneState,
                                                    collapsed: false,
                                                })
                                            }
                                        />
                                    )}
                                    <ReflexElement />
                                    {window.innerWidth > breakpoint && !rightPaneState.collapsed && (
                                        <ReflexSplitter
                                            propagate
                                            className={style.splitterVertical}
                                            onResize={() =>
                                                setRightPaneState({
                                                    ...rightPaneState,
                                                    collapsed: false,
                                                })
                                            }
                                        />
                                    )}
                                    {window.innerWidth > breakpoint &&
                                        !rightPaneState.collapsed && (
                                            <ControlledElement
                                                {...rightPaneState}
                                                paneState={rightPaneState}
                                                paneSetState={setRightPaneState}
                                            />
                                        )}
                                </ReflexContainer>
                            </ReflexElement>

                            <ReflexSplitter
                                className={`${
                                    style.splitterHorizontal
                                } ${bottomPaneState.collapsed && 'd-none'}`}
                                onStartResize={({ domElement }) => {
                                    console.log(bottomPaneState.size, domElement.offsetTop)

                                    setBottomPaneState({
                                        ...bottomPaneState,
                                        offsetTop: domElement.offsetTop,
                                    })
                                }}
                                onStopResize={({ domElement, component }) => {
                                    const { offsetTop, size } = bottomPaneState
                                    const newOffsetTop = domElement.offsetTop
                                    console.log(
                                        size,
                                        offsetTop,
                                        newOffsetTop,
                                        size - newOffsetTop + offsetTop,
                                    )
                                    if (!bottomPaneState.collapsed)
                                        setBottomPaneState({
                                            ...bottomPaneState,
                                            size: size - newOffsetTop + offsetTop,
                                        })
                                }}
                            />

                            <ControlledElement
                                {...bottomPaneState}
                                paneState={bottomPaneState}
                                paneSetState={setBottomPaneState}
                                onOpenClicked={() =>
                                    onPaneOpenClicked(bottomPaneState, setBottomPaneState)
                                }
                            >
                                <TabList
                                    className={
                                        bottomPaneState.collapsed
                                            ? classNames(style.bottomTabListCollapsed)
                                            : classNames(style.bottomTabListOpened)
                                    }
                                >
                                    <Tab
                                        className={classNames(style.bottomTab)}
                                        selectedClassName={
                                            !bottomPaneState.collapsed
                                                ? classNames(style.bottomTabSelected)
                                                : ''
                                        }
                                    >
                                        Title 1
                                    </Tab>
                                    <Tab
                                        className={classNames(style.bottomTab)}
                                        selectedClassName={
                                            !bottomPaneState.collapsed
                                                ? classNames(style.bottomTabSelected)
                                                : ''
                                        }
                                    >
                                        Title 2
                                    </Tab>
                                    <Tab
                                        className={classNames(
                                            style.bottomTabExtraContent,
                                            'float-right',
                                        )}
                                        tabIndex="-1"
                                        disabled
                                    >
                                        <ToggleButton
                                            className={style.bottomTabExtraContentBtn}
                                            variant="outline-light"
                                            onClick={
                                                bottomPaneState.collapsed
                                                    ? () =>
                                                          onPaneOpenClicked(
                                                              bottomPaneState,
                                                              setBottomPaneState,
                                                          )
                                                    : () =>
                                                          onPaneMinimizeClicked(
                                                              bottomPaneState,
                                                              setBottomPaneState,
                                                          )
                                            }
                                        >
                                            {bottomPaneState.collapsed ? (
                                                <OpenSVG />
                                            ) : (
                                                <MinimizeSVG />
                                            )}
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classNames(style.bottomTabExtraContentBtn)}
                                            variant="outline-light"
                                            onClick={() =>
                                                onPaneMaximizeClicked(
                                                    bottomPaneState,
                                                    setBottomPaneState,
                                                )
                                            }
                                        >
                                            <MaximizeSVG />
                                        </ToggleButton>
                                    </Tab>
                                </TabList>

                                <TabPanel>
                                    <h2>Any content 1</h2>
                                </TabPanel>
                                <TabPanel>
                                    <h2>Any content 2</h2>
                                </TabPanel>
                                <TabPanel />
                            </ControlledElement>
                        </ReflexContainer>
                    </Col>
                </Row>
            </Container>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable
                maskClosable
                visible={visibleRightDrawer}
                onClose={() => setVisibleRightDrawer(false)}
                key="right"
                width={window.innerWidth * 0.9}
            >
                <p>Top right pane</p>
            </Drawer>
            <Drawer
                title="Basic Drawer"
                placement="left"
                closable
                maskClosable
                visible={visibleLeftDrawer}
                onClose={() => setVisibleLeftDrawer(false)}
                key="left"
                width={window.innerWidth * 0.9}
            >
                <p>Top Left pane</p>
            </Drawer>
        </>
    )
}

export default Charting
