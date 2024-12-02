import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react"
import { getPresentage } from "../studentSlice";

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import './statistic.css'

const Statistic = () => {
    const {percentage, currentStudent} = useSelector(state => state.student)
    const dispatch = useDispatch()
    const [subject, setSubject] = useState("")

    useEffect(() => {
        if(subject !== ""){
            let data = {
                subjects: currentStudent.subjects,
                name: subject
            }
            dispatch(getPresentage(data))
        }
    }, [subject])

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return(
        <div className="statistic">
            <h1 className="statistic__title">Твоя середня оцінка з предмету</h1>
            <div className="statistic__inner">
                <select 
                    required
                    className="select__subject" 
                    name="subject"
                    value={subject}
                    onChange={onChangeSubject}
                    >
                    <option value={undefined}>Оберіть предмет...</option>
                    <option value="література">Літературу</option>
                    <option value="математика">Математику</option>
                    <option value="фізика">Фізику</option>
                    <option value="історія">Історію</option>
                    <option value="хімія">Хімія</option>
                </select>
                <div style={{ width: 200, height: 200, 'marginTop': '20px'}}>
                    <CircularProgressbar 
                        minValue={0} 
                        maxValue={12} 
                        value={percentage} 
                        text={`${percentage}`}
                        styles={{
                            path: {
                                stroke: '#FFFFFF'

                            },
                            text: {
                                fill: '#000000',
                                fontSize: '18px',
                              }
                        }}/>
                </div>
            </div>
        </div>
    )
}

export default Statistic