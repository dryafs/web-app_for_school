import Top from '../top/Top'
import TopTable from "../top_table/TopTable";
import StudentUpdates from "../studentUpdates/StudentUpdates";
import StudentHomework from "../studentHomework/StudentHomework";
import ProgressCircle from "../statistic/Statistic";
import BgImg from "../bg_img/Bg_img"

import './fullInfoComponent.css'

const FullInfoComponent = () => {
    return(
        <div className="components">
            <div className="top-components__inner">
                <div>
                    <h1 className='title__homepage container'>Головна</h1>
                    <Top/>
                </div>
                <TopTable/>
                <StudentUpdates/>
            </div>
            <div className="bottom-components__inner">
                <StudentHomework/>
                <ProgressCircle/>
            </div>
            <div className="bg-img__inner">
                <BgImg/>
            </div>
        </div>
    )
}

export default FullInfoComponent