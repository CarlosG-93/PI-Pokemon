import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTypes, postPokemon } from '../../redux/actions/actions';

import style from './form.module.css';

const stringRegExp = /^[a-zA-Z]{1,20}$/;
const numberRegExp = /^([1-9][0-9]{0,2}|1000)$/;
const urlRegExp = /(http|https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/;


const validate = (state, name) => {
    let error = {}
    if (name === 'name') {
        if (state.name == '') error.name = 'Falta el nombre del Pokemon'
        if (state.name !== '' && !stringRegExp.test(state.name)) { error.name = 'Solo debe contener letras el nombre' }
        if (state.name.split('').map((leter) => { if (Number(leter)) error.name = 'No debe contener numeros el nombre' })) { }
    }
    return error;
}



const Form = () => {

    const dispatch = useDispatch();
    const types = useSelector(state => state.types);

    const [state, setState] = useState({
        name: '',
        hp: 1,
        attack: 1,
        defense: 1,
        speed: 1,
        height: 1,
        weight: 1,
        img: '',
        types: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        img: '',
        types: '',
    });

    useEffect(() => {
        dispatch(getTypes())
    }, []);

    const handleChange = (event) => {

        if ((event.target.name === 'name') && (event.target.value.length > 1)) {
            if (!stringRegExp.test(event.target.value)) {
                return false;
            }
        }

        if ((event.target.name === 'name') && (event.target.value.length >= 13)) {
            setErrors({
                ...errors,
                [event.target.name]: 'El nombre no puede ser mayor a 12 caracteres'
            })
            return false;
        }

        if ((event.target.name === 'height') || (event.target.name === 'weight')) {
            if (!numberRegExp.test(event.target.value) && event.target.value.length !== 0) {
                setErrors({
                    ...errors,
                    [event.target.name]: '999 es el maximo'
                })
                return false;
            }
        }

        setState({
            ...state,
            [event.target.name]: event.target.value
        })

        setErrors(validate({
            ...state,
            [event.target.name]: event.target.value
        }, event.target.name))
    }

    const handleChangeType = (event) => {

        if (event.target.value === "0") return;

        if (state.types.filter(type => (type.name === event.target.value)).length === 0) {
            let newType = { 'name': event.target.value };
            setState({
                ...state,
                types: [...state.types, newType]
            })

            setErrors(validate({
                ...state,
                types: [...state.types, newType]
            }, event.target.name));

            if (state.types.length === 2 - 1) {
                event.target.disabled = true;
            }
        }
        event.target.value = '0';
    }

const handleClose = (event) => {
    let newTypes = state.types.filter(type => type.name !== event.target.value);
    setState({
        ...state,
        types: newTypes
    });

    if(state.types.length < 2 + 1){
        document.getElementById("typesSelect").disabled = false;
    }

    setErrors(validate({
        ...state,
        types: newTypes
    }));
}

const onChangeRange = (event) => {
    setState({
        ...state,
        [event.target.name]: event.target.value
    });
}

const handleSubmit = (event) => {
    event.preventDefault()
        dispatch(postPokemon(state))
    
}


    return (
        <div className={style.divForm}>
            <form onSubmit={handleSubmit} className={style.form}>

                <div className={style.divTitle}>
                    <h1 className={style.title}>Create Pokemon</h1>
                </div>

                <div className={style.containerInputs}>
                    <div className={style.inputShort}>

                        <div className={style.nameImg}>
                            <div className={style.back}>
                                <label>Name :</label>
                                <input type="text" value={state.name} placeholder='Name' name='name' onChange={handleChange} />
                                <p className={style.errors}> {errors && errors.name} </p>
                            </div>
                        </div>

                        <div className={style.nameImg}>
                            <div className={style.back}>
                                <label>Img :</label>
                                <input type="text" value={state.img} placeholder='Url img' name='img' onChange={handleChange} />
                                <p className={style.errors}> {errors && errors.img} </p>
                            </div>
                        </div>

                    </div>

                    <div className={style.inputShort}>
                        <div className={style.dosInputs}>

                            <div className={style.nameImg}>
                                <div className={style.back}>
                                    <label>Height :</label>
                                    <input type="text" value={state.height} placeholder='1  ⇄  999' name='height' onChange={handleChange} className={style.inputShorts} />
                                    <p className={style.errors}> {errors && errors.height} </p>
                                </div>
                            </div>

                            <div className={style.nameImg}>
                                <div className={style.back}>
                                    <label>Weight :</label>
                                    <input type="text" value={state.weight} placeholder='1  ⇄  999' name='weight' onChange={handleChange} className={style.inputShorts} />
                                    <p className={style.errors}> {errors && errors.weight} </p>
                                </div>
                            </div>
                        </div>

                        <div className={style.allTypes}>
                            <div className={style.title2}>
                                <label className={style.typeLabel}> TYPES: </label>
                            </div>

                            <div className={style.types}>
                                <div className={style.firstDiv}>
                                    <select disabled={state.types.length >= 2} defaultValue="0" id='typesSelect' name='types' onChange={handleChangeType} className={style.select}>
                                        <option value="0"> Select Types </option>
                                        {types.map((type, index) => (
                                            <option key={index} value={type.name}> {type.name[0].toUpperCase() + type.name.slice(1)} </option>
                                        ))}
                                    </select>
                                </div>

                                <div className={style.yourTypes}>
                                    <div className={style.divTypes}>
                                        {state.types.map((type, index) => (
                                            <div key={index} className={style.typeReady}>
                                                <button className= {style.buttonClose} value={type.name} onClick={handleClose}>X</button>
                                                <span className={style.nameSpan}> 
                                                {type.name[0].toUpperCase() + type.name.slice(1)} 
                                                </span>
                                                
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={style.itemContainerRange}>
                        <div className={style.stats}>

                            <div className={style.rangeGroup}>
                                <span className={style.labelRange}>HP</span>
                                <input type="range" name='hp' onChange={onChangeRange} min={1} max={255} value={state.hp} />
                                <span className={style.labelRangeNum}> {state.hp} </span>
                            </div>

                            <div className={style.rangeGroup}>
                                <span className={style.labelRange}>ATTACK</span>
                                <input type="range" name='attack' onChange={onChangeRange} min={1} max={255} value={state.attack} />
                                <span className={style.labelRangeNum}> {state.attack} </span>
                            </div>

                            <div className={style.rangeGroup}>
                                <span className={style.labelRange}>DEFENSE</span>
                                <input type="range" name='defense' onChange={onChangeRange} min={1} max={255} value={state.defense} />
                                <span className={style.labelRangeNum}> {state.defense} </span>
                            </div>

                            <div className={style.rangeGroup}>
                                <span className={style.labelRange}>SPEED</span>
                                <input type="range" name='speed' onChange={onChangeRange} min={1} max={255} value={state.speed} />
                                <span className={style.labelRangeNum}> {state.speed} </span>
                            </div>

                        </div>
                    </div>
                </div>

                <input type="submit" value='Create' disabled={Object.keys(errors).length > 0 || !state.img || !state.name || !state.height || !state.weight || state.types.length === 0} />
                




            </form>

        </div>
    )
};

export default Form;