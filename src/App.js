// import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { loginAction } from './store/loginSlice';
import Login from './components/login';
import Todo from './components/todo';
import Loading from './components/loading';

// // Setup router
// const router = createBrowserRouter(createRoutesFromElements(
//   <Route path='/' element={<Login/>}>

//   </Route>
// ))

const host =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_DEV
        : process.env.REACT_APP_PROD;

function App() {
    // GLOBAL STATE
    const { token, userId, loading } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    // LOCAL STATE
    const [user, setUsers] = useState(null);

    // Retrive todo data
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

    return (
        <div className="relative min-h-screen bg-violet-400">
            {!user && <Login />}
            {loading && <Loading />}
            {user && !loading && <Todo data={user} />}
        </div>
    );
}

export default App;
