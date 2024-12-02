import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import { getUser, getPersonClass } from '../studentSlice'

import snake__bg from '../../../img/snake__bg.png'

import './top.css'


const Top = () => {
    const {fullInformation} = useSelector(state => state.user)
    const {position, filteredStudents} = useSelector(state => state.student)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUser(fullInformation));

        dispatch(getPersonClass(fullInformation))
    }, [])


    
    return(
        <div>
            <div className="top">
                <div className="top__inner">
                    <div className="student__top">
                        <h1 className="student__position">{position}</h1>
                        <p className="student__text">місце в класі</p>
                    </div>
                    <div className="class__top">
                        <h1 className="class__number">{filteredStudents.length}</h1>
                        <p className="class__text">кількість учнів</p>
                    </div>
                </div>
                <img src={snake__bg} alt="" className='snake__bg'/>
            </div>
        </div>
    )
}

export default Top