import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getClasses, getAllStudents, sendAllMark, getOneStudent, updateHistory} from "../teacherSlice"
import { filterStudents } from "../teacherSlice"

import './markingStudent.css'
import '../../../reset.css'

const MarkingStudent = () => {
    const {classes, filteredStudents} = useSelector(state => state.teacher)
    const {fullInformation} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [filterClass, setFilterClass] = useState(undefined)
    const [marks, setMarks] = useState({})

    useEffect(() => {
        dispatch(getClasses())
        dispatch(getAllStudents())
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        dispatch(filterStudents(filterClass))
        // eslint-disable-next-line
    }, [filterClass])

    const onFilterChange = (e) => {
        setFilterClass(e.target.value)
    }

    const onChangeMarks = (e, id) => {
        const {value} = e.target
        setMarks((prevState) => ({
            ...prevState,
            [id]: value
        }))
    }

    const onSubmitMarks = async () => {
        const {type} = fullInformation
        console.log(type)
        for (let key in marks) {
            if(marks[key] !== ""){
                let mark = marks[key]
                let props = {key, type, mark}
                let text = `Ви отримали ${mark} з ${type}`
                let history = {key, text}
                await dispatch(sendAllMark(props)).unwrap()
                dispatch(updateHistory(history))
            }  
        }
       setMarks({});
       setFilterClass("")
    }

    const onSelectStudent = (id) => {
        dispatch(getOneStudent(id))
    }

    return (
        <div>
            <div className="mark-student__inner">
                <div className="select__div">
                    <select 
                        required
                        className="select__class" 
                        name="class"
                        value={filterClass || ""}
                        onChange={onFilterChange}>
                        <option value="">Оберіть клас...</option>
                        {classes.map(item => {
                            return <option key={item.schoolClass} value={item.schoolClass}>{item.schoolClass}</option>
                        })}
                    </select>
                </div>
                <ul className="class-item__inner">
                    {filterClass !== undefined ? filteredStudents.map(item => {
                        return(
                            <div key={item.id} className="class-item">
                                <li onClick={() => onSelectStudent(item.id)}>{item.name}</li>
                                <select 
                                    required
                                    className="select__mark" 
                                    name={`mark-${item.id}`}
                                    value={marks[item.id] || ""}
                                    onChange={(e) => onChangeMarks(e, item.id)}
                                    >
                                    <option value=""></option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                </select>
                            </div>
                        )
                    }) : null}
                </ul>
                <div className="button__inner__submit">
                <button onClick={onSubmitMarks} className="btn_submit_mark">Зберігти</button>
                </div>
            </div>
        </div>
    )

}

export default MarkingStudent