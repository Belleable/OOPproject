import React, { useEffect } from 'react';
import { useState } from 'react';
import './PetInfo.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const PetInfo = () => {
    function filterTable() {
        const dropdown = document.querySelector("#status");
        let selectValue = dropdown.value;
        const table = document.querySelector("#vaccine-table");
        let rows = table.getElementsByTagName("tr");

        for (var i = 0; i < rows.length; i++) {
            let row = rows[i];
            let status = row.cells[0].className;

            if (selectValue === "all" || status === selectValue) {
                row.style.display = "";
            }
            else {
                row.style.display = "none";
            }
        }
    }

    const [pets, setPet] = useState([]);

    // State for the second set of data
    const [vaccines, setVaccine] = useState([]);

    useEffect(() => {
        // Fetch data from the first path
        const fetchPet = async () => {
            try {
                const response = await axios.get(`/api/pets/${petId}`);
                setPet(response.data);
            } catch (error) {
                console.error('Error fetching pet data:', error);
            }
        };

        // Fetch data from the second path
        const fetchVaccine = async () => {
            try {
                const response = await axios.get('your-second-endpoint');
                setVaccine(response.data);
            } catch (error) {
                console.error('Error fetching vaccine data:', error);
            }
        };

        // Call the functions to fetch data when the component mounts
        fetchPet();
        fetchVaccine();
    }, [petID]);

    return (
        <div className="petInfo">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Your pet's information</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            
            <body>
                {pets.map(pet => (

                    <div className="Tnfo" key={pet.petID}>
                        {pet.petID && <img src={pet.petPfp} />}
                        <div class="text">
                            <h1>{pet.petName}</h1>
                            <table>
                                <tr>
                                    <th>Type :</th>
                                    <td id="Type">{pet.petType}</td>
                                </tr>
                                <tr>
                                    <th>DoB :</th>
                                    <td id="DoB">{pet.petDoB}</td>
                                </tr>
                                <tr>
                                    <th>Age :</th>
                                    <td id="Age">{pet.petAge}</td>
                                </tr>
                            </table>
                        </div>
                        <a href="#"><i class="fa-solid fa-pen-to-square"></i></a>
                    </div>

                ))}

                <div class="vaccinelist">

                    <div class="HeaderVacc">
                        <h2>Vaccination</h2>
                        <form action="">
                            <div class="select" onChange={filterTable()}>
                                <select id="status" >
                                    <option value="all">All</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Incomplete">Incomplete</option>
                                    <option value="ongoing">On going</option>
                                </select>
                            </div>
                        </form>
                    </div>

                    <table id="vaccine-table">
                        <tr>
                            <th>Vaccine</th>
                            <th>Status</th>
                        </tr>
                        <tr>
                            <td class="Completed" >V1</td>
                            <td>Completed</td>
                        </tr>
                        <tr>
                            <td class="Incomplete">V2</td>
                            <td>Incompleted</td>
                        </tr>
                        <tr>
                            <td class="ongoing">V3</td>
                            <td> next appointment is... </td>
                        </tr>
                    </table>
                    {vaccines.map(vaccine => (
                        <table id="vaccine-table" key={vaccine.vacID}>
                            <tr>
                                <th>Vaccine</th>
                                <th>Status</th>
                            </tr>
                            {(() => {
                                if (vaccine.status === 'Completed') {
                                    return (
                                        <tr key={vaccine.vacID} className="Completed">
                                            <td>{vaccine.vacName}</td>
                                            <td>{vaccine.disease}</td>
                                            <td>{vaccine.status}</td>
                                        </tr>
                                    );
                                } else if (vaccine.status === 'Incomplete') {
                                    return (
                                        <tr key={vaccine.vacID} className="Incomplete">
                                            <td>{vaccine.vacName}</td>
                                            <td>{vaccine.disease}</td>
                                            <td>{vaccine.status}</td>
                                        </tr>
                                    );
                                } else if (vaccine.status === 'Ongoing') {
                                    return (
                                        <tr key={vaccine.vacID} className="ongoing">
                                            <td>{vaccine.vacName}</td>
                                            <td>{vaccine.disease}</td>
                                            <td>Next appointment is...{vaccine.date}</td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Handle other cases or provide a default
                                }
                            })()}
                        </table>
                    ))}


                    <a href="#"><i class="fa-solid fa-book-medical fa-4x"></i></a>
                </div>
            </body>
            <nav className="navigate">
                <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                <Link to="/"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
            </nav>
        </div>
    )
}

export default PetInfo;
