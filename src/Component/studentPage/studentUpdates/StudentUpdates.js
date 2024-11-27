import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNews } from '../studentSlice';

import './studentUpdates.css'

const StudentUpdates = () => {
    const {currentStudent, studentNews} = useSelector(state => state.student)
    const dispatch = useDispatch()

    const today = new Date();
    const formattedDate = today.toLocaleDateString('uk-UA', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });

   useEffect(() => {
        if(currentStudent !== null){
            let id = {
                id: currentStudent.id
            }
            dispatch(getNews(id))
        }
    }, [currentStudent])

    return(
        <div className="student-updates">
            <h1 className="student-updates__title">Ваші новини</h1>
            <p className="student-updates__date">{formattedDate}</p>
            <ul className="student-updates__inner">
                {
                    studentNews ? studentNews.map((item, index) => {
                        return <li key={index} className='student-updates__item'>{item.news}</li>
                    }) : <li className='student-updates__item'>Новин поки що немає...</li>
                }
            </ul>
        </div>
    )
}

export default StudentUpdates