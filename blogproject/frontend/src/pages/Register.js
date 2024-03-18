import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({
        username: false,
        email: false,
        password: false,
    });

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!username || !email || !password) {
            setErrors({
                username: !username,
                email: !email,
                password: !password,
            });
            return;
        }

        try {
            await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                }),
            });

            setRedirect(true);
        } catch (error) {
            console.error('An error occurred during registration:', error);
        }
    };

    if (redirect) {
        return <Navigate to="/login" replace />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input
                    type="username"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="floatingInput"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
                {errors.username && <div className="invalid-feedback">Username is required</div>}
            </div>

            <div className="form-floating">
                <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="floatingEmail"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
                {errors.email && <div className="invalid-feedback">Email is required</div>}
            </div>

            <div className="form-floating">
                <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && <div className="invalid-feedback">Password is required</div>}
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
                Submit registration
            </button>
        </form>
    );
};

export default Register;