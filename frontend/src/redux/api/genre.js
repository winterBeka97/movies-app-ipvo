import { apiSlice } from "./apiSlice";
import { GENRE_URL } from "../constants";
import { createGenre, listGenres, removeGenre, updateGenre } from "../../../../backend/controllers/genreController";

export const genreApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createGenre: builder.mutation({
            query: (newGenre) => ({
                url: `${GENRE_URL}`,
                method: "POST",
                body, newGenre,
            }),
        }),
        updateGenre: builder.mutation({
            query: ({id, updateGenre}) => ({
                url: `${GENRE_URL}/${id}`,
                method: "PUT",
                body: updateGenre,
            }),
        }),
        removeGenre: builder.mutation({
            query: (id) => ({
                url: `${GENRE_URL}/${id}`,
                method: "DELETE",
            }),
        }),
        listGenresGenres: builder.query({
            query: () => `${GENRE_URL}/genres`,
        }),
    }),
});

export const {useCreateGenreMutation, useListGenresGenresQuery, useRemoveGenreMutation, useUpdateGenreMutation} = genreApiSlice;