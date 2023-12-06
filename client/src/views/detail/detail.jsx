import React from 'react';
import Card from '../../componentes/card/card'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getOnePokemon, loadingDetails } from '../../redux/actions/actions';
import style from './detail.module.css'


const Detail = () => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const pokemon = useSelector((state) => state.onePokemon)
    const loading = useSelector((state) => state.loadingDetails)

    useEffect(() => {
        dispatch(loadingDetails(true))
        dispatch(getOnePokemon(id))
    }, [id])

    let barraHp = null
    let barraAttack = null
    let barraDefense = null
    let barraSpeed = null

    if (pokemon) {
        let porcentajeHp = pokemon.hp / 255 * 100
        let porcentajeAttack = pokemon.attack / 255 * 100
        let porcentajeDefense = pokemon.defense / 255 * 100
        let porcentajeSpeed = pokemon.speed / 255 * 100

        barraHp = React.CSSProperties = { "--bar-value": porcentajeHp.toString() + '%' };
        barraAttack = React.CSSProperties = { "--bar-value": porcentajeAttack.toString() + '%' };
        barraDefense = React.CSSProperties = { "--bar-value": porcentajeDefense.toString() + '%' };
        barraSpeed = React.CSSProperties = { "--bar-value": porcentajeSpeed.toString() + '%' };
    }


    return (
        <div>
            {loading ? (<>
                <div className={style.loading}>
                    <img src="../../../public/pokemon2.gif" alt="Loading..." /> Loading...
                </div>
            </>)
                :
                (<>
                    <div className={style.containerDetail}>
                        <div className={style.containerTitle}>
                            <h1 className={style.detailsTitle}>POKEMON DETAILS</h1>
                        </div>
                        <div className={style.containerDetails}>
                            <div>
                                <div>
                                    <img className={style.detailsImg} src="https://vignette.wikia.nocookie.net/doblaje/images/c/c2/Ash_Ketchum_BW.png/revision/latest?cb=20161002052941&path-prefix=es" alt="ashe" />
                                </div>
                            </div>
                            <div className={style.detailsInfo}>
                                <Card
                                    // id={pokemon.id}
                                    name={pokemon.name}
                                    img={pokemon.img}
                                    types={pokemon.types} />
                            </div>
                            <div className={style.detailsStats}>
                                <div>
                                    <span className={style.statsTitle}>Measures</span>
                                    <ul className={style.list}>
                                        <li className={style.item}>ID: {pokemon.id} </li>
                                        <li className={style.item}>Weight: {pokemon.weight} </li>
                                        <li className={style.item}>Height: {pokemon.height} </li>
                                    </ul>
                                </div>
                                <div>
                                    <span className={style.statsTitle}>Stats</span>
                                    <div className={style.containerBars}>
                                        <div className={style.grid}>
                                            <div className={style.bar} style={barraHp}
                                                data-name={`Hp(${pokemon.hp})`} title='HP'>
                                            </div>

                                            <div className={style.bar} style={barraAttack}
                                                data-name={`Att(${pokemon.attack})`} title='Attack'>
                                            </div>

                                            <div className={style.bar} style={barraDefense}
                                                data-name={`Def(${pokemon.defense})`} title='Defense'>
                                            </div>

                                            <div className={style.bar} style={barraSpeed}
                                                data-name={`Speed(${pokemon.speed})`} title='Speed'>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </>)}

        </div>
    )
};

export default Detail;