import {apiSlice} from './apiSlice';
import { MOVIE_URL, UPLOAD_URL } from '../constants';
import { deleteComment, getNewMovie, getRandomMovie, getSpecificMovie, getTopMovie } from '../../../../backend/controllers/movieController';

export const moviesApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllMovies: builder.query({
            query: () => `${MOVIE_URL}/all-movies`,
        }),
        createMovie: builder.mutation({
            query: (newMovie) => ({
                url: `${MOVIE_URL}/create-movie`,
                method: 'POST',
                body: newMovie
            }),
        }),

        updateMovie: builder.mutation({
            query: ({id, updatedMovie}) => ({
                url: `${MOVIE_URL}/update-movie/${id}`,
                method: 'PUT',
                body: updatedMovie,
            }),
        }),
        updateMovieReview: builder.mutation({
            query: ({id, rating, comment}) => ({
                url: `${MOVIE_URL}/${id}/reviews`,
                method: 'POST',
                body: { rating, id, comment},
            }),
        }),
        deleteComment: builder.mutation({
            query: ({movieId, reviewId}) => ({
                url: `${MOVIE_URL}/delete-comment`,
                method: 'DELETE',
                body: {movieId, reviewId},
            }),
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `${MOVIE_URL}/delete-movie/${id}`,
                method: 'DELETE',
            }),
        }),
        getSpecificMovie: builder.query({
            query: (id) => `${MOVIE_URL}/specific-movie/${id}`,
        }),
        uploadImage: builder.mutation({
            query: (formData) => ({
                url: `${UPLOAD_URL}`,
                method: 'POST',
                body: formData,
            }),
        }),
        getNewMovie: builder.query({
            query: () => `${MOVIE_URL}/new-movie`,
        }),
        getTopMovie: builder.query({
            query: () => `${MOVIE_URL}/top-movie`,
        }),
        getRandomMovie: builder.query({
            query: () => `${MOVIE_URL}/random-movie`,
        }),
    }),
});

export const { useGetAllMoviesQuery, useCreateMovieMutation, useUpdateMovieMutation, useUpdateMovieReviewMutation,
    useDeleteCommentMutation, useDeleteMovieMutation, useGetNewMovieQuery, useGetRandomMovieQuery, 
    useGetSpecificMovieQuery, useGetTopMovieQuery, useUploadImageMutation,
} = moviesApiSlice;