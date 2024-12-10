import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

import { getUser } from './loginSlice';

import { Link, useNavigate } from 'react-router-dom';

import './login.css'
import '../../reset.css'

import up_bg from '../../img/up_bg.png'
import down_bg from '../../img/down_bg.png'
import cosmo_bg from '../../img/cosmo_bg.png'
import google from '../../img/google.svg'
import apple from '../../img/apple.svg'


const Login = () => {
    const [formInput, setFormInput] = useState({
        path: '',
        login: '',
        password: ''
    })
    const [loginAttempted, setLoginAttempted] = useState(false)
    
    const {loading, error, proofLogin} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChangeValue = (e) => {
        const {name, value} = e.target

        setFormInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const onSubmitting = async (e) => {
        e.preventDefault();
        setLoginAttempted(true);
        dispatch(getUser(formInput))
    }

    useEffect(() => {
        if(loginAttempted){
            if(proofLogin === false){
                setFormInput((prevData) => ({
                    ...prevData,
                    password: ''
                }))
                setLoginAttempted(false)
            } else if(proofLogin === true){
                setFormInput({
                    path: '',
                    login: '',
                    password: ''
                })
            navigate(`${formInput.path}/homepage`, {replace: true})
            setLoginAttempted(false)
        }
        }
    }, [proofLogin, navigate])


    const load = loading ? <Spinner/> : null
    const mistake = error ? <ErrorMessage/> : null
    const view = (!loading && !error) ? <View onSubmitting={onSubmitting} path={formInput.path} login={formInput.login} password={formInput.password} proofLogin={proofLogin} onChangeValue={onChangeValue}/> : null

    let displayStyle = load || error ? "other__content" : "login__section"
    return(
        <div className={displayStyle} >
            {load}
            {mistake}
            {view}
        </div>
    )
}

const View = (props) => {
    const {onSubmitting, path, login, password, proofLogin, onChangeValue} = props;
    let showValidatePassword = false
    if(proofLogin == null){
        showValidatePassword = false
    } else if(proofLogin === false){
        showValidatePassword = true
    } else if(proofLogin === true){
        showValidatePassword = false
    }

    return(
        <>
            <div className='background__img__cosmo'>
                <img src={cosmo_bg} alt="" className='cosmo_bg'/>
            </div>
            <div className="login__inner">
                <h1 className="title_login">Вхід</h1>
                <form onSubmit={onSubmitting} className='input__inner'>
                    <select 
                        required
                        className="select last__input" 
                        name="path"
                        value={path}
                        onChange={onChangeValue}>
                        <option>Хто ви?</option>
                        <option value="teacher">вчитель</option>
                        <option value="person">учень</option>

                    </select>
                    <input type="text" 
                            placeholder="логін"
                            name='login'
                            value={login}
                            onChange={onChangeValue}
                            className="input"/>
                    <input type="password" 
                            placeholder={showValidatePassword ? "некоректний пароль" : "пароль"}
                            name='password'
                            onChange={onChangeValue}
                            value={password}
                            className={showValidatePassword ? "input input__second active" : "input input__second"}/>
                    <span className='input_span'>забули пароль?</span>

                    <div className='api__login__links'>
                        <button>
                            <img src={google} alt=""/>
                        </button>
                        <button>
                            <img src={apple} alt=""/>
                        </button>
                    </div>

                    <button type='submit' className='btn_login'>Увійти</button>
                </form>

                <div className='reg__link__inner'>
                    <p className='reg__link__text'>Ще немає акаунту?</p>
                    <Link to='/sign' className='reg__link'>Зареєструватися</Link>
                </div>
            </div>

            <div className="background__img__inner">
                <img src={up_bg} alt="" className='background__img'/>
                <img src={down_bg} alt="" className='background__img'/>
            </div>
        </>
    )
}

export default Login