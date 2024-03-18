import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('An error occurred during data fetching');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                userData ? (
                    <div>
                         <h2>Welcome, {userData.username}!</h2>
                        <p>Username: {userData.username}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : (
                    <p>Unauthorized.</p>
                )
            )}
        </div>
    );
};

export default Home;
