import { Route, Routes } from "react-router-dom";
import Formulaire from "./composants/Formulaire";
import 'bootstrap/dist/css/bootstrap.min.css';
import Connexion from "./composants/Connexion";
import ProfilUser from "./composants/ProfilUser";
import UpdateProfilUser from "./composants/UpdateProfilUser";
import ModelBlaze from "./composants/ModelBlaze";
import GestionCampus from "./composants/GestionCampus";
import Plan3D from "./composants/Plan3D";
import MapWithWebGLOverlay from "./composants/GoogleMapsUniversiteFelix";
// import VehicleRecognition from "./composants/ModelVehicule";

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/test" element={<MapWithWebGLOverlay />} />
          <Route path="/" element={<ModelBlaze />} />
          <Route path="/plan" element={<Plan3D />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Formulaire />} />
          <Route path="/mon-espace" element={<ProfilUser />} />
          <Route path="/update-profil" element={<UpdateProfilUser />} />
          <Route path="/gestion-campus" element={<GestionCampus />} />
          {/* <Route path="/vehicule" element={<VehicleRecognition />} /> */}
      </Routes>
    </div>
  );

}

export default App;