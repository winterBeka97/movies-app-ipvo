import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        moviesFilter: {
            searchTerm: "",
            selectedGenr: "",
            selectedYear: "",
            selectedSort: [],
        },
        filteredMovies: [],
        movieYears: [],
        unqiueYear: [],
    },

    reducers: {
        setMoviesFilter: (state, action) => {
            state.moviesFilter = {...state.moviesFilter, ...action.payload};
        },

        setFilteredMovies: (state, action) => {
            state.filteredMovies = action.payload;
        },

        setMovieYears: (state, action) => {
            state.movieYears = action.payload;
        },

        setUniqueYears: (state, action) => {
            state.unqiueYear = action.payload;
        },
    },
});

export const {
    setMoviesFilter,
    setFilteredMovies,
    setMovieYears,
    setUniqueYears,
} = moviesSlice.actions;

export default moviesSlice.reducer;
  