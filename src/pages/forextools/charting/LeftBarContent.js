/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import classNames from 'classnames'
import { Row, Col, Button, ButtonGroup, ToggleButton, Dropdown } from 'react-bootstrap'
import { ReactComponent as PencilSVG } from './svgs/pencil.svg'
import { ReactComponent as RightCaratSVG } from './svgs/right-carat.svg'
import style from './style.module.scss'
import { lineTypes, smallIconStyle } from './dataUI'
import Keys from './utils'

const LeftBarContent = props => {
    const [lineType, setLineType] = useState('line')

    const dropDownMenu = (items, type) => (
        <Row style={{ marginLeft: -14 }}>
            <Col style={{ height: 37 }}>
                <ButtonGroup toggle style={{ height: 37 }}>
                    <ToggleButton
                        type="checkbox"
                        className={classNames(
                            'rounded-0 border-0 h-100 d-inline-block',
                            style.leftbarBtn,
                        )}
                        variant="outline-light"
                    >
                        {type === 'lineTypes' && lineTypes[lineType].icon()}
                    </ToggleButton>
                </ButtonGroup>
                <Dropdown drop="right" className="d-inline">
                    <Dropdown.Toggle
                        drop="right"
                        variant="outline-light"
                        className={classNames(
                            style.leftbarDropdownBtn,
                            style.svgFill,
                            style.noCarat,
                            'rounded-0 border-0',
                        )}
                    >
                        <RightCaratSVG width={5} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={classNames(style.leftbarDropDownMenu)}>
                        {Keys(items).map(item => (
                            <Dropdown.Item
                                className={classNames(style.leftbarDropDownMenuItem)}
                                eventKey={item}
                            >
                                {items[item].icon(smallIconStyle)}{' '}
                                <div className="d-inline h100 align-middle ml-3">
                                    {items[item].text}
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    )

    return (
        <div style={{ height: '100%', overflow: 'visible' }}>
            {dropDownMenu(lineTypes, 'lineTypes')}
        </div>
    )
}

export default LeftBarContent
