
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './redux/store'
import {Provider} from 'react-redux'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import {createBrowserRouter} from 'react-router-dom'


//Auth
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import GenreList from './pages/Admin/GenreList.jsx';
import CreateMovie from './pages/Admin/CreateMovie.jsx';
import AdminMoviesList from "./pages/Admin/AdminMoviesList.jsx";
import UpdateMovie from "./pages/Admin/UpdateMovie.jsx";
import AllMovies from './pages/Movies/AllMovies.jsx';

//Restricted
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import Home from './pages/Home.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
        <Route index={true} element={<Home />} />
        <Route path='/movies/' element={<AllMovies />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='' element={<AdminRoute />}>
            <Route path='/admin/movies/genres' element={<GenreList />} />
            <Route path='/admin/movies/create' element={<CreateMovie />} />
            <Route path='/admin/movies-list' element={<AdminMoviesList />} />
            <Route path='/admin/movies/update/:id' element={<UpdateMovie />} />
        </Route>

        </Route>
    )
)

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);