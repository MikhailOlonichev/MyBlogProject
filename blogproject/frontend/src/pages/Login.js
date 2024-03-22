import React, { useState } from "react";
import { SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [errors, setErrors] = useState({
        username: false,
        password: false
    });
    const [userNotFound, setUserNotFound] = useState(false); // Новое состояние для отслеживания ошибки "пользователь не найден"

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setErrors({
                username: !username,
                password: !password
            });
            showToast("Please fill out all fields!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password
            });

            localStorage.setItem('jwt', response.data.access);
            setRedirect(true);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('User not found:', error);
                setUserNotFound(true); // Устанавливаем состояние userNotFound в true, чтобы отобразить сообщение об ошибке
                setErrors({
                    username: true,
                    password: false
                });
                showToast("User does not exist! Please register.");
            } else {
                console.error('An error occurred during authentication:', error);
            }
        }
    }

    const showToast = (message: string) => {
        const toast = document.getElementById('myToast');
        toast.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    };

    if (redirect) {
        return <Navigate to="/" replace />;
    }

    return (
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <div className="form-floating">
                <input type="username" className={`form-control ${errors.username ? 'is-invalid' : ''}`} placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <label htmlFor="floatingInput">Username</label>
                {errors.username && <div className="invalid-feedback">Username is required</div>}
            </div>

            <div className="form-floating">
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="floatingPassword" placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
                {errors.password && <div className="invalid-feedback">Password is required</div>}
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>

            {/* Блок для вывода уведомления Toast */}
            <div
                id="myToast"
                className="toast align-items-center bg-danger"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
                style={{
                    fontSize: '1.0rem',
                    color: 'white',
                    width: '100%',
                    textAlign: 'center',
                    height: '50px',
                    paddingTop: '10px'
                }}
            >
                <div className="toast-body">
                    {/* Здесь будет отображаться сообщение об ошибке */}
                    {userNotFound ? "User does not exist! Please register." : "Please fill out all fields"}
                </div>
            </div>
        </form>
    );
};

export default Login;

