import React from "react";
import "../styles/style-profil.css";

export const Profil = () => {
    return(
        <div className="profil-container">
            <div className="profil-header">
                <div className="profil-banner">
                    <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="banner" />
                </div>
                <div className="profil-picture">
                    <img src="https://th.bing.com/th/id/OIP.gSumijuFpa7yGTKYERXwgAHaE7?rs=1&pid=ImgDetMain" alt="profil-pic" />
                </div>
                <div className="profil-content">
                    <div className="profil-info">
                        <h1>Ali Benkarrouch</h1>
                        <p>@ben4ali</p>
                    </div>
                    <div className="profil-stats">
                        <p>0 PUBLICATIONS</p>
                        <p>0 VUES</p>
                        <p>0 J'AIMES</p>
                    </div>
                </div>
            </div>
            <div className="profil-body">
                <div className="profil-post-holder">
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                    <div className="profil-post"></div>
                </div>
            </div>
        </div>
    );
};