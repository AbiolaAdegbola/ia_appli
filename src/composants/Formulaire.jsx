import { useForm } from 'react-hook-form';
import '../style/formulaire.css';

const Formulaire = () => {

    const { register, handleSubmit, reset } = useForm()


    const inscription = (data) => {
        console.log(data)
        reset()
    }

    return (
        <div className='Formulaire'>
            <div className="container">
                <div className="text">
                    Inscription à la plateforme virtuelle de l'université Félix Houphouet Boigny
                </div>
                <form onSubmit={handleSubmit(inscription)}>

                    <div className="form-row" style={{ display: "initial" }}>
                        <div className="input-data">
                            <span htmlFor="">Photo de profil</span><br />
                        </div>
                        <div className="input-data">
                            <input type="file" required {...register('file')} />
                            <div className="underline"></div>
                            <label htmlFor=""></label>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required {...register("nom")} />
                            <div className="underline"></div>
                            <label htmlFor="">Nom & prénoms</label>
                        </div>
                        <div className="input-data" style={{ marginTop: "-20px" }}>
                            <span>Date & lieu de naissance</span>
                            <input type="date" {...register("dateNaissance")} />
                            {/* <div className="underline"></div> */}
                            {/* <label htmlFor=""></label> */}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <select {...register("ufr")}>
                                <option>UFR Sciences des Structures de la Matière et Technologie (SSMT)</option>
                                <option>UFR Sciences de la Terre et des Ressources Minières (STRM)</option>
                                <option>UFR Mathématique et Informatique (MI)</option>
                                <option>UFR Information Communication Arts (ICA)</option>
                                <option>UFR Sciences de l’Homme et de la Société (SHS)</option>
                            </select>
                            <div className="underline"></div>
                            {/* <label htmlFor="">UFR</label> */}
                        </div>
                        <div className="input-data">
                            <input type="text" required {...register("filiere")} />
                            <div className="underline"></div>
                            <label htmlFor="">Filière</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text" required {...register("numberCarte")} />
                            <div className="underline"></div>
                            <label htmlFor="">Numéro de carte étudiant</label>
                        </div>
                        <div className="input-data">
                            <input type="text" required {...register("niveau")} />
                            <div className="underline"></div>
                            <label htmlFor="">Niveau d'étude</label>
                        </div>
                    </div>
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
