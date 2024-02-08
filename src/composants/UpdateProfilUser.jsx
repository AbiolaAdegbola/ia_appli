import { FaCamera } from "react-icons/fa";
// import photo from '../assets/profil.jpg'
import { useLocation } from "react-router-dom";
import { Toast } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import SpinnerCard from "./SpinnerCard";

const UpdateProfilUser = () => {

	const { handleSubmit, register } = useForm()
	const { state } = useLocation()
	let profil = [{}]
	const [filePreview, setFilePreview] = useState(false);
	const [filePhoto, setFilePhoto] = useState(false);
	const [msgToast, setMsgToast] = useState(false);
	// const [spinner, setSpinner] = useState(false);

	if (state) {
		profil = state.profil
	}


	const updateProfil = (data) => {

		insertAxios(data)
		console.log(data)

	}

	const insertAxios = async (data) => {

		let formData = new FormData()

		formData.append('file', filePhoto)
		formData.append('nom', data.nom)
		formData.append('dateNaissance', data.dateNaissance)
		formData.append('email', data.email)
		formData.append('telephone', data.telephone)
		formData.append('ufr', data.ufr)
		formData.append('filiere', data.filiere)
		formData.append('niveau', data.niveau)
		formData.append('numberCarte', data.numberCarte)
		formData.append('linkedin', data.linkedin)
		formData.append('mdp', data.mdp)
		formData.append('id', profil[0]._id)

		// setSpinner(true)

		// console.log(formData.get("filiere"))

		try {
			const response = await axios.put('http://localhost:7575/api/user/update-profil/', formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				})

			console.log(response)

			if (response.data['msg'] === "succès") {

				setMsgToast(true)

			}

		} catch (error) {
			console.log(error)
		}

		// setSpinner(false)

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
		<div style={{ marginTop: "30px" }}>
			{/* {
                spinner === true && (
                    <SpinnerCard />
                )
            } */}
			<div className="container">
				<h4 style={{ marginTop: "30px", marginBottom: "30px" }}>
					Modifier mon profil utilisateur
				</h4>
				<div className="main-body">
					<form onSubmit={handleSubmit(updateProfil)} className="row">
						<div className="col-lg-4">
							<div className="card">
								<div className="card-body">
									<div className="d-flex flex-column align-items-center text-center">

										{
											filePreview !== false ? (
												<div>
													{/* Affichage de l'aperçu de l'image */}
													<img src={filePreview} className="rounded-circle p-1 bg-primary" width="200" height={200} />
												</div>
											) : (<img src={`http://localhost:7575/image_profil/${profil[0].photo}`} alt="Admin" className="rounded-circle p-1 bg-primary" width="200" height={200} />)
										}
										<input type="file" id="newPhoto" style={{ display: "none" }} accept='image/*' onChange={(e) => handleFileChange(e)} />
										<label htmlFor="newPhoto"><FaCamera style={{ fontSize: "22px", color: "blue", cursor: "pointer" }} /></label>
										<div className="mt-3">
											<h4>{profil[0].nom}</h4>
											<p className="text-muted font-size-sm">Etudiant {profil[0].niveau}</p>
										</div>
									</div>

								</div>
							</div>
						</div>
						<div className="col-lg-8">
							<div className="card">
								<div className="card-body">
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Nom & prénoms </h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].nom} {...register('nom')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Date et lieu de naissance</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].dateNaissance} {...register('dateNaissance')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">E-mail</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].email} {...register('email')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Téléphone</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].telephone} {...register('telephone')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">UFR</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<select className="form-control" {...register('ufr')}>
												<option>{profil[0].ufr}</option>
												<option>UFR Sciences des Structures de la Matière et Technologie (SSMT)</option>
												<option>UFR Sciences de la Terre et des Ressources Minières (STRM)</option>
												<option>UFR Mathématique et Informatique (MI)</option>
												<option>UFR Information Communication Arts (ICA)</option>
												<option>UFR Sciences de l’Homme et de la Société (SHS)</option>
											</select>

										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Filière</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].filiere} {...register('filiere')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Niveau</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].niveau} {...register('niveau')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Numéro carte étudiant</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].numberCarte} {...register('numberCarte')} />
										</div>
									</div>
									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Page linkedIn</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].linkedin} {...register('linkedin')} />
										</div>
									</div>

									<div className="row mb-3">
										<div className="col-sm-3">
											<h6 className="mb-0">Mot de passe</h6>
										</div>
										<div className="col-sm-9 text-secondary">
											<input type="text" className="form-control" defaultValue={profil[0].mdp} {...register('mdp')} />
										</div>
									</div>

									<Toast style={{ width: '100%' }} onClose={() => setMsgToast(false)} show={msgToast} delay={10000} autohide>
										<Toast.Body style={{ backgroundColor: 'seagreen', padding: "10px", textAlign: "center", color: "white" }}>
											Votre profil a été modifié avec succès
										</Toast.Body>
									</Toast>
									<div className="row">
										<div className="col-sm-3"></div>
										<div className="col-sm-9 text-secondary">
											<input type="submit" className="btn btn-primary px-4" defaultValue="Valider" />
										</div>
									</div>
								</div>
							</div>

						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default UpdateProfilUser;

