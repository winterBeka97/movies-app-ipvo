import { apiSlice } from "./apiSlice"
import { USERS_URL } from "../constants"

export const userApiSlice = apiSlice.injectEndpoints({
    enpoints: (builder) => ({
        login: builder.muation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data,
        })
    }),
    }),
});

export const { useLoginMutation } = userApiSlice