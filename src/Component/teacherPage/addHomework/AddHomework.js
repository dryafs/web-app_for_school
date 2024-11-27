import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { sendHomework, updateHistory } from '../teacherSlice'

import './addHomework.css'

const AddHomework = () => {
    const {classes, allStudents} = useSelector(state => state.teacher)
    const {fullInformation} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [validate, setValidate] = useState(true)
    const [homework, setHomework] = useState({
        id: '',
        homework: ''
    })

    const onChanging = (e) => {
        const { name, value } = e.target
        
        setHomework((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmitting = async (e) => {
        e.preventDefault();
        const {id} = homework
        const data = {
            subjectname: fullInformation.type,
            homework: homework.homework
        }


        if(id !== '' && homework.homework !== ''){
            const selectedClass = classes.find((cls) => cls.id === id);
            await dispatch(sendHomework({id, data})).unwrap()
            allStudents.forEach(item => {
                if(item.type === selectedClass.schoolClass){
                    dispatch(updateHistory({ key: item.id, text: `Вам було додано д/з з предмету ${fullInformation.type}`}))
                }
            })


            setValidate(true)
            setHomework({
                id: '',
                homework: ''
            })
        }else{
            setValidate(false)
        }
        console.log(data)
    }



    return(
        <div className="homework-form__inner">
            <p className="homework-form__title">Додайте домашнє завдання</p>
            
            <select 
                required
                className={validate ? "select-homework" : "select-homework active"} 
                name="id"
                value={homework.id}
                onChange={onChanging}
                >
                <option value="">Оберіть клас...</option>
                {classes.map(item => {
                    return <option key={item.schoolClass} value={item.id}>{item.schoolClass}</option>
                })}
            </select>

            <textarea type="text" 
                        placeholder="Завдання це..."
                        name="homework"
                        className={validate ? "homework-input" : "homework-input active"}
                        value={homework.homework}
                        onChange={onChanging}/>
            <div className="button-form__inner">
                <button onClick={(e) => onSubmitting(e)} className="button__homework-form__inner">Надіслати</button>
            </div>
        </div>
    )
}

export default AddHomework