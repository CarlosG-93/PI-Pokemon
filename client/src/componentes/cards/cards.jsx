import Card from "../card/card";

import style from './cards.module.css'

const Cards = ({ pokemons, nameClass }) => {
    console.log("allPokemon:", pokemons);
    return (
        <div className={style.cardList}>
            {pokemons && pokemons.map((p) => <Card
                key={p.id}
                id={p.id}
                name={p.name}
                img={p.img}
                types={p.types}
                className={'imagen'}
            />)}
        </div>
    )
};

export default Cards;