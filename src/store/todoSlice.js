import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
    name: 'Todo',
    initialState: {
        todo: null,
    },
    reducers: {
        setTodo(state, actions) {
            state.todo = actions.payload;
        },
    },
});

export const todoAction = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
