import { Route, Routes } from "react-router-dom";
import Formulaire from "./composants/Formulaire";
import WebCm from "./composants/WebCm";

import 'bootstrap/dist/css/bootstrap.min.css';
import Connexion from "./composants/Connexion";
import ProfilUser from "./composants/ProfilUser";
import UpdateProfilUser from "./composants/UpdateProfilUser";
import ModelBlaze from "./composants/ModelBlaze";

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<ModelBlaze />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Formulaire />} />
          <Route path="/mon-espace" element={<ProfilUser />} />
          <Route path="/update-profil" element={<UpdateProfilUser />} />
          <Route path="/camera-de-surveillance" element={WebCm} />
      </Routes>
    </div>
  );

}

export default App;