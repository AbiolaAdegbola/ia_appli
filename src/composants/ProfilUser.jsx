import { useEffect, useState } from 'react';
import linkedin from '../assets/svg/linkedin.svg'
// import facebook from '../assets/svg/facebook.svg'
// import photo from '../assets/profil.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilUser = () => {

    const [profil, setProfil] = useState([{}]);
    const navigate = useNavigate()

    useEffect(() => {

        const recuProfil = async () => {
            try {

                const id = localStorage.getItem('admin')
                const response = await axios.get(`http://localhost:7575/api/profil/mon-espace/${id}`)
                if (response.data['msg'] === 'succès') {
                    setProfil(response.data['info'])
                    // console.log(response.data['info'])
                }

            } catch (error) {
                console.error(error)
            }
        }

        recuProfil()

    }, []);

    const handleChangePage = (path) => {
        navigate(path, { state: { profil: profil } })
        window.scroll(0, 0)
    }


    return (
        <div className='ProfilUsers'>
            <div className="container">
                <div className="main-body">

                    <div className="row gutters-sm" style={{ marginTop: "30px" }}>
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`http://localhost:7575/image_profil/${profil[0].photo}`} alt="Admin" className="rounded-circle" width="200" height={200} />
                                        {console.log(`http://localhost:7575/image_profil/${profil[0].photo}`)}
                                        <div className="mt-3">
                                            <h4>{profil[0].nom}</h4>
                                            <p className="text-muted font-size-sm">Etudiant en {profil[0].niveau}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card mt-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><a href={profil[0].linkedin} style={{ textDecoration: "none" }}><img src={linkedin} alt="logo svg linkedin" width={20} /> linkedIn</a></h6>
                                    </li>
                                    {/* <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                        <h6 className="mb-0"><a href="" style={{ textDecoration: "none" }}><img src={facebook} alt="logo svg linkedin" width={20} /> facebook</a></h6>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3  text-secondary">
                                            Nom & prénoms
                                        </div>
                                        <div className="col-sm-9">
                                            <h6 className='mb-0'>{profil[0].nom}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3 text-secondary">
                                            E-mail
                                        </div>
                                        <div className="col-sm-9 ">
                                            <h6 className='mb-0'>{profil[0].email}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3 text-secondary">
                                            Téléphone
                                        </div>
                                        <div className="col-sm-9 ">
                                            <h6 className='mb-0'>{profil[0].telephone}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3 text-secondary">
                                            UFR
                                        </div>
                                        <div className="col-sm-9">
                                            <h6 className='mb-0'>{profil[0].ufr}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3 text-secondary">
                                            Filière
                                        </div>
                                        <div className="col-sm-9 ">
                                            <h6 className='mb-0'> {profil[0].filiere}</h6>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <a className="btn btn-info " onClick={() => handleChangePage("/update-profil")}>Modifier mon profil</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row gutters-sm">
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3">Votre presence au sein du campus</h6>
                                            <div>UFR SSMT</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div>Cité universitaire</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "52%" }} aria-valuenow="52" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 mb-3">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h6 className="d-flex align-items-center mb-3">Classement des zones du campus en fonction des activités</h6>
                                            <div>Cité universitaire</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div>UFR SSMT</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div>Forum - terrain de Baseketball</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div>Entrée école de police</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "55%" }} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <div>Entrée CHU</div>
                                            <div className="progress mb-3" style={{ height: "5px" }}>
                                                <div className="progress-bar bg-primary" role="progressbar" style={{ width: "66%" }} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ProfilUser;
