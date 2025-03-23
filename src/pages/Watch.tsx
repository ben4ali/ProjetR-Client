import React from "react";
import "../styles/style-watch.css";
import { Link } from "react-router-dom";

export const Watch = () => {
    return(
        <div className="watch-container">
            <div className="watch-content">

                <div className="video-container">

                    <video className="video" controls>
                        <source src="video.mp4" type="video/mp4" />
                    </video>
                    
                    <div className="video-info">
                        <h2>Titre de la vidéo</h2>
                    </div>
                    
                    <div className="video-options">
                        <div className="author-holder">
                            <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="author" />
                            <div className="author-info">
                                <h3>Ali Benkarrouch</h3>
                                <p>@ben4ali</p>
                            </div>
                        </div>
                        <div className="video-interaction">
                            <div className="like">
                                <i className="bi bi-hand-thumbs-up"></i>
                                <p>J'aime</p>
                            </div>

                            <div className="share">
                                <i className="bi bi-reply"></i>
                                <p>Partager</p>
                            </div>

                            <div className="enregistrer">
                                <i className="bi bi-bookmark"></i>
                                <p>Enregistrer</p>
                            </div>

                        </div>
                    </div>

                    <div className="video-description">
                        <div className="video-description-header">
                            <p>256k Visionnements</p>
                            <p>2025-03-22</p>
                        </div>

                        <div className="description">
                            <p>
                                Lorem, ipsum dolor sit amet consectetur 
                                adipisicing elit. Eius non quas, aperiam 
                                autem excepturi dolorum molestiae aspernatur? 
                                Obcaecati quidem commodi odit eveniet laboriosam, 
                                placeat, odio, eaque tempora maxime expedita quo.
                            </p>
                        </div>

                    </div>

                    <div className="comment-container">
                        <h3>25 325 commentaires</h3>
                        <div className="comment-form">
                            <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur"/>
                            <div className="comment-input">
                                <input type="text" placeholder="Ajouter un commentaire..." />
                                <div className="comment-options">
                                    <button>
                                        Annuler
                                    </button>
                                    <button>
                                        Commenter
                                    </button>
                                </div>
                            </div>
                            
                        </div> 
                        <div className="comment-holder">
                            <div className="comment">
                                <div className="comment-author">
                                    <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur"/>
                                </div>
                               
                                <div className="comment-info">
                                    <h4>Ali Benkarrouch</h4>
                                    <p>Super vidéo !</p>
                                </div>
                            </div>

                            <div className="comment">
                                <div className="comment-author">
                                    <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur"/>
                                </div>
                               
                                <div className="comment-info">
                                    <h4>Ali Benkarrouch</h4>
                                    <p>Super vidéo !</p>
                                </div>
                            </div>

                            <div className="comment">
                                <div className="comment-author">
                                    <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur"/>
                                </div>
                               
                                <div className="comment-info">
                                    <h4>Ali Benkarrouch</h4>
                                    <p>Super vidéo !</p>
                                </div>
                            </div>

                            <div className="comment">
                                <div className="comment-author">
                                    <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="autheur"/>
                                </div>
                               
                                <div className="comment-info">
                                    <h4>Ali Benkarrouch</h4>
                                    <p>Super vidéo !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="video-suggestion-holder">
                    <Link to="/watch/1" className="video-suggestion">
                        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="video" />
                        <div className="video-suggestion-info">
                            <h4>Titre de la vidéo</h4>
                            <p>Ali Benkarrouch</p>
                            <div className="video-suggestion-data">
                                <p>256k Visionnements</p>
                                <p>2025-03-22</p>
                            </div>
                        </div>
           
                    </Link>

                    <Link to="/watch/1" className="video-suggestion">
                        <img src="https://wallpapercave.com/wp/wp4877950.jpg" alt="video" />
                        <div className="video-suggestion-info">
                            <h4>Titre de la vidéo</h4>
                            <p>Ali Benkarrouch</p>
                            <div className="video-suggestion-data">
                                <p>256k Visionnements</p>
                                <p>2025-03-22</p>
                            </div>
                        </div>
           
                    </Link>
                </div>
            </div>  
        </div>
    )
};