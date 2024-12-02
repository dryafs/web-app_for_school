import {useSelector, useDispatch} from 'react-redux'
import { getContacts } from '../studentSlice'
import { useEffect } from 'react'

import './contacts.css'

const Contacts = () => {
    const {contacts} = useSelector(state => state.student)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContacts())
    }, [])

    return(
        <div className="contacts">
            <h1 className='title__contacts'>Контакти</h1>
            <ul className="contacts__list">
                {
                    contacts !== null ? contacts.map(item => {
                        return(
                            <li key={item.id} className="contacts__item">
                                <h1 className="contacts-item__name">{item.name}</h1>
                                <a href={`mailto:${item.email}`} className="contacts-item__email">email: {item.email}</a>
                            </li>
                        )
                    }) : null
                }
            </ul>
        </div>
    )
}

export default Contacts