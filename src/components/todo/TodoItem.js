import axios from 'axios';
import { useDispatch } from 'react-redux';
import { todoAction } from '../../store/todoSlice';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function TodoItem({ todos }) {
    const dispatch = useDispatch();

    const clickHandler = (id) => {
        axios
            .delete(`${host}/api/todo/${id}`)
            .then((res) => dispatch(todoAction.setTodo(`${id} deleted`)));
    };
    return (
        <div>
            {todos.map((todo) => (
                <div
                    key={todo._id}
                    className={`my-3 flex items-center justify-between rounded-md ${
                        todo.expire ? 'bg-red-300' : 'bg-white'
                    } p-4`}
                >
                    <div className="space-y-2">
                        <p className="text-2xl">{todo.task}</p>

                        <p className="text-sm">
                            {new Date(todo.targetDate).toLocaleString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                weekday: 'long',
                            })}
                        </p>
                    </div>

                    <button
                        onClick={clickHandler.bind(null, todo._id)}
                        className="cursor-pointer rounded-md bg-red-700 py-1 px-2 text-white"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TodoItem;
