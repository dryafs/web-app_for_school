import {Route, BrowserRouter, Routes} from 'react-router-dom'

import Login from "../Login/Login"
import SignUp from "../singup/SingUp"
import TeacherPage from '../teacherPage/TeacherPage'



const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='sign' element={<SignUp/>}/>
                <Route path='teacher/homepage' element={<TeacherPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App