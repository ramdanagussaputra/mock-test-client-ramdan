import React from 'react';

function TodoItem({ todos }) {
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

                    <button className="cursor-pointer rounded-md bg-red-700 py-1 px-2 text-white">
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TodoItem;
