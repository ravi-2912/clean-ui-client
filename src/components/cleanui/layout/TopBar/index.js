/* eslint-disable no-unused-vars */
import React from 'react'
import FavPages from './FavPages'
import Search from './Search'
import IssuesHistory from './IssuesHistory'
import ProjectManagement from './ProjectManagement'
import LanguageSwitcher from './LanguageSwitcher'
import Actions from './Actions'
import UserMenu from './UserMenu'
import style from './style.module.scss'
import Sidebar from '../Sidebar'

const TopBar = () => {
    return (
        <div className={style.topbar}>
            <div className="mr-4 mr-auto">
                <FavPages />
            </div>

            <div className="mr-4 d-none d-sm-block">
                <Sidebar />
            </div>
            <div className="mr-4 d-none d-sm-block">
                <Actions />
            </div>
            <div className="mr-4 d-none d-sm-block">
                <UserMenu />
            </div>
        </div>
    )
}

export default TopBar
