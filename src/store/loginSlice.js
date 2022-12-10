import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        token: '',
        userId: '',
        loading: false,
        logout: false,
    },
    reducers: {
        setToken(state, actions) {
            state.logout = false;
            state.token = actions.payload;
        },

        setUserId(state, actions) {
            state.userId = actions.payload;
        },

        setLoading(state, actions) {
            state.loading = actions.payload;
        },

        logout(state) {
            state.logout = true;
            state.token = '';
        },
    },
});

export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
