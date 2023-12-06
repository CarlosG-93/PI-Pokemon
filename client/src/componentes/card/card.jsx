import { Link } from 'react-router-dom'
import style from './card.module.css'

const Card = ({ id, name, img, types, className }) => {
    const type = types && types.map((t) => t.name[0].toUpperCase() + t.name.slice(1));
    const typea = type && type.join(' & ');

    return (
        <div className={style.cardContainer}>
            <div className={style.divName}>
                <p className={style.name}> {name && name[0].toUpperCase().concat(name.slice(1))} </p>
            </div>

            {className ? (
                <>
                    <Link to={`/detail/${id}`}>
                        <img className={style.className} src={img} alt={`Imagen de ${name}`} />
                    </Link>
                    <div className={style.divType}>
                        {typea}
                    </div>
                </>
            )
                : (
                    <>
                        <img className={style.className} src={img} alt={`Imagen de ${name}`} />
                        <div className={style.divType}>
                            {typea}
                        </div>
                    </>
                )
            }
        </div>
    )
};

export default Card;