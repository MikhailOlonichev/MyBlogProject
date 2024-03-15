import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                    },
                });
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkAuth();
    }, []);

    const logout = async () => {
        await axios.post('http://localhost:8000/api/logout/');
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <Link to="/login" className="nav-link active" onClick={logout}>Logout</Link>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link active">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link active">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
