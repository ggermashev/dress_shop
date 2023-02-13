import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Menu} from "./Components/Menu";
import {Main} from "./Components/Main";
import {Login} from "./Components/Login";
import {Registration} from "./Components/Registration";
import {Logout} from "./Components/Logout";
import {Footer} from "./Components/Footer";
import {Dress} from "./Components/Dress";
import {About} from "./Components/About";
import {Profile} from "./Components/Profile";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "",
        element: <About/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/registration',
        element: <Registration/>
    },
    {
        path: '/logout',
        element: <Logout/>
    },
    {
        path: "/dress/:id",
        element: <Dress/>
    },
    {
        path: "/shop",
        element: <Main/>
    },
    {
        path: "/profile",
        element: <Profile/>
    },
])

root.render(
    <React.StrictMode>
        <Menu/>
        <RouterProvider router={router}/>
        <Footer/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
