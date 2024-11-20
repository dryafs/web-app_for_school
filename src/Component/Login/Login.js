import { useState } from 'react'

import { useHttp } from '../../hooks/useHttp'
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'

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
    const [validate, setValidate] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const {request} = useHttp();

    const onGetUser = () => {
        request(`http://localhost:3001/${formInput.path}/${formInput.login}`).then(data => onCheckPassword(data)).catch(() => {setError(true); setLoading(false)})
    }

    const onChangeValue = (e) => {
        const {name, value} = e.target

        setFormInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const onSubmitting = async (e) => {
        e.preventDefault();
        onGetUser();  
        setLoading(true) 
    }

    const onCheckPassword = (user) => {
        setLoading(false)
        setError(false)
        if(user.password === formInput.password){
            setValidate(true);
            setFormInput({
                login: '',
                password: ''
            })
            console.log('Log in!')
            console.log(user)
        } else{
            setValidate(false);
            setFormInput((prevData) => ({
                ...prevData,
                password: ''
            }))
        }
    }

    const load = loading ? <Spinner/> : null
    const mistake = error ? <ErrorMessage/> : null
    const view = (!loading && !error) ? <View onSubmitting={onSubmitting} path={formInput.path} login={formInput.login} password={formInput.password} validate={validate} onChangeValue={onChangeValue}/> : null

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
    const {onSubmitting, path, login, password, validate, onChangeValue} = props;
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
                            placeholder={validate ? "пароль" : "некоректний пароль"}
                            name='password'
                            onChange={onChangeValue}
                            value={password}
                            className={validate ? "input input__second" : "input input__second active"}/>
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
                    <a href="" className='reg__link'>Зареєструватися</a>
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