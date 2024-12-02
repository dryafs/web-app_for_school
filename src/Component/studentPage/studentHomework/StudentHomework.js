import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getHomework } from '../studentSlice'


import './studentHomework.css'
const StudentHomework = () => {
    const {currentStudent, homework} = useSelector(state => state.student)
    const dispatch = useDispatch();

    useEffect(() => {
        if(currentStudent !== null){
            dispatch(getHomework(currentStudent))
        }
    }, [currentStudent])

    return(
        <div className="student-homework">
            <h1 className="student-homework__title">Ваші домашні завдання</h1>
            <ul className="student-homework__inner">
                {
                    homework ? homework.map(item => {
                        return(
                            <li key={item.subjectname} className="student-homework__item-container">
                                <div className="student-homework__item">
                                    <h2 className="student-homework__subject">{item.subjectname}</h2>
                                    <p className="student-homework__task">{item.homework}</p>
                                </div>
                            </li>
                        )
                    }) : (<li className="student-homework__item-container">
                            <div className="student-homework__subject">Здається в вас немає д/з...</div>
                        </li>)
                }
            </ul>
        </div>
    )
}

export default StudentHomework