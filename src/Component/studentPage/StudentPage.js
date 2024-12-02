import PageHeader from "../pageHeader/PageHeader";
import NavMenu from "./navMenu/NavMenu";
import {Outlet} from 'react-router-dom';

import './studentPage.css'

const StudentPage = () => {
    return (
        <div className="student-page__inner">
        <div>
            <PageHeader />
        </div>
        <div className="nav-menu__section">
            <NavMenu />
            <div className="main-content">
                <Outlet/>
            </div>
        </div>
    </div>
    );
};

export default StudentPage;