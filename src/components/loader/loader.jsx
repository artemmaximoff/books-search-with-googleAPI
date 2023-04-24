import React from "react";
import s from '../loader/loader.module.css'

export const Loader = () => {
    return (
        <>
            <div className={s.loader}>
                <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif"></img>
            </div>
        </>
    )
}