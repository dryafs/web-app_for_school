import PageHeader from '../pageHeader/PageHeader'
import MarkingStudent from './markingStudents/MarkingStudent'
import AddStudentForm from './addStudentForm/AddStudentForm'
import AddClassForm from './addClassForm/AddClassForm'
import MakeReview from './makeReview/MakeReview'
import AddHomework from './addHomework/AddHomework'

import './teacherPage.css'
const TeacherPage = () => {
    return(
        <>
            <PageHeader/>
            <div className='main__inner'>
                <div>
                    <MarkingStudent/>
                </div>
                <div>
                    <AddStudentForm/>
                    <AddClassForm/>
                </div>
                <div>
                    <MakeReview/>
                    <AddHomework/>
                </div>
            </div>
        </>
    )
}

export default TeacherPage