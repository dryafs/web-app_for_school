import {Route, BrowserRouter, Routes} from 'react-router-dom'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import Login from "../Login/Login"
import SignUp from "../singup/SingUp"
import TeacherPage from '../teacherPage/TeacherPage'
import StudentPage from '../studentPage/StudentPage'
import FullInfoComponent from "../studentPage/fullInfoComponent/FullInfoComponent";
import Marks from "../studentPage/marks/Marks";
import Contacts from '../studentPage/contacts/Contacts';
import Review from '../studentPage/review/Review'


const App = () => {
    const {fullInformation} = useSelector(state => state.user)
    
    useEffect(() => {
        if (fullInformation) {
            sessionStorage.setItem('fullInformation', JSON.stringify(fullInformation));
        } else {
            sessionStorage.removeItem('fullInformation');
        }
    }, []);

    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='sign' element={<SignUp/>}/>
                <Route path='teacher/homepage' element={<TeacherPage/>}/>
                <Route path='/person' element={<StudentPage/>}>
                    <Route path="homepage" element={<FullInfoComponent/>}/>
                    <Route path="marks" element={<Marks/>}/>
                    <Route path="review" element={<Review/>}/>
                    <Route path="contacts" element={<Contacts/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App