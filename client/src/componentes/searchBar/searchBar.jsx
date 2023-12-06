import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { closeFilter, filterName } from "../../redux/actions/actions";
import style from './searchBar.module.css'


const SearchBar = () => {

    const [state, setState] = useState({name:null});
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filter);

    const handleSubmit = (event) => {
        document.getElementById("myInput").value = ''
        event.preventDefault()
        dispatch(filterName(state.name))
        setState({
            name: null
        })
    }

    const handleChange = (e) =>{
        setState({
            name: e.target.value
        })
    }

    const handleClose = () => {
        dispatch(closeFilter())
    }
    const disabled = () => {
        if(state.name){return false}
        return true
    }

    return(
        <div className= {style.searchBar}>
            <form onSubmit = {handleSubmit} id="myForm" className= {style.formSearch}>
                <input onChange={handleChange} placeholder="Insert Pokemon..." type="text" id = "myInput" />
                <input disabled={disabled()} className= {style.search} value='Search' type="submit" />
                {filter?(<>
                    <button onClick={handleClose} className= {style.close}>Close</button>
                </>) : (<></>)}
            </form>

        </div>
    )

}

export default SearchBar;