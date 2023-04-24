import React from "react";
import { NavLink } from "react-router-dom";
import s from "./item.module.css"




export const Item = ({ cover, title, author, category, id, }) => {
    return (
        <>
            <div className={s.itemInfo}>
                <div className={s.item}>
                    <NavLink to={'book/' + id}>
                        <div>
                            <img src={cover}></img>
                        </div>
                    </NavLink>
                    <span className={s.category}>{category}</span>
                    <span className={s.title} >{title}</span>
                    <span className={s.author}>{author}</span>
                </div>
            </div>
        </>
    )
}