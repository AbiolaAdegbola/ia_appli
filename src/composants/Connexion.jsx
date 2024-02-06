import '../style/Connexion.css'
import google from '../assets/svg/google.svg'
import facebook from '../assets/svg/facebook.svg'
import linkedin from '../assets/svg/linkedin.svg'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Connexion() {

    const {register, handleSubmit, reset} = useForm()
    const navigate = useNavigate()
    const connexion = (data) =>{

        const field = {
            email: data.email,
            mdp: data.mdp
        }
        console.log(data)
        exeConnexion(field)
        reset()
    }

    const exeConnexion = async (field) =>{
        try {
            const response = await axios.post('http://localhost:7575/api/user/connexion/', field)
            
            console.log(response)
            if(response.data['msg'] === "connexion reussi!!!"){
                navigate('/mon-espace')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='Formulaire'>

                <div className="container">
                <div className="text">
                    Connexion à la plateforme virtuelle de l'université Félix Houphouet Boigny
                </div>
                    <form className="row bg_1" onSubmit={handleSubmit(connexion)}>

                        <div className="col-3">
                            <input className="effect-9" type="text" placeholder="E-mail*" style={{ border: "1px solid rgba(192,192,192,0.8)", padding: "20px" }} {...register("email")} required/>
                            
                        </div>
                        <div className="col-3" style={{ marginTop: "30px" }}>
                            <input className="effect-9" type="paasword" placeholder="Mot de passe*" style={{ border: "1px solid rgba(192,192,192,0.8)", padding: "20px" }} {...register("mdp")} required/>
                            
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <span style={{ fontSize: "16px", marginTop: "30px" }}> <input type='checkbox' style={{ transform: "scale(1.2)" }} /> Rester connecté</span>
                            <span>Mot de passe oublié?</span>
                        </div>

                        <div>
                            <input type="submit" value="Valider" style={{backgroundColor:"#3498db", borderColor:"#3498db", padding:"10px", width:"100px", borderRadius:"5px", marginTop:"30px", color:"white"}}/>
                        </div>
                    </form>
                    <br />
                    <h2 className='headerSeparator'><i>ou</i></h2>

                    <div style={{ width: "100%", border: "1px solid rgba(192,192,192,0.8)", borderRadius: "10px", cursor: "pointer", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginTop: "30px" }}>
                        <img src={google} alt="logo svg google" width={20} /> <span style={{ fontSize: "16px", paddingLeft: "10px", fontWeight: 500 }}>Connexion avec Google</span>
                    </div>

                    <div style={{ width: "100%", border: "1px solid rgba(192,192,192,0.8)", borderRadius: "10px", cursor: "pointer", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginTop: "16px" }}>
                        <img src={facebook} alt="logo svg google" width={20} /> <span style={{ fontSize: "16px", paddingLeft: "10px", fontWeight: 500 }}>Connexion avec Facebook</span>
                    </div>

                    <div style={{ width: "100%", border: "1px solid rgba(192,192,192,0.8)", borderRadius: "10px", cursor: "pointer", textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", padding: "10px", marginTop: "16px" }}>
                        <img src={linkedin} alt="logo svg linkedin" width={20} /> <span style={{ fontSize: "16px", paddingLeft: "10px", fontWeight: 500 }}>Connexion avec LinkedIn</span>
                    </div>


                    <br />

                    <div style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}>
                        Vous n'avez pas de compte? <a href='/inscription' style={{ paddingLeft: "10px" }}>S'inscrire</a>
                    </div>
                </div>


        </div>
    );
}

export default Connexion;
