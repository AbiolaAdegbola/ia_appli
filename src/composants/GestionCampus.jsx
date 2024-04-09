import React, { useState } from 'react';
import '../style/gesCampus.css'
import logo from '../assets/log.jpg'
import RecognitionComponent from './ModelBlaze';
import Card from './Card';
import Plan3D from './Plan3D';

const GestionCampus = () => {

    const [pageActive, setPageActive] = useState(<Card />);
    const [stylePageActive, setStylePageActive] = useState("card");

   const handleChangePage = (path, titre) =>{
        setPageActive(path)
        setStylePageActive(titre)
   }
    return (
        <div>
            <header className="header">
                <div className="header-content responsive-wrapper">
                    <div className="header-logo">
                        <div>
                            <img src={logo} width={80} />
                        </div>
                    </div>
                    <div className="header-navigation">
                        <nav className="header-navigation-links">
                            <a href="#"> Accueil </a>
                            <a href="#"> Visite </a>
                            <a href="#"> Professeurs </a>
                            <a href="#"> Etudiants </a>
                            <a href="#"> Trafics </a>
                            {/* <a href="#"> Users </a> */}
                        </nav>
                        <div className="header-navigation-actions">

                            <a href="#" className="icon-button">
                                <i className="ph-gear-bold"></i>
                            </a>
                            <a href="#" className="icon-button">
                                <i className="ph-bell-bold"></i>
                            </a>

                        </div>
                    </div>
                    <a href="#" className="button">
                        <i className="ph-list-bold"></i>
                        <span>Menu</span>
                    </a>
                </div>
            </header>
            <main className="main">
                <div className="responsive-wrapper">
                    <div className="main-header">
                        <h1></h1>
                        <div className="search">
                            <input type="text" placeholder="Search" />
                            <button type="submit">
                                <i className="ph-magnifying-glass-bold"></i>
                            </button>
                        </div>
                    </div>

                    <div className="content">
                        <div className="content-panel">
                            <div className="vertical-tabs">
                                <a href="#" className={stylePageActive==="card" ? "active":""} onClick={() =>handleChangePage(<Card />, "card")}>Graphique demographique</a>
                                {/* <a href="#">UFR SSMT</a>
                                <a href="#">UFR STRM</a>
                                <a href="#">Cité universitaire campus</a>
                                <a href="#">Communication</a> */}
                                <a className={stylePageActive==="camera" ? "active":""} onClick={() =>handleChangePage(<RecognitionComponent />, "camera")}>Vue caméra</a>
                                
                            </div>
                        </div>
                        <div className='containerData'>
                            {pageActive}
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}

export default GestionCampus;
