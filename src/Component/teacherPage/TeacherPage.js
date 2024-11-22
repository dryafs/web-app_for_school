import PageHeader from '../pageHeader/PageHeader'
import MarkingStudent from './markingStudents/MarkingStudent'
import AddStudentForm from './addStudentForm/AddStudentForm'

import './teacherPage.css'
const TeacherPage = () => {
    return(
        <>
            <PageHeader/>
            <div className='main__inner'>
                <>
                    <MarkingStudent/>
                </>
                <>
                    <AddStudentForm/>
                </>
            </div>
        </>
    )
}

export default TeacherPage