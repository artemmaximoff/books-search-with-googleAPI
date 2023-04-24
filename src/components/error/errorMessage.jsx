import React from "react";
import s from '../error/errorMessage.module.css'

export const ErrorMessage = ({ error }) => {
    return (
        <>
            <div className={s.error}>
                {error}
            </div>
        </>
    )
}