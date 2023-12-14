import React, { useEffect } from 'react';
import { useState } from 'react';
import '../EditPet/EditPet.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditPet = () => {
    const [pet, setPet] = useState({
        petPfp: "",
        petName: "",
        petType: "",
        petGender: "",
        petDoB: ""
    });

    const navigate = useNavigate()
    const location = useLocation()

    const petId = location.pathname.split("/")[2]

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

    const handleChange = (e) => {
        setPet((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await axios.get(`/api/users/${petId}`); // Replace with your API endpoint
                setPet(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchPetData();
    }, [petId]);

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/users/${petId}`, pet); // Replace with your API endpoint
            navigate("/")
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div className='EditPet'>
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Add pet</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <div class="back">
                <a href="#"><Link to='/'><i class="fa-solid fa-chevron-left fa-3x"></i></Link></a>
            </div>
            <main>
                <form action="" onSubmit={handleClick}>
                    <div class="container">
                        <div class="img-area" data-img="">
                            <i class='bx bxs-cloud-upload icon'></i>
                            <h3>Upload Image</h3>
                            <p>Image size must be less than <span>2MB</span></p>
                        </div>
                        <input type="file" id="file" accept="image/*" value={pet.petPfp} />
                    </div>

                    <div class="textinfo">
                        <label for="name">Name</label>
                        <input id="name" type="text" placeholder="Name" name="petName" value={pet.petName} onChange={handleChange} />
                        <label for="type">Type</label>
                        <select id="type" name="petType" value={pet.petType} onChange={handleChange}>
                            <option value="Cat">Cat</option>
                            <option value="Dog">Dog</option>
                            <option value="Rabbit">Rabbit</option>
                        </select>
                        <p>Gender</p>
                        <div class="selectGender">
                            <div>
                                <input id="male" type="radio" value="Male" name="petGender" onChange={handleChange} />
                                <label for="male">Male</label>
                            </div>
                            <div>
                                <input id="female" type="radio" value="Female" name="petGender" onChange={handleChange} />
                                <label for="female">Female</label>
                            </div>
                        </div>
                        <label for="DoB">Birthday:</label>
                        <input id="DoB" type="date" name="petDoB" value={pet.petDoB} onChange={handleChange} />
                        <div class="CancelAndSubmit">
                            <button id="cancel" class="button">Cancel</button>
                            <button id="submit" class="button" type="submit" name="submit" onClick={handleClick}>Submit</button>
                        </div>
                    </div>
                </form>
            </main>

            <nav class="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default EditPet;