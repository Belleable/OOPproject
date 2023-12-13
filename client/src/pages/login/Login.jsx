import React, { useEffect } from 'react';
import { useState } from 'react';
import './login.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const Login = () => {
    
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
                    <form action="/login" method="post">
                        <i class="fa-solid fa-paw fa-6x"></i>
                        <div>
                            <div class="input-container">
                                <input type="text" required="" id="username" />
                                <label for="username">Username</label>
                            </div>
                            <div class="input-container">
                                <input type="password" required="" id="pw" />
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