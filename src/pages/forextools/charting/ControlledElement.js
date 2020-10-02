import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Tabs } from 'antd'
import { ReflexElement } from 'react-reflex'
import { ReactComponent as MinimizeSVG } from './svgs/minimize.svg'
import { ReactComponent as MaximizeSVG } from './svgs/maximize.svg'
import { ReactComponent as OpenSVG } from './svgs/open.svg'
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

    onOpenClicked = (activeTabKey = '0') => {
        const { minSize, paneState, paneSetState } = this.props
        const prevState = this.state
        const currentSize = this.getSize()
        const maxSize = (window.innerHeight - 64 - minSize - 4 - 4) * 0.5
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    activeTabKey,
                    collapsed: size <= minSize,
                })
                this.setState({ ...prevState, maximizing: size < maxSize })
                resolve()
            })
        }

        const done = (from, to) => {
            return from > to
        }

        this.animate(currentSize, maxSize, 40, done, update)
        // paneSetState({ ...paneState, size: maxSize, collapsed: false })
    }

    onMinimizeClicked = (activeTabKey = '') => {
        const { minSize, paneState, paneSetState } = this.props
        const prevState = this.state
        const currentSize = this.getSize()
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    activeTabKey,
                    collapsed: size <= minSize,
                    size: size < minSize ? minSize : size,
                })
                this.setState({ ...prevState, maximizing: false })
                resolve()
            })
        }
        const done = (from, to) => {
            return from < to
        }

        this.animate(currentSize, minSize, -40, done, update)
    }

    onMaximizeClicked = (activeTabKey = '0') => {
        const { minSize, paneState, paneSetState } = this.props
        const prevState = this.state
        const currentSize = this.getSize()
        const maxSize = window.innerHeight - 64 - minSize - 4 - 4
        const update = size => {
            return new Promise(resolve => {
                paneSetState({
                    ...paneState,
                    size,
                    activeTabKey,
                    collapsed: size <= minSize,
                })
                this.setState({ ...prevState, maximizing: size < maxSize })
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
            tabbedPane,
            paneState,
            paneSetState,
            tabPosition,
            extraContent,
        } = this.props

        const rightTabBarExtraContent = {
            right: (
                <>
                    <Button
                        onClick={
                            paneState.collapsed
                                ? () => this.onOpenClicked()
                                : () => this.onMinimizeClicked()
                        }
                        icon={paneState.collapsed ? <OpenSVG /> : <MinimizeSVG />}
                    />
                    <Button onClick={() => this.onMaximizeClicked()} icon={<MaximizeSVG />} />
                </>
            ),
        }

        return (
            <ReflexElement
                {...this.props}
                size={paneState.size}
                style={{ overflow: 'hidden' }}
                className={paneState.collapsed ? 'bottomPaneBorderTop' : ''}
            >
                <div id={name} style={{ height: '100%' }}>
                    {tabbedPane && (
                        <Tabs
                            size="small"
                            tabPosition={tabPosition}
                            style={{
                                height: '100%',
                            }}
                            tabBarExtraContent={extraContent && rightTabBarExtraContent}
                            activeKey={paneState.activeTabKey}
                            onTabClick={key => {
                                if (paneState.collapsed) this.onOpenClicked(key)
                                paneSetState({ ...paneState, activeTabKey: key })
                            }}
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
