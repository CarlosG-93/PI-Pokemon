import { FILTER_NAME, GET_ONE_POKEMON, GET_POKEMON, PAGINATE, LOADING_DETAILS, LOADING_POKEMONS, CLOSE_FILTER, GET_TYPES, POST_POKEMON, ORDER } from '../actions/actions-types';

let initialState = {
    pokemons: [],
    pokemonsPage: [],
    currentPage: 0,
    pokefilter: [],
    onePokemon: [],
    loadingDetails: false,
    loadingPokemons: false,
    filter: false,
    types: [],
};

const reducer = (state = initialState, action) => {
    const pokemons_Per_Page = 12


    switch (action.type) {

        case GET_POKEMON:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsPage: [...action.payload].splice(0, pokemons_Per_Page),
                loadingPokemons: false
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        case FILTER_NAME:
            return {
                ...state,
                pokefilter: action.payload,
                loadingPokemons: false,
                filter: true
            }

        case PAGINATE:
            const next_page = state.currentPage + 1
            const prev_page = state.currentPage - 1
            const index = action.payload === 'next' ? next_page * pokemons_Per_Page : prev_page * pokemons_Per_Page
            if (action.payload === 'prev' && index < 0) return { ...state }
            if (action.payload === 'next' && index >= state.pokemons.length) return { ...state }
            return {
                ...state,
                currentPage: action.payload === 'next' ? next_page : prev_page,
                pokemonsPage: [...state.pokemons].splice(index, pokemons_Per_Page)
            }

        case GET_ONE_POKEMON:
            return {
                ...state,
                onePokemon: action.payload,
                loadingDetails: false,
            }

        case LOADING_DETAILS:
            return {
                ...state,
                loadingDetails: action.payload
            }

        case LOADING_POKEMONS:
            return {
                ...state,
                loadingPokemons: action.payload
            }

        case CLOSE_FILTER:
            return {
                ...state,
                filter: action.payload
            }

        case POST_POKEMON:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload],
                
            }

        case ORDER:
            let orderCopy = [ ...state.pokemons ];
                if(action.payload === "A") {
                    orderCopy.sort(
                        (a, b) => {
                            if(a.name > b.name) return 1;
                            else return -1;
                        }
                    )
                } else if (action.payload === "D") {
                    orderCopy.sort(
                        (a, b) => {
                            if(a.name < b.name) return 1;
                            else return -1;
                        }
                    )
                }
            return {
                ...state,
                pokemons: orderCopy
            }


        default: return { ...state }
    }
};

export default reducer;