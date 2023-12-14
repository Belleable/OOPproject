import React, { useEffect } from 'react';
import { useState } from 'react';
import './Record.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const Records = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchAllRecords = async () => {
            try {
                const res = await axios.get("http://localhost:8800/records");
                setRecords(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchAllRecords();
    }, []);

    return (
        <div className="Records">
            <Helmet>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Pet Records</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet" />
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                <header>
                    <div class="back">
                        <Link to="/pet-info"></Link><a href="#"><i class="fa-solid fa-chevron-left fa-3x"></i></a>
                    </div>
                    <h1>{records.petName}'s record</h1>
                </header>

                <main>
                    {records.map(record => (

                        <div className="record" key={record.appID}>
                            {record.petID && <h2>{record.procName}</h2>}
                            <p>{record.date}</p>
                        </div>

                    ))}
                    <div class="record">
                        <h2>Article</h2>
                        <p>12/03/2023</p>
                    </div>
                    <div class="record">
                        <h2>Article</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis aliquid nam ipsa fugit ab. Eos est reiciendis quae possimus velit ipsum unde! Alias praesentium magnam culpa adipisci reiciendis modi nisi!</p>
                    </div>
                    <div class="record">
                        <h2>Article</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reiciendis aliquid nam ipsa fugit ab. Eos est reiciendis quae possimus velit ipsum unde! Alias praesentium magnam culpa adipisci reiciendis modi nisi!</p>
                    </div>
                </main>

                <nav class="navigate">
                    <Link to="/articles"><a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a></Link>
                    <Link to="/"><a href="#"><i class="fa-solid fa-house fa-2x"></i></a></Link>
                    <Link to="/calendar"><a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a></Link>
                </nav>
            </body>
        </div>
    )
}

export default Records;
