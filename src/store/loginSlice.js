import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name: 'Login',
    initialState: {
        token: '',
    },
    reducers: {
        setToken(state, actions) {
            state.isLogin = actions.payload;
        },
    },
});

export const loginAction = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
