import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Item } from "../item/item";
import { fetchBooks, setCurrentPage } from "../../store/reducers/bookSearchreducer";
import { Loader } from "../loader/loader";
import { ErrorMessage } from "../error/errorMessage";
import s from "./results.module.css"
import defaultCover from "../../assets/cover.jpg"


export const Results = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.state);
    const searchResults = state.searchResults;
    const totalResults = state.totalResults;
    const currentPage = state.currentPage;
    const itemsPerPage = state.itemsPerPage;
    const loading = state.loading;
    const error = state.error;
    const totalSearchCount = currentPage * itemsPerPage

    const handleLoadMore = () => {
        dispatch(setCurrentPage(currentPage + 1))
        dispatch(fetchBooks())
    }
    return (
        <>
            <div className={s.results}>
                <div>
                    {totalResults ? <span className={s.total}>Books finded:{totalResults}</span> : null}
                    {totalResults === 0 && <span className={s.total}>Books finded:{totalResults}</span>}
                </div>
                <div className={s.resultsRow}>
                    {searchResults.map(result => <Item
                        key={result.id}
                        id={result.id}
                        category={result.volumeInfo.categories?.[0]}
                        cover={result.volumeInfo.imageLinks?.thumbnail || defaultCover}
                        title={result.volumeInfo.title}
                        author={result.volumeInfo.authors?.[0]}
                    />)}
                </div>
                {loading && <Loader />}
                {totalResults ? <button style={totalSearchCount >= totalResults ? { display: "none" } : { display: "block" }} onClick={handleLoadMore}>Load more</button> : null}
            </div>

            {error && <ErrorMessage error={error} />}
        </>
    )
}