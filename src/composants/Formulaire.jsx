import { useForm } from 'react-hook-form';
import '../style/formulaire.css';
import { Toast } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';

const Formulaire = () => {

    const { register, handleSubmit, reset } = useForm()
    const [messageServeur, setMessageServeur] = useState("Vous ne pouvez pas vous inscire veuillez réessayer ulterieurement");
    const navigate = useNavigate()
    const [msgToast, setMsgToast] = useState(false);
    const [filePreview, setFilePreview] = useState(false);
    const [filePhoto, setFilePhoto] = useState(false);

    const inscription = (data) => {

        insertAxios(data)

    }

    const insertAxios = async (data) => {

        let formData = new FormData()

        formData.append('file', filePhoto)
        formData.append('nom', data.nom)
        formData.append('dateNaissance', data.dateNaissance + ' ' + data.lieu)
        formData.append('email', data.email)
        formData.append('telephone', data.telephone)
        formData.append('ufr', data.ufr)
        formData.append('filiere', data.filiere)
        formData.append('niveau', data.niveau)
        formData.append('numberCarte', data.numberCarte)
        formData.append('linkedin', data.linkedin)
        formData.append('mdp', data.mdp)

        // console.log(formData.get("dateNaissance"))

        try {

            const response = await axios.post('http://localhost:7575/api/user/inscription/', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

            console.log(response)

            if (response.data['msg'] === "succès") {

                const id = response.data['id']
                localStorage.setItem('admin', id)
                navigate('/mon-espace', { state: { id: id } })

            } else if (response.data['msg'] === "Email existe déjà") {

                setMessageServeur("Email existe déjà")
                setMsgToast(true)

            } else {

                setMsgToast(true)

            }

        } catch (error) {
            console.log(error)
        }

    }

    const handleFileChange = (e) => {
        console.log(e)

        const selectedFile = e.target.files[0];

        setFilePhoto(selectedFile)

        // Vérification que le fichier est une image
        if (selectedFile && selectedFile.type.startsWith('image')) {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);

            // Lecture du contenu du fichier
            reader.onloadend = () => {
                // Mise à jour du state avec l'URL du fichier
                setFilePreview(reader.result);
            };
        } else {
            // Gérer d'autres types de fichiers (vidéos, etc.) si nécessaire
            // Vous pouvez étendre cette logique pour d'autres types de fichiers
            setFilePreview(false);
        }
    };

    return (
        <div className='Formulaire'>
            <div className="container">
                <div className="text">
                    Inscription à la plateforme virtuelle de l'université Félix Houphouet Boigny
                </div>
                <form onSubmit={handleSubmit(inscription)}>

                    <div className="form-row" style={{ display: "initial" }}>
                        <div className="d-flex flex-column align-items-center text-center">
                            
                            {
                                filePreview !== false ? (
                                    <div>
                                        {/* Affichage de l'aperçu de l'image */}
                                        <img src={filePreview} className="rounded-circle p-1 bg-primary" width="200" height={200} />
                                    </div>
                                ) : (<img alt="photo" className="rounded-circle p-1 bg-primary" width="200" height={200} />)
                            }
                            <input type="file" id="newPhoto" style={{ display: "none" }} accept='image/*' onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="newPhoto"><FaCamera style={{ fontSize: "22px", color: "blue", cursor: "pointer" }} /></label>
                        </div>
                    </div>


                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required {...register("nom")} />
                            <div className="underline"></div>
                            <label htmlFor="">Nom & prénoms</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-data">
                            <span>Téléphone</span>
                            <input type="text" {...register("telephone")} />
                        </div>
                        <div className="input-data">
                            <span>E-mail</span>
                            <input type="texte" {...register("email")} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-data" style={{ marginTop: "20px" }}>
                            <span>Date de naissance</span>
                            <input type="date" {...register("dateNaissance")} />
                        </div>
                        <div className="input-data" style={{ marginTop: "20px" }}>
                            <span>Lieu de naissance</span>
                            <input type="texte" {...register("lieu")} />
                        </div>
                    </div>

                    <div className="form-row" >
                        <div className="input-data" style={{ marginTop: "20px" }}>
                            <select {...register("ufr")} required>
                                <option>UFR Sciences des Structures de la Matière et Technologie (SSMT)</option>
                                <option>UFR Sciences de la Terre et des Ressources Minières (STRM)</option>
                                <option>UFR Mathématique et Informatique (MI)</option>
                                <option>UFR Information Communication Arts (ICA)</option>
                                <option>UFR Sciences de l’Homme et de la Société (SHS)</option>
                            </select>
                            <div className="underline"></div>
                            {/* <label htmlFor="">UFR</label> */}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className="input-data">
                            <input type="text" required {...register("filiere")} />
                            <div className="underline"></div>
                            <label htmlFor="">Filière</label>
                        </div>
                        <div className="input-data">
                            <input type="text" required {...register("niveau")} />
                            <div className="underline"></div>
                            <label htmlFor="">Niveau d'étude</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required {...register("numberCarte")} />
                            <div className="underline"></div>
                            <label htmlFor="">Numéro de carte étudiant</label>
                        </div>
                        <div className="input-data">
                            <input type="text" required {...register("linkedin")} />
                            <div className="underline"></div>
                            <label htmlFor="">Lien compte linkedIn</label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-data">
                            <input type="password" required {...register("mdp")} />
                            <div className="underline"></div>
                            <label htmlFor="">Votre mot de passe</label>
                        </div>
                    </div>
                    <Toast style={{ width: '100%' }} onClose={() => setMsgToast(false)} show={msgToast} delay={10000} autohide>
                        <Toast.Body style={{ backgroundColor: 'red', padding: "10px", textAlign: "center", color: "white" }}>
                            {messageServeur}
                        </Toast.Body>
                    </Toast>
                    <div className="form-row">
                        <div className="input-data textarea">
                            <div className="form-row submit-btn">
                                <div className="input-data">
                                    <div className="inner"></div>
                                    <input type="submit" value="Valider" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}>
                        Vous avez déjà un compte? <a href='/' style={{ paddingLeft: "10px" }}>connexion</a>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Formulaire;
