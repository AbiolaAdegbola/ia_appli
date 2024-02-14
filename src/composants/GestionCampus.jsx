import React from 'react';
import '../style/gesCampus.css'
import logo from '../assets/log.jpg'

const GestionCampus = () => {
    return (
        <div>
            <header class="header">
                <div class="header-content responsive-wrapper">
                    <div class="header-logo">
                        <div>
                            <img src={logo} width={80} />
                        </div>
                    </div>
                    <div class="header-navigation">
                        <nav class="header-navigation-links">
                            <a href="#"> Home </a>
                            <a href="#"> Dashboard </a>
                            <a href="#"> Projects </a>
                            <a href="#"> Tasks </a>
                            <a href="#"> Reporting </a>
                            <a href="#"> Users </a>
                        </nav>
                        <div class="header-navigation-actions">
                            
                            <a href="#" class="icon-button">
                                <i class="ph-gear-bold"></i>
                            </a>
                            <a href="#" class="icon-button">
                                <i class="ph-bell-bold"></i>
                            </a>
                            
                        </div>
                    </div>
                    <a href="#" class="button">
                        <i class="ph-list-bold"></i>
                        <span>Menu</span>
                    </a>
                </div>
            </header>
            <main class="main">
                <div class="responsive-wrapper">
                    <div class="main-header">
                        <h1>Paramètre</h1>
                        <div class="search">
                            <input type="text" placeholder="Search" />
                            <button type="submit">
                                <i class="ph-magnifying-glass-bold"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="content">
                        <div class="content-panel">
                            <div class="vertical-tabs">                                
                                <a href="#" class="active">Graphique demographique</a>
                                <a href="#">UFR SSMT</a>
                                <a href="#">UFR STRM</a>
                                <a href="#">Cité universitaire campus</a>
                                <a href="#">Communication</a>
                                <a href="#" class="">Vue caméra</a>
                                {/* <a href="#">Productivity</a>
                                <a href="#">Browser tools</a>
                                <a href="#">Marketplace</a> */}
                            </div>
                        </div>
                        <div class="content-main">
                            <div class="card-grid">
                                <article class="card">
                                    <div class="card-header">
                                        <div>
                                            <span><img src="https://assets.codepen.io/285131/zeplin.svg" /></span>
                                            <h3>Zeplin</h3>
                                        </div>
                                        <label class="toggle">
                                            <input type="checkbox" checked />
                                            <span></span>
                                        </label>
                                    </div>
                                    <div class="card-body">
                                        <p>Collaboration between designers and developers.</p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="#">View integration</a>
                                    </div>
                                </article>
                       
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default GestionCampus;
