import React, { useEffect } from 'react';
import { useState } from 'react';
import './Register.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const Register = () => {

    return (
        <div className="Register">
            <Helmet>
                <meta charset="UTF-8"/>
                <title>Sign Up</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Helmet>
            <body>
                <div class="container">
                    <div class="title">Registration</div>
                    <div class="content">
                        <form action="#">
                            <div class="user-details">
                                <div class="input-box">
                                    <span class="details">First Name</span>
                                    <input type="text" placeholder="Enter your first name" id="fname" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Last Name</span>
                                    <input type="text" placeholder="Enter your last name" id="lname" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Username</span>
                                    <input type="text" placeholder="Enter your username" id="username" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Email</span>
                                    <input type="text" placeholder="Enter your email" id="email" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Phone Number</span>
                                    <input type="text" placeholder="Enter your number" id="phone" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Password</span>
                                    <input type="text" placeholder="Enter your password" id="pw" required/>
                                </div>
                                <div class="input-box">
                                    <span class="details">Confirm Password</span>
                                    <input type="text" placeholder="Confirm your password" id="conf_pw" required/>
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