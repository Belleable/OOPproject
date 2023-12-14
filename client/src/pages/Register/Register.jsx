import React, { useEffect } from 'react';
import { useState } from 'react';
import './Register.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        email: '',
        phone: '',
        pw: '',
        conf_pw: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.pw !== formData.conf_pw) {
            alert('Password and confirm password do not match. Please try again.');
            return;
        }

        try {

            // Send the registration data to your server
            const response = await axios.post('your-registration-endpoint', {
                fname: formData.fname,
                lname: formData.lname,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                pw: formData.pw
            });

            // Handle the response accordingly
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle registration error
            console.error('Registration error:', error);

            // Show an alert or update the UI with an error message
            alert('Registration failed. Please try again.');
        }

        // Reset the form after submission
        setFormData({
            fname: '',
            lname: '',
            username: '',
            email: '',
            phone: '',
            pw: '',
            conf_pw: '',
        });
    };

    return (
        <div className="Register">
            <Helmet>
                <meta charset="UTF-8"/>
                <title>Registration</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <body>
                <div class="container">
                    <div class="title">Registration</div>
                    <div class="content">
                        <form action="#" onSubmit={handleSubmit}>
                            <div class="user-details">
                                <div class="input-box">
                                    <span class="details">First Name</span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your first name" 
                                        id="fname" 
                                        value={formData.fname}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Last Name</span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your last name" 
                                        id="lname" 
                                        value={formData.lname}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Username</span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your username" 
                                        id="username" 
                                        value={formData.username}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Email</span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your email" 
                                        id="email" 
                                        value={formData.email}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Phone Number</span>
                                    <input 
                                        type="text" 
                                        placeholder="Enter your number" 
                                        id="phone" 
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Password</span>
                                    <input 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        id="pw" 
                                        value={formData.pw}
                                        onChange={handleChange}
                                        required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Confirm Password</span>
                                    <input 
                                        type="password" 
                                        placeholder="Confirm your password" 
                                        id="conf_pw"
                                        value={formData.conf_pw}
                                        onChange={handleChange} 
                                        required/>
                                </div>
                            </div>
                            <div class="button">
                                <input type="submit" value="Register"/>
                            </div>
                        </form>
                    </div>
                </div >
            </body >
        </div>
    )
}

export default Register;