import React, {useState} from "react";
import './styles.css';
import logoImage from '../../assets/logo.svg';
import padlock from '../../assets/padlock.png';
import {useNavigate} from 'react-router-dom';

import api from '../../services/api';


export default function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    //navigate('/home');

    async function login(e){
        e.preventDefault();
        const data = {
            username,
            password
        };

        try{
            const response = await api.post('/auth/signin', data);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('accessToken', response.data.token);

            navigate('/books');
        } catch (err){
            alert('Login failed, try again.');
        }
    }

    return(
        <div className="login-container">
            <section className="form">
                <img src={logoImage} alt="Logo"/>
                <form onSubmit={login}>
                    <h1>Access your account</h1>
                    <input
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="button">Login</button>
                </form>
            </section>

            <img src={padlock} alt="Login"/>
        </div>
    );
}