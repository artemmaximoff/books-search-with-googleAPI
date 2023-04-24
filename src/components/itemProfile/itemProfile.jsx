import React from "react";
import s from "./itemProfile.module.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookProfile } from "../../store/reducers/bookSearchreducer";
import { useParams } from "react-router-dom";
import missingCover from "../../assets/missingbook.jpg"


export const ItemProfile = () => {
    const dispatch = useDispatch();
    const params = useParams()
    const bookId = params.bookId
    const bookProfile = useSelector(state => state.state.bookProfile);
    useEffect(() => {
        dispatch(fetchBookProfile(bookId))
    }, [])

    return (
        <>
            <div className={s.itemProfireInfo}>
                <div className={s.itemProfile} >

                    {bookProfile.imageLinks?.thumbnail
                        ?
                        <div className={s.itemCover}>
                            <img src={bookProfile.imageLinks?.thumbnail} ></img>
                        </div>
                        :
                        <div className={s.itemCover}>
                            <img src={missingCover}></img>
                        </div>
                    }

                    <div className={s.itemInfo}>
                        <div className={s.category}>{bookProfile?.categories?.[0]}</div>
                        <div className={s.title}>{bookProfile?.title}</div>
                        <div className={s.author}>{bookProfile?.authors}</div>
                        {bookProfile.description && <div className={s.description}>{bookProfile?.description}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}