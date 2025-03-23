import React from "react";
import "../styles/style-explore.css";
import { Link } from "react-router-dom";

export const Explore = () => {
    return(
        <div className="explore-container">
            <div className="search-container">
                <div className="explore-search-holder">
                    <div className="explore-search">
                        <input type="text" placeholder="Rechercher..." />
                        <button className="search-btn">
                            <i className="bi bi-search"></i>
                        </button>
                        <button className="voice-btn">
                            <i className="bi bi-mic"></i>
                        </button>
                    </div>

                    <div className="create-post">
                        <Link to="/explore" className="create-post-btn">
                            <i className="bi bi-plus"></i>
                            <p>Publier un projet</p>
                        </Link>
                    </div>
                </div>
                <div className="filter-content">
                    <div className="filter-holder">
                        <div className="filterOverlayBegin"></div>
                        <div className="filterOverlay"></div>
                        <div className="filter-scroller">
                            <div className="filter">
                                <p>Programmation</p>
                            </div>
                            <div className="filter">
                                <p>Développement Web</p>
                            </div>
                            <div className="filter">
                                <p>Application Mobile</p>
                            </div>
                            <div className="filter">
                                <p>Application Native</p>
                            </div>
                            <div className="filter">
                                <p>Jeux vidéos</p>
                            </div>
                            <div className="filter">
                                <p>Objet connecté</p>
                            </div>
                            <div className="filter">
                                <p>Java</p>
                            </div>
                            <div className="filter">
                                <p>Python</p>
                            </div>
                        </div>
                    </div>
                    <div className="filter-control">
                        <button className="filter-btn">
                            <i className="bi bi-filter"></i>
                            <p>Filtrer</p>
                        </button>
                    </div>
                </div>
 
            </div>
            <hr />
            <div className="post-holder">
                <Link to="/watch/1" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
                <Link to="/explore" className="post">
                    <div className="image-holder">
                        <div className="post-overlay"></div>
                        <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="post" />
                        <p className="temps">18:50</p>
                    </div>
                    <div className="post-footer">
                        <div className="post-author">
                            <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="Photo de profil"/>
                        </div>
                        <div className="post-info">
                            <h2>L'infinie complexité d'un jeu simpliste</h2>
                            <p>ben4ali</p>
                            <p>275k Visionnements - 2025-03-22</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};