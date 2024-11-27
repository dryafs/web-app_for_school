import { useSelector } from 'react-redux'

import './topTable.css'

const TopTable = () => {
    const {filteredStudents} = useSelector(state => state.student)

    return(
        <div>
            <div className="top-table">
                <h1 className="top-table__title">Таблиця лідерів</h1>
                <ul className="top-table__inner">
                    {filteredStudents.slice(0, 5).map((item, index) => (
                        <li key={item.id} className="top-table__item">{`${index + 1}. ${item.name}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TopTable