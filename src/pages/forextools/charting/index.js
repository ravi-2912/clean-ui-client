/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex'
import { Drawer, Tabs } from 'antd'
import { Container, Row, Col } from 'reactstrap'
import ControlledElement from './ControlledElement'
import 'react-reflex/styles.css'
import TopBarContent from './TopBarContent'
import style from './style.module.scss'

const Charting = () => {
    const [visible, setVisible] = useState(false)
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
    })

    return (
        <>
            <Container fluid className={style.containerBorder}>
                <TopBarContent />
                {/* <Button type="primary" onClick={() => setVisible(true)}>
                            Open
                        </Button> */}
                <Row style={{ marginLeft: -16 }}>
                    <Col className={style.chartPane}>
                        <ReflexContainer orientation="horizontal">
                            <ReflexElement>
                                <ReflexContainer orientation="vertical">
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
                                    <ReflexElement minSize={150} maxSize={450} />
                                    <ReflexSplitter propagate className={style.splitterVertical} />
                                    <ReflexElement minSize={500} />
                                    <ReflexSplitter propagate className={style.splitterVertical} />
                                    <ReflexElement />
                                </ReflexContainer>
                            </ReflexElement>

                            {!bottomPaneState.collapsed && (
                                <ReflexSplitter
                                    className={style.splitterHorizontal}
                                    onResize={() =>
                                        setBottomPaneState({ ...bottomPaneState, collapsed: false })
                                    }
                                />
                            )}

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
