import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from 'components/cleanui/layout/TopBar'
import Breadcrumbs from 'components/cleanui/layout/Breadcrumbs'
import Menu from 'components/cleanui/layout/Menu'

const mapStateToProps = () => ({
    isContentMaxWidth: false,
    isAppMaxWidth: false,
    isGrayBackground: true,
    isSquaredBorders: false,
    isCardShadow: true,
    isBorderless: false,
    isTopbarFixed: true,
    isGrayTopbar: false,
})

const ChartingLayout = ({
    children,
    isContentMaxWidth,
    isAppMaxWidth,
    isGrayBackground,
    isSquaredBorders,
    isCardShadow,
    isBorderless,
    isTopbarFixed,
    isGrayTopbar,
}) => {
    return (
        <div className={classNames({ cui__layout__grayBackground: isGrayBackground })}>
            <Layout
                className={classNames({
                    cui__layout__contentMaxWidth: isContentMaxWidth,
                    cui__layout__appMaxWidth: isAppMaxWidth,
                    cui__layout__grayBackground: isGrayBackground,
                    cui__layout__squaredBorders: isSquaredBorders,
                    cui__layout__cardsShadow: isCardShadow,
                    cui__layout__borderless: isBorderless,
                })}
            >
                <Menu />
                <Layout>
                    <Layout.Header
                        className={classNames('cui__layout__header', {
                            cui__layout__fixedHeader: isTopbarFixed,
                            cui__layout__headerGray: isGrayTopbar,
                        })}
                    >
                        <TopBar />
                    </Layout.Header>
                    <Breadcrumbs />
                    <Layout.Content style={{ height: '100%', position: 'relative' }}>
                        <div className="cui__utils__content" style={{ padding: 0 }}>
                            {children}
                        </div>
                    </Layout.Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter(connect(mapStateToProps)(ChartingLayout))
