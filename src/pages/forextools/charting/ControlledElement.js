import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Tabs } from 'antd'
import { ReflexElement } from 'react-reflex'
import './tabs.scss'

class ControlledElement extends React.Component {
    constructor() {
        super()
        this.state = { maximizing: false }
    }

    componentWillReceiveProps() {
        const { paneState, threshold } = this.props
        const { maximizing } = this.state
        if (!maximizing && !paneState.collapsed && this.getSize() < threshold) {
            this.onMinimizeClicked()
        }
    }

    onMinimizeClicked = () => {
        const { minSize, paneState, paneSetState } = this.props
        const currentSize = this.getSize()
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    collapsed: true,
                    size: size < minSize ? minSize : size,
                })
                this.setState({ maximizing: false })
                resolve()
            })
        }
        const done = (from, to) => {
            return from < to
        }

        this.animate(currentSize, minSize, -40, done, update)
    }

    onMaximizeClicked = () => {
        const { minSize, paneState, paneSetState } = this.props
        const currentSize = this.getSize()
        const maxSize = window.innerHeight - 64 - minSize - 4 - 4
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    collapsed: false,
                })
                this.setState({ maximizing: size < maxSize })
                resolve()
            })
        }

        const done = (from, to) => {
            return from > to
        }

        this.animate(currentSize, maxSize, 40, done, update)
    }

    getSize = () => {
        const { orientation } = this.props
        // eslint-disable-next-line react/no-find-dom-node
        const domElement = ReactDOM.findDOMNode(this)

        switch (orientation) {
            case 'horizontal':
                return domElement.offsetHeight

            case 'vertical':
                return domElement.offsetWidth

            default:
                return 0
        }
    }

    animate = (from, to, step, done, fn) => {
        const stepFn = () => {
            if (!done(from, to)) {
                fn((from += step)).then(() => {
                    setTimeout(stepFn, 1)
                })
            }
        }

        stepFn()
    }

    render() {
        const {
            name,
            children,
            maxClass,
            minClass,
            tabbedPane,
            paneState,
            tabPosition,
            extraContent,
        } = this.props
        return (
            <ReflexElement
                ref={React.createRef().current}
                {...this.props}
                size={paneState.size}
                style={{ overflow: 'hidden' }}
            >
                <div id={name} style={{ height: '100%' }}>
                    {tabbedPane && (
                        <Tabs
                            size="small"
                            tabPosition={tabPosition}
                            style={{ height: '100%' }}
                            tabBarExtraContent={
                                extraContent && (
                                    <>
                                        <Button
                                            className={minClass}
                                            onClick={this.onMinimizeClicked}
                                        >
                                            -
                                        </Button>
                                        <Button
                                            className={maxClass}
                                            onClick={this.onMaximizeClicked}
                                        >
                                            +
                                        </Button>
                                    </>
                                )
                            }
                        >
                            {children}
                        </Tabs>
                    )}
                </div>
            </ReflexElement>
        )
    }
}

export default ControlledElement
