import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPokemon, loadingPokemons, pokemonsPage } from "../../redux/actions/actions";
import Cards from "../../componentes/cards/cards";
import SearchBar from '../../componentes/searchBar/searchBar'
import style from './home.module.css'

const Home = () => {

    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemonsPage);
    const pokeFilter = useSelector((state) => state.pokeFilter);
    const loading = useSelector((state) => state.loadingPokemons);
    const filter = useSelector((state) => state.filter);

    const paginate = (event) => {
        dispatch((pokemonsPage(event.target.name)))
    }

    useEffect(() => {
        dispatch(loadingPokemons(true))
        dispatch(getPokemon())
    }, []);

    return (
        <div className={style.home}>
            <SearchBar />
            <div className={filter ? style.divContainerFilter : style.divContainer}>
                {
                    loading ? (<>
                        <div className= {style.divLoading}>
                            <img className= {style.loadingImg} src="../../../public/pokemon4.gif" alt="Loading..." />
                        </div>
                    </>)
                        :
                        (<>
                            <Cards nameOfClass={filter ? 'no-div' : 'div'} pokemons={filter ? pokeFilter : pokemons} />
                            {filter ? (<></>) : (<>
                                <div className= {style.divButtons}>
                                    <button onClick={paginate} name='prev' className='left'>⇦</button>
                                    <button onClick={paginate} name='next' className='right'>⇨</button>
                                </div>
                            </>)}
                        </>)
                }

            </div>

        </div>
    );

}

export default Home;