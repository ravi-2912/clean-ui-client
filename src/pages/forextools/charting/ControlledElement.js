/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React from 'react'
import ReactDOM from 'react-dom'
import { Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { Button } from 'antd'
import { ReflexElement } from 'react-reflex'

class ControlledElement extends React.Component {
    componentWillReceiveProps() {
        // eslint-disable-next-line no-unused-vars
        const { paneState, threshold, paneSetState } = this.props

        if (!paneState.maximizing && !paneState.collapsed && this.getSize() < threshold) {
            paneSetState({
                ...paneState,
                size: paneState.minSize,
                activeTabKey: '',
                collapsed: true,
            })
        }
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
                    return setTimeout(stepFn, 1)
                })
            }
        }

        stepFn()
    }

    render() {
        const { name, children, tabbedPane, paneState, paneSetState, onOpenClicked } = this.props

        return (
            <ReflexElement
                {...this.props}
                size={paneState.size}
                style={{ overflow: 'hidden' }}
                className={paneState.collapsed && paneState.borderTop ? 'bottomPaneBorderTop' : ''}
            >
                <div id={name} style={{ height: '100%', width: '100%' }}>
                    {tabbedPane && (
                        <Tabs
                            onSelect={key => {
                                console.log(key)
                                if (paneState.collapsed) onOpenClicked(key)
                                paneSetState({ ...paneState, activeTabKey: key })
                            }}
                            selectedIndex={parseInt(paneState.activeTabKey, 10)}
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
