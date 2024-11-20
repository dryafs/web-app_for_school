import error from '../../img/errorMessage.png'

const ErrorMessage = () => {
    return(
        <div className='error__inner'>
            <img src={error} alt=""/>
            <p className='error__text' style={{'margin-top': '15px'}}>it's any mistake, try reload page or check if your login correct</p>
        </div>
    )
}

export default ErrorMessage;