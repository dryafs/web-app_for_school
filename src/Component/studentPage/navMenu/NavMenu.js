import { NavLink } from 'react-router-dom'

import logo_home from '../../../img/logo_homepage.svg'
import logo_mark from '../../../img/logo_mark.svg'
import logo_review from '../../../img/logo_review.svg'
import logo_contacts from '../../../img/logo_contacts.svg'

import './navMenu.css'

const NavMenu = () => {
    return(
       <div className="nav-menu">
            <div className="nav-menu__inner">
                <NavLink to="/person/homepage" className="nav-menu__element">
                    <img src={logo_home} alt="" className="nav-menu__logo" />
                </NavLink>
                <NavLink to="/person/marks" className="nav-menu__element">
                    <img src={logo_mark} alt="" className="nav-menu__logo" />
                </NavLink>
                <NavLink to="/person/review" className="nav-menu__element">
                    <img src={logo_review} alt="" className="nav-menu__logo" />
                </NavLink>
                <NavLink to="/person/contacts" className="nav-menu__element">
                    <img src={logo_contacts} alt="" className="nav-menu__logo" />
                </NavLink>
            </div>
       </div>
    )
}


export default NavMenu