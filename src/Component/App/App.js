import {Route, BrowserRouter, Routes} from 'react-router-dom'

import Login from "../Login/Login"
import SignUp from "../singup/SingUp"
import MainPage from "../mainpage/MainPage"



const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='sign' element={<SignUp/>}/>
                <Route path='homepage' element={<MainPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App