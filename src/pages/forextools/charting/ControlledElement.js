import React from 'react'
import { Button, Tabs } from 'antd'
import { ReflexElement } from 'react-reflex'
import style from './style.module.scss'

class ControlledElement extends React.Component {
    state = { size: -1, collapsed: false }

    // eslint-disable-next-line no-unused-vars
    // componentWillReceiveProps() {
    // const { threshold, onCollapse} = this.props
    // const { collapsed } = this.state
    // const prevState = this.state
    // if (collapsed && this.getSize()>=threshold){
    //     this.setState({ ...prevState, collapsed: false, size: this.getSize() })
    //     if (onCollapse) onCollapse(false)
    // }
    // if (!collapsed && this.getSize() < threshold) {
    //     console.log(this.getSize())
    //     this.onMinimizeClicked()
    //     this.setState({ ...prevState, collapsed: true, size: this.getSize() })
    //     if (onCollapse) onCollapse(true)
    // }

    // }

    onMinimizeClicked = () => {
        const { minSize } = this.props
        const currentSize = this.getSize()
        console.log('clicked minimize')

        const update = size => {
            return new Promise(resolve => {
                this.setState({ size: size < minSize ? minSize : size }, () => resolve())
            })
        }

        const done = (from, to) => {
            return from < to
        }

        this.animate(currentSize, minSize, -20, done, update)
    }

    onMaximizeClicked = () => {
        const currentSize = this.getSize()
        const maxSize = window.innerHeight - 64 - 39
        const update = size => {
            return new Promise(resolve => {
                this.setState({ size }, () => resolve())
            })
        }

        const done = (from, to) => {
            return from > to
        }

        this.animate(currentSize, maxSize, 20, done, update)
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
