import { useState } from "react"
import { useDispatch } from "react-redux"
import { addClass } from "../teacherSlice"
import { v4 as uuidv4 } from 'uuid'

import './addClassForm.css'

const AddClassForm = () => {
    const dispatch = useDispatch()
    const [schoolClass, setSchoolClass] = useState('')
    const [validate, setValidate] = useState(true)

    const onChangeClass = (e) => {
        setSchoolClass(e.target.value)
    }

    const onSubmitClass = (e) => {
        e.preventDefault()
        let data = {
            id: uuidv4(),
            schoolClass: schoolClass,
            homework: []
        }
        if(schoolClass !== ''){
            dispatch(addClass(data))
            setValidate(true)
            setSchoolClass('')
        } else{
            setValidate(false)
        }
    }

    return(
        <div className="class-form__inner">
            <p className="class-form__title">Додайте клас</p>
            <input type="text" 
                        placeholder="Впишіть назву класу"
                        name='class'
                        className={validate ? "input input-form" : "input input-form active"}
                        value={schoolClass}
                        onChange={onChangeClass}
                        />
            <div className="button-form__inner">
                <button onClick={(e) => onSubmitClass(e)} className="button__class-form__inner">Додати клас</button>
            </div>
        </div>
    )
}

export default AddClassForm