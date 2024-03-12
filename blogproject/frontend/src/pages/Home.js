import React, {useEffect, useState} from 'react';

const Home = () => {

    const [username, setUsername] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/user/', {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content = await response.json();

                setUsername(content.username);
            }
        )();
    });

    return (
        <div>
            {username ? 'Hello' + username : 'You are not logged in!'}
        </div>
    );
};

export default Home;