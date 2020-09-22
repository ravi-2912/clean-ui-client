import React from 'react'
import { Button, Tabs } from 'antd'
import { ReflexElement } from 'react-reflex'
import style from './style.module.scss'

class ControlledElement extends React.Component {
    // state = { size: -1, collapsed: false }

    // eslint-disable-next-line no-unused-vars
    componentWillReceiveProps() {
        const { threshold, paneState } = this.props
        const { collapsed } = paneState
        // const prevState = this.state
        if (!collapsed && this.getSize() < threshold) {
            console.log('collapsing')
            this.onMinimizeClicked()
            // this.setState({ ...prevState, collapsed: true, size: this.getSize() })
            // paneSetState({size: this.getSize(), collapsed:true})
        }
    }

    onMinimizeClicked = () => {
        const { minSize, paneState, paneSetState } = this.props

        const currentSize = this.getSize()

        const update = size => {
            return new Promise(resolve => {
                this.setState({ ...paneState, size: size < minSize ? minSize : size }, () =>
                    resolve(),
                )
            })
        }

        const done = (from, to) => {
            return from < to
        }

        this.animate(currentSize, minSize, -40, done, update)
        paneSetState({ ...this.state, collapsed: true })
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ ...this.state, collapsed: true })
    }

    onMaximizeClicked = () => {
        // const {paneSetState} = this.props
        const prevState = this.state
        const currentSize = this.getSize()
        const maxSize = window.innerHeight - 64 - 39
        const update = size => {
            return new Promise(resolve => {
                this.setState({ ...prevState, size }, () => resolve())
            })
        }

        const done = (from, to) => {
            return from > to
        }

        this.animate(currentSize, maxSize, 40, done, update)
        // paneSetState({...this.state, collapsed:false})
        // eslint-disable-next-line react/no-access-state-in-setstate
        this.setState({ ...this.state, collapsed: false })
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
        const { children, maxClass, minClass, tabbedPane } = this.props
        const { size, collapsed } = this.state

        return (
            <ReflexElement size={size} {...this.props} style={{ overflow: 'hidden' }}>
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
                            className={collapsed && style.tabTopBorder}
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
