import { createBrowserRouter, redirect } from "react-router-dom";
import LayOut from "./Layout/layout";
import HomePage from "./views/HomePage";
import RoomPage from "./views/RoomPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import MyBookings from "./views/MyBookings";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayOut />,
        children: [
            {
                path: "/",
                element: <HomePage />    
            }
        ]
    },
    {
        path: "/rooms",
        element: <LayOut />,
        loader: () => {
            const isLogin = localStorage.getItem("access_token");
            if (isLogin) {
                return null;
            } else {
                return redirect("/login");
            }
        },
        children: [
            {
                path: "/rooms",
                element: <RoomPage />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            const isLogin = localStorage.getItem("access_token");
            if (isLogin) {
                return redirect("/");
            } else {
                return null;
            }
        },
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/my-bookings",
        element: <LayOut />,
        loader: () => {
            const isLogin = localStorage.getItem("access_token");
            if (isLogin) {
                return null;
            } else {
                return redirect("/login");
            }
        },
        children: [
            {
                path: "/my-bookings",
                element: <MyBookings />
            }
        ]
    }
])