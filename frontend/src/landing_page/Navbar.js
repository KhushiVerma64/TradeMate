import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

axios.defaults.withCredentials = true; // important for session cookies

function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        axios
            .get("https://trademate-backend-oqw3.onrender.com/currentUser" , { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    setIsAuthenticated(true);
                }
            })
            .catch(() => setIsAuthenticated(false));
    }, []);

    const handleLogout = async () => {
        await axios.post("https://trademate-backend-oqw3.onrender.com/logout");
        setIsAuthenticated(false);
        localStorage.removeItem("user"); //  clear stale user
        window.location.href = "/login"; // or use navigate()
    };


    return (
        <nav className="navbar navbar-expand-lg border-bottom" style={{ backgroundColor: "#fff" }}>
            <div className="container p-2">
                {/* Brand logo */}
                <Link className="navbar-brand" to="/">
                    <img src='media/images/logo.jpg' style={{ width: "25%", }} alt='Logo' />
                </Link>

                {/* Toggler button (hamburger) */}
                <button className="navbar-toggler" type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                {/* Nav Links */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/product">Product</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/pricing">Pricing</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/support">Support</Link>
                        </li>

                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link text-danger" to="/logout" onClick={handleLogout} >Logout</Link>
                            </li>
                        )}

                    </ul>
                </div>
            </div>
        </nav >
    );
}

export default Navbar;