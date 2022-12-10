import TodoInput from './TodoInput';
import TodoItem from './TodoItem';

function Todo({ data: { id, name, todos } }) {
    return (
        <div className="mx-auto max-w-md py-12">
            <h2 className="mb-3 text-center text-xl uppercase text-white">{`Hi, ${name}`}</h2>
            <TodoInput userId={id} />
        </div>
    );
}

export default Todo;
