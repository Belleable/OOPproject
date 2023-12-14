import React, { useEffect } from 'react';
import { useState } from 'react';
import './stylehomepage.css'; 
import { Helmet } from 'react-helmet';
import logoDog from './logodog.png';
import axios from 'axios';
import { Link } from "react-router-dom";

const Pet = () => {
    const [pets, setPet] = useState([]);

    useEffect(()=>{
        const fetchAllPets = async ()=>{
            try{
                const res = await axios.get("http://localhost:8800/home");
                setPet(res.data);
            }catch(err){
                console.log(err);
            }
        }
        fetchAllPets();
    }, []);
    
    return (
        <div className="home">
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Home</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <header>
                <img src={logoDog} alt="Logo" />
                <nav className="Profile">
                    <a href="#"><i className="fa-solid fa-bell fa-2x"></i></a>
                    <a href="#" className="user"><i className="fa-solid fa-user fa-2x"></i></a>
                </nav>
            </header>
            <main>
                <div class="Pet">
                    {pets.map(pet=>(
                        <figure className='pet' key={pet.petID}>
                            <Link to={`/pet/${pet.petID}`} style={{ textDecoration: 'none' }}>
                                {pet.id && <img src={pet.petPfp} alt="" />}
                                <figcaption>{pet.petName}</figcaption>
                            </Link>
                        </figure>
                    ))}
                    
                    
                    <figure>
                        <Link to='/add-pet'><img
                            src="https://hips.hearstapps.com/hmg-prod/images/chow-chow-portrait-royalty-free-image-1652926953.jpg?crop=0.44455xw:1xh;center,top&resize=980:*" />
                            <figcaption>Aert</figcaption></Link>
                    </figure>
                    <figure>
                        <img
                            src="https://hips.hearstapps.com/hmg-prod/images/chow-chow-portrait-royalty-free-image-1652926953.jpg?crop=0.44455xw:1xh;center,top&resize=980:*"/>
                            <figcaption>BBBB</figcaption>
                    </figure>
                    <div class="addpet">
                        <a href="#"><Link to="/add-pet"><i class="fa-solid fa-plus fa-4x"></i></Link></a>
                    </div>
                </div>
            </main>
            <nav className="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default Pet;