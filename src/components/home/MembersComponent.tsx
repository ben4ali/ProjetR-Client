import React from "react";

export const MembersComponent = () => {
    return(
        <div>
            <h2 id="titleSection">DES ÉTUDIANTS PASSIONNÉS</h2>
            <div className="mission-content">
                <div className="MemberHolder">
                    <img></img>
                    <div className="cardFooter">
                        <div className="cardInfo">
                            <h5>Gitlab</h5>
                            <h6>Département informatique de Rosemont</h6>
                        </div>
                        <div className="socials">
                            <a href="/"><i className="bi bi-gitlab"></i></a>
                        </div>
                    </div>
                </div>
                <div className="missionInfo">
                    <p>
                        Nos étudiants sont passionnés par la technologie et le développement de projets innovants. Ils sont prêts à relever tous les défis et à apprendre de nouvelles technologies.
                    </p>
                    <div className="missionStats">
                        <div className="stat">
                            <h5>Projets Complétés</h5>
                            <p>150+</p>
                        </div>
                        <div className="stat">
                            <h5>Étudiants Actifs</h5>
                            <p>200+</p>
                        </div>
                        <div className="stat">
                            <h5>Partenaires</h5>
                            <p>30+</p>
                        </div>
                        <div className="stat">
                            <h5>Technologies Utilisées</h5>
                            <p>50+</p>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    );
};