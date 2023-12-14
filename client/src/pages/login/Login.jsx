import React, { useEffect, useState } from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        pw: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('your-authentication-endpoint', {
                username: formData.username,
                pw: formData.pw,
            });

            // Assuming your server returns a success status or token
            if (response.status === 200) {
                // Successful login logic (replace with your own logic)
                console.log('Login successful!');
                navigate('/');
            } else {
                // Handle other response statuses if needed
                console.log('Login failed. Unexpected response status:', response.status);
            }
        } catch (error) {
            // Handle authentication error
            console.error('Authentication error:', error);

            // Show an alert for incorrect credentials
            alert('Incorrect username or password. Please try again.');
        }

        // Reset the form after submission
        setFormData({
            username: '',
            pw: '',
        });
    }
    return (
        <div className="Login">
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
                <title>Log In</title>
            </Helmet>
            <body>
                <div class="box">
                    <form action="/login" method="post" onSubmit={handleSubmit}>
                        <i class="fa-solid fa-paw fa-6x"></i>
                        <div>
                            <div class="input-container">
                                <input 
                                type="text" 
                                required="" 
                                id="username" 
                                name="username" 
                                value={formData.username}
                                onChange={handleChange}/>
                                <label for="username">Username</label>
                            </div>
                            <div class="input-container">
                                <input 
                                type="password" 
                                required="" 
                                id="pw" 
                                name="pw" 
                                value={formData.pw}
                                onChange={handleChange} />
                                <label for="pw">Password</label>
                            </div>
                            <input class="button" type="submit" value="Log in"/>
                            <Link to='/register'><a class="signup">Sign up</a></Link>
                        </div>
                    </form>
                </div>
            </body>
        </div>
    )
}

export default Login;