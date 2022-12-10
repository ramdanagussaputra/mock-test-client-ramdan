import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../store/loginSlice';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function Login() {
    // REF
    const passwordRef = useRef();
    const userRef = useRef();

    // GLOBAL STATE
    const loginState = useSelector((state) => state.login);
    const dispatch = useDispatch();

    // LOCAL STATE
    const [users, setUsers] = useState([]);

    // SIDE EFFECTS
    // Get all user data
    useEffect(() => {
        axios
            .get(`${host}/api/user`)
            .then((res) => setUsers(res.data.data))
            .catch((err) => alert('Does not have user'));
    }, []);

    // HANDLER
    const submitHandler = (e) => {
        e.preventDefault();

        axios
            .post(`${host}/api/user/login`, {
                id: userRef.current.value,
                password: passwordRef.current.value,
            })
            .then((res) => dispatch(loginAction.setToken(res.data.token)))
            .catch((err) => alert(err.response.data.message));
    };

    return (
        <>
            <form
                onSubmit={submitHandler}
                className="absolute top-1/2 left-1/2 flex w-80 -translate-y-1/2 -translate-x-1/2 flex-col gap-y-5 rounded-md bg-white p-7 shadow-md "
            >
                <h1 className="mb-4 text-center text-3xl font-bold uppercase tracking-wider text-violet-800">
                    Login
                </h1>

                <div className="mx-auto mb-8 flex w-max flex-col gap-y-4">
                    <select
                        ref={userRef}
                        className="text-center capitalize text-violet-700 outline-none"
                    >
                        <option value={null}>Pick User</option>

                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>

                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                        className="rounded-md border border-violet-400 p-2 text-violet-700 outline-none placeholder:text-violet-400"
                    />
                </div>

                <button className="rounded-md bg-violet-700 p-2 uppercase text-white">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
