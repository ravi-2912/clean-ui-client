import React from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import classNames from 'classnames'
import TopBar from 'components/cleanui/layout/TopBar'
import Breadcrumbs from 'components/cleanui/layout/Breadcrumbs'
import Menu from 'components/cleanui/layout/Menu'
import Footer from 'components/cleanui/layout/Footer'
// eslint-disable-next-line no-unused-vars
import Sidebar from 'components/cleanui/layout/Sidebar'
// eslint-disable-next-line no-unused-vars
import SupportChat from 'components/cleanui/layout/SupportChat'

const mapStateToProps = () => ({
    isContentMaxWidth: false, // settings.isContentMaxWidth,
    isAppMaxWidth: false, // settings.isAppMaxWidth,
    isGrayBackground: true, // settings.isGrayBackground,
    isSquaredBorders: false, // settings.isSquaredBorders,
    isCardShadow: true, // settings.isCardShadow,
    isBorderless: false, // settings.isBorderless,
    isTopbarFixed: true, // settings.isTopbarFixed,
    isGrayTopbar: false, // settings.isGrayTopbar,
})

const MainLayout = ({
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
                        <div className="cui__utils__content">{children}</div>
                    </Layout.Content>
                    <Layout.Footer>
                        <Footer />
                    </Layout.Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default withRouter(connect(mapStateToProps)(MainLayout))
