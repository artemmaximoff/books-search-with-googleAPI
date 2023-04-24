import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import s from "../header/header.module.css"
import bg from '../../assets/1657677678_4-kartinkin-net-p-knizhnaya-polka-kartinki-4.jpg'
import { fetchBooks, setSearchTerm, setSelectedCategory, setRelevance, setCurrentPage } from "../../store/reducers/bookSearchreducer";
import { useNavigate } from 'react-router-dom';


export const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.state);
    const searchTerm = state.searchTerm;
    const selectedCategory = state.selectedCategory;
    const relevance = state.relevance;


    const handleTermChange = (e) => {
        const searchTerm = e.target.value;
        dispatch(setSearchTerm(searchTerm));
    }

    const handleSearch = () => {
        dispatch(fetchBooks());
        navigate("/");
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(fetchBooks());
            navigate("/");
        }
    }

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        dispatch(setSelectedCategory(selectedCategory));
        dispatch(setCurrentPage(1));
        dispatch(fetchBooks());
    }
    const handleRelevanceChange = (e) => {
        dispatch(setRelevance(e.target.value));
        dispatch(setCurrentPage(1));
        dispatch(fetchBooks());
    }


    return (
        <>
            <div className={s.header}>
                <h2>Search for books</h2>
                <div>
                    <div className={s.search}>
                        <input type="search" value={searchTerm} onChange={handleTermChange} onKeyDown={handleKeyDown} ></input>
                        <button onClick={handleSearch}>
                            <img src="https://cdn-icons-png.flaticon.com/512/58/58427.png?w=360" alt="" className={s.searchIcon} />
                        </button>
                    </div>
                    <div>
                        <span className={s.filter}>categories: </span>
                        <span>
                            <select value={selectedCategory} onChange={handleCategoryChange}>
                                <option value={' '}>all</option>
                                <option>art</option>
                                <option>computers</option>
                                <option>history</option>
                                <option>medical</option>
                                <option>poetry</option>
                            </select>
                        </span>
                        <span className={s.filter} > sorting by: </span>
                        <span>
                            <select value={relevance} onChange={handleRelevanceChange}>
                                <option>relevance</option>
                                <option>newest</option>
                            </select>
                        </span>

                    </div>
                </div>
                <img src={bg} className={s.bg} ></img>
            </div>
        </>
    )
}
