
import './bg_img.css'
import bg_img from '../../../img/bg-img__homepage.png'

const BgImg = () => {
    return(
        <div className="bg__img">
            <p className="bg-img__text">Ти молодець!</p>
            <img src={bg_img} alt="" className="bg-img__homepage" />
        </div>
    )
}

export default BgImg