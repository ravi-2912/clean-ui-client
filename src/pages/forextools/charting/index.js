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
    const MIN_BOTTOM_SIZE = 39
    const [visible, setVisible] = useState(false)
    const [collapseRightPane, setCollapseRightPane] = useState(false)
    const [bottomPaneState, setBottomPaneState] = useState({
        direction: -1,
        minSize: MIN_BOTTOM_SIZE,
    })
    const [rightPaneState, setRightPaneState] = useState({
        direction: -1,
        minSize: 0,
    })

    const breakpoint = 'lg'
    const displayClass = `d-none d-${breakpoint}-block`

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
                        <ReflexContainer orientation="vertical" windowResizeAware>
                            <ReflexElement className="w-100" minSize={600}>
                                <ReflexContainer orientation="horizontal">
                                    <ReflexElement className="top-pane">
                                        <ReflexContainer orientation="vertical">
                                            <ReflexElement
                                                maxSize={450}
                                                minSize={100}
                                                className={`top-left-pane ${displayClass}`}
                                            >
                                                <div className="pane-content">
                                                    <span>Settings</span>
                                                </div>
                                            </ReflexElement>
                                            <ReflexSplitter
                                                className={`${style.splitterVertical} ${displayClass}`}
                                                propagate
                                            />
                                            <ReflexElement
                                                className="top-middle-pane"
                                                minSize={500}
                                            >
                                                <div className="pane-content">
                                                    <span>Chart</span>
                                                </div>
                                            </ReflexElement>
                                        </ReflexContainer>
                                    </ReflexElement>
                                    <ReflexSplitter
                                        className={style.splitterHorizontal}
                                        propagate
                                    />
                                    <ControlledElement {...bottomPaneState} threshold={80}>
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
                            {!collapseRightPane && (
                                <ReflexSplitter
                                    className={`${style.splitterVertical} ${displayClass}`}
                                    propagate
                                />
                            )}
                            {!collapseRightPane && (
                                <ControlledElement
                                    {...rightPaneState}
                                    onCollapse={() => setCollapseRightPane(true)}
                                    threshold={120}
                                >
                                    {[...Array(4).keys()].map(i => (
                                        <Tabs.TabPane tab={`Tab ${i}`} key={i} disabled={i === 28}>
                                            Contents of Tab {i}
                                        </Tabs.TabPane>
                                    ))}
                                </ControlledElement>
                            )}
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
