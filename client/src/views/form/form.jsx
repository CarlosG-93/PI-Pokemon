import React from 'react';
// import { useEffect, useState } from 'react';
// import { useDispatch, useSeletor } from 'react-redux';

import style from './form.module.css';

const Form = () => {

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
                                    <select defaultValue="0" id='typesSelect' name='types' onChange={handleChangeType} className={style.select}>
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
                                                <span className={style.nameSpan}> {type.name[0].toUpperCase() + type.name.slice(1)} </span>
                                                <button value={type.name} onClick={handleClose}>X</button>
                                            </div>
                                        ))}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className= {style.itemContainerRange}>
                        
                    </div>

                </div>






            </form>

        </div>
    )
};

export default Form;