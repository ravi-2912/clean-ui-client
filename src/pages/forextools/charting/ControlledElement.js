import React from 'react'
import { Button, Tabs } from 'antd'
import { ReflexElement } from 'react-reflex'
// import style from './style.module.scss'

class ControlledElement extends React.Component {
    state = { maximizing: false }

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
        switch (orientation) {
            case 'horizontal':
                return this.domElement.parentElement.offsetHeight

            case 'vertical':
                return this.domElement.parentElement.offsetWidth

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
        const { children, maxClass, minClass, tabbedPane, paneState } = this.props
        // const { size, collapsed } = this.props
        return (
            <ReflexElement {...this.props} size={paneState.size} style={{ overflow: 'hidden' }}>
                <div
                    ref={node => {
                        this.domElement = node
                    }}
                    style={{ height: '100%' }}
                >
                    {tabbedPane && (
                        <Tabs
                            size="small"
                            tabPosition="top"
                            style={{ height: '100%' }}
                            // className={collapsed && style.tabTopBorder}
                            tabBarExtraContent={
                                <>
                                    <Button className={minClass} onClick={this.onMinimizeClicked}>
                                        -
                                    </Button>
                                    <Button className={maxClass} onClick={this.onMaximizeClicked}>
                                        +
                                    </Button>
                                </>
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
