import PageHeader from "../pageHeader/PageHeader";
import NavMenu from "./navMenu/NavMenu";
import Top from "./top/Top";
import TopTable from "./top_table/TopTable";
import StudentUpdates from "./studentUpdates/StudentUpdates";


import './studentPage.css'

const StudentPage = () => {
    return(
        <div className="student-page__inner">
            <div>
                <PageHeader/>
            </div>
            <div className="nav-menu__section">
                <NavMenu/>
                <div className="top-components__inner">
                    <div>
                        <h1 className='title__homepage container'>Головна</h1>
                        <Top/>
                    </div>
                    <TopTable/>
                    <StudentUpdates/>
                </div>
            </div>
        </div>
    )
}

export default StudentPage