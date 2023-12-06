import { Link } from 'react-router-dom'
import style from './navbar.module.css'

const Navbar = () => {

    return(
        <div className= {style.navContenedor}>
            <div className= {style.divLinks}>
                <Link to = "/home" className= {style.home}> Home </Link>
                <Link to = "/form" className= {style.form}> Crea tu Pokemon </Link>
            </div>
            <div className= {style.navImg}>
                <Link to = "/" > <img src='../../../public/pokemon.png' alt= "pokemon" /> </Link>

            </div>
            
        </div>
    )
};

export default Navbar;