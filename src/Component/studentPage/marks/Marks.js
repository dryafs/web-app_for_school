import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getMarks } from "../studentSlice"

import './marks.css'

const Marks = () => {
    const {currentStudent, marks} = useSelector(state => state.student)
    const dispatch = useDispatch()

    useEffect(() => {
        if (currentStudent) {
            dispatch(getMarks({ id: currentStudent.id }));
        }
    }, [currentStudent]);

    return (
        <div className="marks">
            <h1 className='title__marks'>Успішність</h1>
            <div className="table__container">
                <table className="marks__table">
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Назва предмету</th>
                            <th> Отриманні результати</th>
                        </tr>
                    </thead>
                    <tbody className="marks-table__content">
                        {
                            // I don't have item.id in back-end, but using the index - it's not good!!!
                            marks !== null ?  marks.map((item, index) => {
                                return(
                                    <tr key={index}>
                                        <td style={{'textAlign': 'center'}}>{index + 1}</td>
                                        <td style={{'paddingLeft': '30px'}}>{item.subjectname}</td>
                                        <td style={{'paddingLeft': '30px'}}>{item.subjectsmarks.join(", ")}</td>
                                    </tr>
                                )
                            }) : (<tr>
                                    <td colSpan={3} style={{ textAlign: 'center' }}>В вас немає оцінок...</td> 
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Marks