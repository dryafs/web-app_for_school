import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { getReview } from '../studentSlice'

import './review.css'

const Review = () => {
    const {currentStudent, review} = useSelector(state => state.student)
    const dispatch = useDispatch();

    useEffect(() => {
        if(currentStudent){
            dispatch(getReview({id: currentStudent.id}))
        }
    }, [currentStudent, dispatch])



    return(
        <div className="review container">
            <h1 className='title__review'>Відгуки</h1>
            <ul className='review__list'>
                {
                   review !== null ? review.map((item) => {
                        return(
                            <li className="review__item">
                                <h2 className="review-item__name">{item['teacher-name']}</h2>
                                <p className="review-item__text">{item.review}</p>
                            </li>
                        )
                   }) : null
                }
            </ul>
        </div>
    )
}

export default Review