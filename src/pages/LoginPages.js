import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import { setCookie } from '../inc/cookies';

const LoginPages = () => {
    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = {
            username: "mor_2314",
            password: "83r5^_",
        };
        fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        setCookie('user', requestBody.username, requestBody.password, 7);
        navigate('/users');

    };
    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}>
                <h1>Giriş</h1>
                <h4 className='text-left'>Kullanıcı Adı veya E-posta</h4>
                <div className="form-element">
                    <input type="text" placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <h4 className='text-left'>Parola</h4>
                <div className="form-element">
                    <input type="password" placeholder="Parola" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='remember-forgot'>
                    <label><input type="checkbox" />Beni Hatırla</label>
                    <a href="#">Şifreyi Unuttum</a>
                </div>
                <button type="submit">Giriş Yap</button>
                <div className="register-link">
                    <p>Henüz Üye Değil Misiniz? <a href="#">Kayıt Ol</a></p>
                </div>
            </form>
        </div>
    );
}
export default LoginPages;