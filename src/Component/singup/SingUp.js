import { useState } from 'react'

import { useHttp } from '../../hooks/useHttp'
import Spinner from '../Spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import ProofMessage from '../proofMessage/ProofMessage'

import './singup.css'
import '../../reset.css'

import up_bg from '../../img/up_bg.png'
import down_bg from '../../img/down_bg.png'
import dog_bg from '../../img/dog_bg.png'
import google from '../../img/google.svg'
import apple from '../../img/apple.svg'

const SignUp = () => {
    const [formInput, setFormInput] = useState({
        name: '',
        email: '',
        id: '',
        password: '',
        subject: ''
        
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [proof, setProof]  = useState(false)

    const {request} = useHttp();

    const onCreateTeacher = (data) => {
        try{
            request(`http://localhost:3001/teacher`, 'POST', JSON.stringify(data)).then(() => {setLoading(false); setProof(true)})
            
        } catch(e){
            setLoading(false)
            setProof(false)
            setError(true)
        }
    }

    const onChangeValue = (e) => {
        const {name, value} = e.target

        setFormInput((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const onSubmitting = (e) => {
        e.preventDefault();
        onCreateTeacher(formInput)
        setLoading(true) 
    }

    const proofMessage = proof ? <ProofMessage/> : null
    const load = loading ? <Spinner/> : null
    const mistake = error ? <ErrorMessage/> : null
    const view = (!loading && !error && !proof) ? <View onSubmitting={onSubmitting} name={formInput.name} subject={formInput.subject}  email={formInput.email} login={formInput.id} password={formInput.password} onChangeValue={onChangeValue}/> : null

    let displayStyle = load || error || proofMessage ? "other__content" : "login__section"
    return(
        <div className={displayStyle} >
            {proofMessage}
            {load}
            {mistake}
            {view}
        </div>
    )
}

const View = (props) => {
    const {onSubmitting, subject, name, login, password, email, onChangeValue} = props;
    return(
        <>
            <div className='background__img__cosmo'>
                <img src={dog_bg} alt="" className='dog_bg'/>
            </div>
            <div className="login__inner">
                <div className='title__sign__inner'>
                    <h1 className='title__sign'>Реєстрація</h1>
                    <p className='text__sign'>Ви можете зареєструватися, тільки якщо ви вчитель!</p>
                </div>
                <form onSubmit={onSubmitting} className='input__inner'>
                    <input type="text" 
                            placeholder="ваше імʼя та фамілія"
                            name='name'
                            value={name}
                            onChange={onChangeValue}
                            className="input"/>
                    <input type="text" 
                            placeholder="пошта"
                            name='email'
                            value={email}
                            onChange={onChangeValue}
                            className="input"/>
                    <input type="text" 
                            placeholder="логін"
                            name='id'
                            value={login}
                            onChange={onChangeValue}
                            className="input"/>
                    <input type="password" 
                            placeholder="пароль"
                            name='password'
                            onChange={onChangeValue}
                            value={password}
                            className="input"/>

                    <select 
                        required
                        className="select last__imput" 
                        name="subject"
                        value={subject}
                        onChange={onChangeValue}>
                        <option>Я викладаю</option>
                        <option value="література">Літературу</option>
                        <option value="математика">Математику</option>
                        <option value="фізика">Фізику</option>
                        <option value="історія">Історію</option>
                    </select>

                    <div className='api__login__links'>
                        <button>
                            <img src={google} alt=""/>
                        </button>
                        <button>
                            <img src={apple} alt=""/>
                        </button>
                    </div>

                    <button type='submit' className='btn_sign'>Зареєструватися</button>
                </form>

                <div className='reg__link__inner'>
                    <p className='reg__link__text'>Вже є акаунт?</p>
                    <a href="" className='reg__link'>Увійти</a>
                </div>
            </div>

            <div className="background__img__inner">
                <img src={up_bg} alt="" className='background__img'/>
                <img src={down_bg} alt="" className='background__img'/>
            </div>
        </>
    )
}

export default SignUp