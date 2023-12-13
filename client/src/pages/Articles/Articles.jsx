import React, { useEffect } from 'react';
import { useState } from 'react';
import './Articles.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from "react-router-dom";

const Articles = () => {

    return (
        <div className="Articles">
            <Helmet>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Articles</title>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Catamaran:wght@100;200;300;400;500;600;700;800;900&display=swap"
                    rel="stylesheet"/>
                <script src="https://kit.fontawesome.com/957263c2c4.js" crossorigin="anonymous"></script>
            </Helmet>
            <body>
                <header>
                    <h1>About Pet Health & Care</h1>
                </header>

                <main>
                    <div class="article">
                        <h2>Article Title 1</h2>
                        <img src="https://cdn.shopify.com/s/files/1/0531/2475/9744/files/1_2.jpg?v=1631104786" alt="Article 1 Image"/>
                            <p>This is a brief summary of the article content.
                                You can add more details hereYou can add more details hereYou can add more details hereYou can add more details
                                hereYou can add more details hereYou can add more details hereYou can add more details hereYou can add more
                                details hereYou can add more details hereYou can add more details hereYou can add more details hereYou can add
                                more details hereYou can add more details heree details hereYou can add more details here.</p>
                            <a href="article1.html" class="read-more">Read More</a>
                    </div>

                    <div class="article">
                        <h2>Article Title 2</h2>
                        <img src="https://cdn.shopify.com/s/files/1/0531/2475/9744/files/1_2.jpg?v=1631104786" alt="Article 2 Image"/>
                            <p>This is a brief summary of the article content.</p>
                            <a href="article2.html" class="read-more">Read More</a>
                    </div>
                </main>

                <nav class="navigate">
                    <a href="#"><i class="fa-solid fa-book-open fa-2x"></i></a>
                    <a href="#"><i class="fa-solid fa-house fa-2x"></i></a>
                    <a href="#"><i class="fa-regular fa-calendar-days fa-2x"></i></a>
                </nav>
            </body>

        </div>
    )
}

export default Articles;