import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Logout from '../logout';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function Todo({ userData: { id, name, todos: initialTodos } }) {
    // GLOBAL STATE
    const { token } = useSelector((state) => state.login);
    const { todo } = useSelector((state) => state.todo);

    // LOCAL STATE
    const [todos, setTodos] = useState(initialTodos);

    // SIDE EFFECTS
    useEffect(() => {
        if (!token) return;
        axios
            .get(`${host}/api/user/${id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setTodos(res.data.data.todos))
            .catch((err) => console.log(err));
    }, [id, token, todo]);

    return (
        <div className="mx-auto max-w-md space-y-7 py-12">
            <div className="flex items-center justify-between">
                <h2 className=" text-center text-xl uppercase text-white">{`Hi, ${name}`}</h2>
                <Logout />
            </div>

            <TodoInput userId={id} />
            {todos && <TodoItem todos={todos} />}
            {todos.length === 0 && <p>Todo empty</p>}
        </div>
    );
}

export default Todo;
