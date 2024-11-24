import {Route, BrowserRouter, Routes} from 'react-router-dom'

import Login from "../Login/Login"
import SignUp from "../singup/SingUp"
import TeacherPage from '../teacherPage/TeacherPage'
import StudentPage from '../studentPage/StudentPage'



const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='sign' element={<SignUp/>}/>
                <Route path='teacher/homepage' element={<TeacherPage/>}/>
                <Route path='person/homepage' element={<StudentPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App