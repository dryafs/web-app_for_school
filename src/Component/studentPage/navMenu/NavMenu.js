
import logo_home from '../../../img/logo_homepage.svg'
import logo_mark from '../../../img/logo_mark.svg'
import logo_personal from '../../../img/logo_personal.svg'
import logo_review from '../../../img/logo_review.svg'
import logo_contacts from '../../../img/logo_contacts.svg'

import './navMenu.css'

const NavMenu = () => {
    return(
       <div className="nav-menu">
            <div className="nav-menu__inner">
                <a href="" className="nav-menu__element active">
                    <img src={logo_home} alt="" className="nav-menu__logo" />
                </a>
                <a href="" className="nav-menu__element">
                    <img src={logo_mark} alt="" className="nav-menu__logo" />
                </a>
                <a href="" className="nav-menu__element">
                    <img src={logo_personal} alt="" className="nav-menu__logo" />
                </a>
                <a href="" className="nav-menu__element">
                    <img src={logo_review} alt="" className="nav-menu__logo" />
                </a>
                <a href="" className="nav-menu__element">
                    <img src={logo_contacts} alt="" className="nav-menu__logo" />
                </a>
            </div>
       </div>
    )
}


export default NavMenu