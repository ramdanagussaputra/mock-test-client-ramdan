import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        token: '',
        userId: '',
        loading: false,
    },
    reducers: {
        setToken(state, actions) {
            state.token = actions.payload;
        },

        setUserId(state, actions) {
            state.userId = actions.payload;
        },

        setLoading(state, actions) {
            state.loading = actions.payload;
        },
    },
});

export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
