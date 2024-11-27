import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { sendReview, updateHistory } from "../teacherSlice"

import './makeReview.css'

const MakeReview = () => {
    const {currentStudent} = useSelector(state => state.teacher)
    const {fullInformation} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [isItChoosedStudent, setIsItChoosedStudent] = useState(false)
    const [review, setReview] = useState('')
    const [validate, setValidate] = useState(true)

    useEffect(() => {
        currentStudent === null ? setIsItChoosedStudent(false) : setIsItChoosedStudent(true)
    }, [currentStudent])

    const onChangeText = (e) => {
        setReview(e.target.value)
    }

    const onSubmitReview = async (e) => {
        e.preventDefault();
        const data = {
            'teacher-name': fullInformation.name,
            review: review
        }


        if(isItChoosedStudent && review !== ''){
            await dispatch(sendReview({id: currentStudent.id, data})).unwrap()
            let text = `Ви отримали новий відгук від ${fullInformation.name}`
            dispatch(updateHistory({key: currentStudent.id, text}))
            setValidate(true)
            setReview('')
        } else{
            setValidate(false)
        }
    }

    return(
        <div className="review-form__inner">
            <div className="review-title__inner">
                <p className="review-form__title">Додайте відгук</p>
                <p>{!isItChoosedStudent ? 'Натисніть у першій частині на імʼя учня' : currentStudent?.name}</p>
            </div>
            <textarea type="text" 
                        placeholder="Напишіть відгук про учня"
                        name="review"
                        className={validate ? "review-input" : "review-input active"}
                        value={review}
                        onChange={onChangeText}
                        />
            <div className="button-form__inner">
                <button onClick={(e) => onSubmitReview(e)} className="button__review-form__inner">Надіслати</button>
            </div>
        </div>
    )
}

export default MakeReview