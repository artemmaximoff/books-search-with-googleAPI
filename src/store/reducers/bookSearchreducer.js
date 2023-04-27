import axios from 'axios';


const SET_SEARCH_TERM = "SET_SEARCH_TERM"
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULT"
const SET_LOAD_MORE = "SET_LOAD_MORE"
const SET_LOADING = "SET_LOADING"
const SET_ERROR = "SET_ERROR"
const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGOR"
const SET_RELEVANCE = "SET_RELEVANCE"
const SET_TOTAL_RESULTS = "SET_TOTAL_RESULT"
const SET_CURRENT_PAGE = "SET_CURRENT_PAG"
const SET_BOOK_PROFILE = "SET_BOOK_PROFILE"


const initialState = {
    searchTerm: '',
    searchResults: [],
    noResults: false,
    currentPage: 1,
    itemsPerPage: 12,
    totalResults: null,
    selectedCategory: '',
    relevance: 'relevance',
    bookProfile: '',
    loading: false,
    error: '',
};

export const bookSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case SET_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.payload
            };
        case SET_LOAD_MORE:
            return {
                ...state,
                searchResults: [...state.searchResults, ...action.payload,]

            };
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload,
            };
        case SET_RELEVANCE:
            return {
                ...state,
                relevance: action.payload,
            };
        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.payload,
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };
        case SET_BOOK_PROFILE:
            return {
                ...state,
                bookProfile: action.payload,
            };
        default:
            return state;
    }
};

export const setSearchTerm = (searchTerm) => {
    return {
        type: SET_SEARCH_TERM,
        payload: searchTerm,
    };
};

export const setSearchResults = (searchResults) => {
    return {
        type: SET_SEARCH_RESULTS,
        payload: searchResults,
    };
};

export const setLoadMore = (moreResults) => {
    return {
        type: SET_LOAD_MORE,
        payload: moreResults,
    };
};


export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading,
    };
};

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};

export const setSelectedCategory = (selectedCategory) => {
    return {
        type: SET_SELECTED_CATEGORY,
        payload: selectedCategory,
    };
};

export const setRelevance = (relevance) => {
    return {
        type: SET_RELEVANCE,
        payload: relevance,
    };
};

export const setTotalResults = (totalResults) => {
    return {
        type: SET_TOTAL_RESULTS,
        payload: totalResults,
    };
};

export const setCurrentPage = (currentPage) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: currentPage,
    };
};

export const setBookProfile = (bookProfile) => {
    return {
        type: SET_BOOK_PROFILE,
        payload: bookProfile,
    };
};



export const fetchBooks = () => async (dispatch, getState) => {
    const { searchTerm, currentPage, selectedCategory, relevance, itemsPerPage } = getState().state
    const startIndex = (currentPage - 1) * itemsPerPage;

    if (searchTerm) {
        dispatch(setError(''))
        dispatch(setLoading(true))
        try {
            const response = await
                axios.get(`https://www.googleapis.com/books/v1/volumes?q=+intitle:${searchTerm}+subject:${selectedCategory}+${relevance}&startIndex=${startIndex}&maxResults=${itemsPerPage}`);
            const items = response.data.items || [];
            const totalResults = response.data.totalItems

            if (currentPage === 1) {
                dispatch(setSearchResults(items));
                dispatch(setTotalResults(totalResults));

            } else {
                dispatch(setLoadMore(items));
            }

        } catch (error) {
            dispatch(setError(error.message));
        }
        finally {
            dispatch(setLoading(false));
        }
    } else {
        return
    }
}

export const fetchBookProfile = (bookId) => async (dispatch) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const bookProfile = response.data.volumeInfo;
        dispatch(setBookProfile(bookProfile));
    } catch (error) {
        dispatch(setError(error.message));
    }
}

