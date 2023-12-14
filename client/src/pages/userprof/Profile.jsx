import React, { useEffect, useState } from 'react';
import './Profile.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8800/profile");
                setProfile(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserProfile();
    }, []);

    const handleLogout = () => {
        navigate('/login');
    };


    return (
        <div className="UserProfile">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Profile</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                {profile.map(user => (

                    <div className="profile-container" key={user.id}>
                    <div class="mid-container">
                        <div class="profile-picture-container">
                            <h2>User Profile</h2>
                                {user.id && <img src={user.pfp} alt="Profile Picture" />}
                                <div class="edit-icon">
                                    <Link to="/edit-user"><i class="fas fa-edit fa-2x"></i></Link>
                                </div>
                        </div>
                    </div>
                    <table>
                        <tr>
                            <th>Username:</th>
                            <td id="username" name="username">{user.username}</td>
                        </tr>
                        <tr>
                            <th>First Name:</th>
                            <td id="fname" name="fname">{user.fname}</td>
                        </tr>
                        <tr>
                            <th>Last Name:</th>
                            <td id="lname" name="lname">{user.lname}</td>
                        </tr>
                        <tr>
                            <th>Email:</th>
                            <td id="email" name="email">{user.email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number:</th>
                            <td id="phone" name="phone">{user.phone}</td>
                        </tr>
                    </table>
                    <button id="logout" role="button" onClick={handleLogout}>Log out</button>
                </div>

                ))}
                

                <nav class="navigate">
                    <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                    <Link to="/"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                    <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
                </nav>
            </body>

        </div>
    )
}

export default Profile;
