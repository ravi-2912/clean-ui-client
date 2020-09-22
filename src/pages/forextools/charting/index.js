/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { Drawer, Button, Tabs } from 'antd'
import { Container, Row, Col } from 'reactstrap'
import ControlledElement from './ControlledElement'
import 'react-reflex/styles.css'
import style from './style.module.scss'
import './tabs.scss'

const Charting = () => {
    const breakpoint = 'lg'
    const displayClass = `d-none d-${breakpoint}-block`

    const [visible, setVisible] = useState(false)
    const [collapsedLeftPane, setCollapsedLeftPane] = useState(false)
    const [bottomPaneState, setBottomPaneState] = useState({
        size: 38,
        minSize: 38,
        direction: -1,
        threshold: 80,
        collapsed: true,
        tabbedPane: true,
        tabPane: 'top',
    })
    const [leftPaneState, setLeftPaneState] = useState({
        size: 300,
        minSize: 0,
        maxSize: 400,
        direction: 1,
        threshold: 100,
        collapsed: false,
        tabbedPane: true,
        tabPane: 'left',
    })

    const onBottomPaneResize = ({ domElement }) => {
        const { collapsed } = bottomPaneState
        if (collapsed) setBottomPaneState({ ...bottomPaneState, collapsed: false })
    }

    const onBottomPaneResizeStop = ({ domElement }) => {
        setBottomPaneState({ ...bottomPaneState, size: domElement.offsetHeight })
    }

    const onLeftPaneResizeStop = ({ domElement }) => {
        setBottomPaneState({ ...leftPaneState, size: domElement.offsetWidth })
    }

    return (
        <>
            <Container fluid className={style.containerBorder}>
                <Row>
                    <Col className={style.topbar}>
                        Topbar
                        <Button type="primary" onClick={() => setVisible(true)}>
                            Open
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col className={style.chartPane}>
                        <ReflexContainer orientation="vertical">
                            <ReflexElement className="w-100" minSize={600}>
                                <ReflexContainer orientation="horizontal">
                                    <ReflexElement className="top-pane">
                                        <ReflexContainer orientation="vertical">
                                            <ControlledElement
                                                {...leftPaneState}
                                                paneState={leftPaneState}
                                                paneSetState={setLeftPaneState}
                                                onStopResize={onLeftPaneResizeStop}
                                                className={`top-left-pane ${displayClass}`}
                                            >
                                                {[...Array(4).keys()].map(i => (
                                                    <Tabs.TabPane
                                                        tab={`Tab ${i}`}
                                                        key={i}
                                                        disabled={i === 28}
                                                    >
                                                        Contents of Tab {i}
                                                    </Tabs.TabPane>
                                                ))}
                                            </ControlledElement>
                                            <ReflexSplitter
                                                className={`${style.splitterVertical} ${displayClass}`}
                                                // propagate
                                            />
                                            <ReflexElement
                                                minSize={500}
                                                className="top-middle-pane"
                                                style={{ overflow: 'hidden' }}
                                            >
                                                <div className="pane-content">
                                                    <span>Chart</span>
                                                </div>
                                            </ReflexElement>
                                        </ReflexContainer>
                                    </ReflexElement>
                                    <ReflexSplitter
                                        propagate
                                        onResize={onBottomPaneResize}
                                        className={style.splitterHorizontal}
                                    />
                                    <ControlledElement
                                        {...bottomPaneState}
                                        paneState={bottomPaneState}
                                        paneSetState={setBottomPaneState}
                                        onStopResize={onBottomPaneResizeStop}
                                    >
                                        {[...Array(4).keys()].map(i => (
                                            <Tabs.TabPane
                                                tab={`Tab ${i}`}
                                                key={i}
                                                disabled={i === 28}
                                            >
                                                Contents of Tab {i}
                                            </Tabs.TabPane>
                                        ))}
                                    </ControlledElement>
                                </ReflexContainer>
                            </ReflexElement>
                            {/* {!collapsedRightPane && (
                                <ReflexSplitter
                                    className={`${style.splitterVertical} ${displayClass}`}
                                    // propagate
                                />
                            )}
                            {!collapsedRightPane && (
                                <ControlledElement
                                    tabbedPane
                                    minSize={0}
                                    direction={-1}
                                    onCollapse={setCollapsedRightPane}
                                    threshold={120}
                                    // size={collapsedRightPane && 1}
                                >
                                    {[...Array(4).keys()].map(i => (
                                        <Tabs.TabPane tab={`Tab ${i}`} key={i} disabled={i === 28}>
                                            Contents of Tab {i}
                                        </Tabs.TabPane>
                                    ))}
                                </ControlledElement>
                            )} */}
                        </ReflexContainer>
                    </Col>
                </Row>
            </Container>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable
                maskClosable
                visible={visible}
                onClose={() => setVisible(false)}
                key="right"
                width={window.innerWidth * 0.9}
            >
                <p>Top right pane</p>
            </Drawer>
        </>
    )
}

export default Charting
