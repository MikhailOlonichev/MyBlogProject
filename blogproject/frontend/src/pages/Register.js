import React, { useState } from 'react';
import axios from 'axios';
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [registrationError, setRegistrationError] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { username: '', email: '', password: '' };

        if (!username.trim()) {
            newErrors.username = 'Username is required';
            formIsValid = false;
        } else if (!/^[a-zA-Z0-9!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`]*$/.test(username)) {
            newErrors.username = 'Username must contain only English letters, numbers, and special characters';
            formIsValid = false;
        }

        if (!email.trim()) {
            newErrors.email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
            formIsValid = false;
        }

        if (!password.trim()) {
            newErrors.password = 'Password is required';
            formIsValid = false;
        } else if (password.length < 8) {
            newErrors.password = 'Password is too short, it must contains at least 8 symbols';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/register/', {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                setUsername('');
                setEmail('');
                setPassword('');
                // перенаправление на страницу логина только в случае успешной регистрации
                navigate('/login');
            }
        } catch (error) {
            if (error.response || error.response.status === 400 || error.response.data) {
                setRegistrationError('User with this username already exists');
            } else if (error.response && error.response.data && error.response.data.detail) {
                setRegistrationError(error.response.data.detail);
            } else {
                setRegistrationError('Registration failed. Please try again.');
            }
        }
    };


    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please register</h1>

            <div className="form-floating">
                <input
                    type="text"
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                    id="floatingInput"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
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
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            {registrationError && <div className="alert alert-danger">{registrationError}</div>}

            <button className="btn btn-primary w-100 py-2" type="submit">
                Submit registration
            </button>
        </form>
    );
};

export default Register;


