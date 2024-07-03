/* eslint-disable react/prop-types */
import Navbar from "./Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import "./layout.css";

export default function Layout() {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [location.pathname]);
    return (
        <div id="main" className="main">
            <Navbar />
            <div style={{ height: "100vh" }}>
                <Outlet />
            </div>
        </div>
    );
}
