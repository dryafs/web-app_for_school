import {useSelector} from 'react-redux'

import './pageHeader.css'

import user_img from '../../img/user_img.svg'
import diamond_img from '../../img/diamond.svg'
import coin_img from '../../img/coin.svg'

const PageHeader = () => {
    const {fullInformation} = useSelector(state => state.user)
    console.log(fullInformation)

    const {name, type, coin, diamond} = fullInformation
    return(
        <header className="header">
            <div className="container__header">
                <div className="header__inner">
                    <img src={user_img} alt="" />
                    <p className="header__name">{name}</p>
                    <p className="header__class">{type}</p>

                    <div className="header__money__inner">
                        <div className="header__money">
                            <p className='diamond__count'>{diamond}</p>
                            <img src={diamond_img} alt="" className='currency__img'/>
                        </div>
                        <div className="header__money">
                            <p className='coin__count'>{coin}</p>
                            <img src={coin_img} alt="" className='currency__img'/>
                        </div>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default PageHeader