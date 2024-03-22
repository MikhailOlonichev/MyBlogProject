import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

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
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            await axios.post('http://localhost:8000/api/logout/');
            localStorage.removeItem('jwt');
            setIsLoggedIn(false);
            navigate('/login');
        } catch (error) {
            console.error('An error occurred during logout:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">Home</Link>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        {isLoggedIn ? (
                            <li className="nav-item">
                                <button className="nav-link active" onClick={logout}>Logout</button>
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
