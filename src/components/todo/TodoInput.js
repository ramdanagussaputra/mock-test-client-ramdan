import { useRef } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { todoAction } from '../../store/todoSlice';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function TodoInput({ userId }) {
    // REF
    const taskRef = useRef();
    const dateRef = useRef();

    // GLOBAL STATE
    const { token } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    // HANDLER
    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post(
                `${host}/api/todo/${userId}`,
                {
                    task: taskRef.current.value,
                    targetDate: new Date(dateRef.current.value),
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => dispatch(todoAction.setTodo(res.data.data)))
            .catch((err) => alert('Please input task and/or valid date'));

        taskRef.current.value = '';
        dateRef.current.value = '';
    };
    return (
        <form onSubmit={submitHandler} className="space-y-6 rounded-md bg-white p-8">
            <div className="flex w-72 flex-col gap-y-2">
                <label>Task</label>
                <input
                    ref={taskRef}
                    type="text"
                    className="rounded-md border border-violet-700 p-2 outline-none"
                />
            </div>

            <div className="flex w-72 flex-col gap-y-2">
                <label>Due date</label>
                <input ref={dateRef} type="date" />
            </div>

            <button className="cursor-pointer rounded-md bg-violet-700 py-2 px-4 text-white">
                Create Todo
            </button>
        </form>
    );
}

export default TodoInput;
