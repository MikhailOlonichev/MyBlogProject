import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                email,
                password
            });

            localStorage.setItem('jwt', response.data.access);      //сохранение в хранилище
            setRedirect(true); // перенаправляем пользователя на домашнюю страницу
        } catch (error) {
            console.error('An error occurred during authentication:', error);
            // тут возможно добавление обработки ошибок
        }
    }

    if (redirect) {
        return <Navigate to="/" replace />;     //конец перенаправления
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="username" className="form-control" placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    );
};
export default Login;
