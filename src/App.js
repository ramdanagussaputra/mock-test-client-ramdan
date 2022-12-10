import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loginAction } from './store/loginSlice';
import Login from './components/login';
import Todo from './components/todo';
import Loading from './components/loading';

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function App() {
    // GLOBAL STATE
    const { token, userId, loading, logout } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    // LOCAL STATE
    const [user, setUsers] = useState(null);

    // SIDE EFFECTS
    // JWT Auth
    useEffect(() => {
        if (!token || !userId) return;

        axios
            .get(`${host}/api/user/${userId}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUsers(res.data.data);
                dispatch(loginAction.setLoading(false));
            })
            .catch((err) => alert(err));
    }, [token, userId, dispatch]);

    useEffect(() => {
        if (!logout) return;
        setUsers(null);
    }, [logout]);

    return (
        <div className="relative min-h-screen bg-violet-400">
            {!user && <Login />}
            {loading && <Loading />}
            {user && !loading && <Todo userData={user} />}
        </div>
    );
}

export default App;
