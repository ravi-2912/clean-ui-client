/* eslint-disable no-unused-vars */
import React from 'react'
import classNames from 'classnames'
import { Row, Col, Button } from 'react-bootstrap'
import { ReactComponent as PencilSVG } from './svgs/pencil.svg'
import { ReactComponent as RightCaratSVG } from './svgs/right-carat.svg'
import style from './style.module.scss'

const LeftBarContent = props => {
    return (
        <div style={{ height: '100%' }}>
            <Row style={{ marginLeft: -14 }}>
                <Col style={{ height: 37 }}>
                    <Button
                        className="rounded-0 border-0 h-100 d-inline-block"
                        style={{
                            width: 38,
                            paddingTop: 4,
                            paddingBottom: 5,
                            paddingLeft: 5,
                            paddingRight: 5,
                        }}
                        variant="outline-light"
                    >
                        <PencilSVG />
                    </Button>
                    <Button
                        className={classNames(
                            'h-100 rounded-0 border-0 d-inline-block',
                            style.svgFill,
                        )}
                        variant="outline-light"
                        style={{
                            width: 'calc(100% - 38px)',
                            fontSize: 8,
                            color: 'grey',
                            padding: '10.5px 0',
                        }}
                    >
                        <RightCaratSVG width={5} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button>
                        <PencilSVG />
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default LeftBarContent
