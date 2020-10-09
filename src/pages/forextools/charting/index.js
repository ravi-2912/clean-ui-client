/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { Drawer, Tabs } from 'antd'
import { Container, Row, Col } from 'reactstrap'
import ControlledElement from './ControlledElement'
// import CollapsedPane from './CollapsedPane'
import 'react-reflex/styles.css'
import TopBarContent from './TopBarContent'
import style from './style.module.scss'

const Charting = () => {
    const rightElement = React.createRef()
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
        size: 38,
        minSize: 38,
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
    })

    const [rightPaneState, setRightPaneState] = useState({
        id: 'right-pane',
        name: 'right-pane',
        size: 0,
        minSize: 0,
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

    const onVerticalPaneOpenClicked = (paneState, paneSetState) => {
        const { minSize } = paneState
        const maxSize = 500
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    collapsed: size <= minSize,
                })
                resolve()
            })
        }

        const doneFn = (from, to) => {
            return from > to
        }

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

        animate(rightPaneState.size, maxSize, 40, doneFn, update)
    }

    return (
        <>
            <Container fluid className={style.containerBorder}>
                <TopBarContent
                    rightPane={() =>
                        window.innerWidth > breakpoint
                            ? rightPaneState.collapsed &&
                              onVerticalPaneOpenClicked(rightPaneState, setRightPaneState)
                            : setVisibleRightDrawer(true)
                    }
                    breakpoint={breakpoint}
                    leftPane={() =>
                        window.innerWidth > breakpoint
                            ? leftPaneState.collapsed &&
                              onVerticalPaneOpenClicked(leftPaneState, setLeftPaneState)
                            : setVisibleLeftDrawer(true)
                    }
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
                                                ref={rightElement}
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
                            />

                            <ControlledElement
                                {...bottomPaneState}
                                paneState={bottomPaneState}
                                paneSetState={setBottomPaneState}
                            >
                                {[...Array(10).keys()].map(i => (
                                    <Tabs.TabPane key={i} tab={`Tab ${i}`}>
                                        Contents of Tab {i}
                                    </Tabs.TabPane>
                                ))}
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
