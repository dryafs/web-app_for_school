import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addStudent } from "../teacherSlice"

import './addStudentForm.css'

const AddStudentForm = () => {
    const {classes, allStudents} = useSelector(state => state.teacher)
    const dispatch = useDispatch()
    const [student, setStudent] = useState({
        id: '',
        name: '',
        password: '',
        type: '',
        coin: 0,
        diamond: 0,
        subjects: [],
        review: [],
        lastUpdates: []
    })
    const [validate, setValidate] = useState(true)

    const onChangeValue = (e) => {
        const {name, value} = e.target;

        setStudent((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmitStudent = (e) => {
        e.preventDefault()
        const {id, name, password, type} = student
        console.log( !allStudents.some(item => item.id === id))
        const isLoginUnique = !allStudents.some(item => item.id === id);
        if((id !== '' && name !== '' && password !== '' && type !== '') && isLoginUnique){
            dispatch(addStudent(student))
            setValidate(true)
            setStudent((prevState) => ({
                ...prevState,
                id: '',
                name: '',
                password: '',
                type: ''
            }))
        } else{
            if(!isLoginUnique){
                setStudent((prevState) => ({
                    ...prevState,
                    id: ''
                }))
            }
            setValidate(false)
        }
    }

    return(
        <div className="add-form__inner">
            <h1 className="add-form__title">Додайте учня</h1>
            <form onSubmit={onSubmitStudent} className="add-form">
                <input type="text" 
                        placeholder="Майбутній login учня"
                        name='id'
                        className={validate ? "input input-form" : "input input-form active"}
                        value={student.id}
                        onChange={onChangeValue}/>
                <input type="text" 
                        placeholder="ПІБ учня"
                        name='name'
                        className={validate ? "input input-form" : "input input-form active"}
                        value={student.name}
                        onChange={onChangeValue}/>
                <input type="text" 
                        placeholder="Майбутній пароль учня"
                        name='password'
                        className={validate ? "input input-form" : "input input-form active"}
                        value={student.password}
                        onChange={onChangeValue}/>
                <select 
                    required
                    className={validate ? "select-form__inner" : "select-form__inner active"} 
                    name="type"
                    value={student.type}
                    onChange={onChangeValue}
                    >
                    <option className={validate ? "option" : "option active"}>Клас учня</option>
                    {classes.map(item => {
                        return <option key={item.schoolClass} value={item.schoolClass}>{item.schoolClass}</option>
                    })}
                </select>

                <div className="button__inner">
                    <button type="submit" className="button__add-form">Додати учня</button>
                </div>
            </form>
        </div>

    )
}

export default AddStudentForm