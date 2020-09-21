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
    const [collapsedRightPane, setCollapsedRightPane] = useState(false)
    const [collapsedBottomPane, setCollapsedBottomPane] = useState(false)
    const [collapsedLeftPane, setCollapsedLeftPane] = useState(false)

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
                                <ReflexContainer orientation="horizontal" windowResizeAware>
                                    <ReflexElement className="top-pane">
                                        <ReflexContainer orientation="vertical" windowResizeAware>
                                            <ControlledElement
                                                minSize={0}
                                                maxSize={450}
                                                direction={1}
                                                threshold={80}
                                                onCollapse={setCollapsedLeftPane}
                                                className={`top-left-pane ${displayClass}`}
                                                // size={collapsedLeftPane && 0}
                                            >
                                                <div className="pane-content">
                                                    <span>Settings</span>
                                                </div>
                                            </ControlledElement>
                                            <ReflexSplitter
                                                className={`${style.splitterVertical} ${displayClass}`}
                                                // propagate
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
                                    {!collapsedBottomPane && (
                                        <ReflexSplitter
                                            className={style.splitterHorizontal}
                                            // propagate
                                        />
                                    )}
                                    <ControlledElement
                                        direction={-1}
                                        minSize={37}
                                        threshold={80}
                                        tabbedPane
                                        onCollapse={setCollapsedBottomPane}
                                        // size={collapsedBottomPane && 39}
                                        style={{ borderTop: '2px solid black' }}
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
                            {!collapsedRightPane && (
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
