import React, { useState, useEffect } from 'react';
import './EditUser.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditUser = () => {
    const [user, setUser] = useState({
        pfp: '',
        fname: '',
        lname: '',
        email: '',
        phone: ''
    });

    const navigate = useNavigate()
    const location = useLocation()

    const userId = location.pathname.split("/")[2]

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`); // Replace with your API endpoint
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/users/${userId}`, user); // Replace with your API endpoint
            navigate("/")
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    window.onload = function () {
        const inputFile = document.getElementById('file');
        const imgArea = document.querySelector('.img-area');

        inputFile.addEventListener('change', function () {
            const image = this.files[0]
            if (image.size < 2000000) {
                const reader = new FileReader();
                reader.onload = () => {
                    const allImg = imgArea.querySelectorAll('img');
                    allImg.forEach(item => item.remove());
                    const imgUrl = reader.result;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    imgArea.appendChild(img);
                    imgArea.classList.add('active');
                    imgArea.dataset.img = image.name;
                }
                reader.readAsDataURL(image);
            } else {
                alert("Image size more than 2MB");
            }
        })
    }

    return (
        <div className="EditUser">
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Edit User Profile</title>
                <link rel="stylesheet" href="style.css"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                <div class="back">
                    <a href="#"><i class="fa-solid fa-chevron-left fa-3x"></i></a>
                </div>

                <main>
                    <form action="" onSubmit={handleUpdateProfile}>
                        <div class="container">
                            <div class="img-area" data-img="">
                                <i class='bx bxs-cloud-upload icon'></i>
                                <h3>Upload Image</h3>
                                <p>Image size must be less than <span>2MB</span></p>
                            </div>
                            <input type="file" id="file" accept="image/*" value={user.pfp} />
                        </div>
                        <div class="textinfo">
                            <label for="fName">First Name</label>
                            <input id="fName" type="text" value={user.fname} onChange={handleChange} />
                            <label for="name">Last Name</label>
                            <input id="lName" type="text" value={user.lname} onChange={handleChange} />
                            <label for="email">Email</label>
                            <input id="email" type="text" value={user.email} onChange={handleChange} />
                            <label for="phone">Phone Number</label>
                            <input id="phone" type="tel" value={user.phone} onChange={handleChange} />
                        </div>

                        <div class="CancelAndSubmit">
                            <button id="cancel" class="button">Cancel</button>
                            <button id="submit" class="button" type="submit" name="submit">Save Changes</button>
                        </div>

                    </form>
                </main>
                <nav class="navigate">
                    <a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a>
                    <a href="#"><i class="fa-solid fa-house fa-2x"></i></a>
                    <a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a>
                </nav>
            </body>
        </div>
)}

export default EditUser;
