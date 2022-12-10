import { useDispatch } from 'react-redux';
import { loginAction } from '../../store/loginSlice';

function Logout() {
    const dispatch = useDispatch();

    // HANDLER
    const clickHandler = () => {
        dispatch(loginAction.logout());
    };
    return (
        <button
            onClick={clickHandler}
            className="cursor-pointer rounded-md bg-red-700 py-2 px-4 text-white"
        >
            Logout
        </button>
    );
}

export default Logout;
