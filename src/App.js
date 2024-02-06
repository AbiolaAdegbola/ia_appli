import { Route, Routes } from "react-router-dom";
import Formulaire from "./composants/Formulaire";
import WebCm from "./composants/WebCm";

import 'bootstrap/dist/css/bootstrap.min.css';
import Connexion from "./composants/Connexion";

function App() {

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscription" element={<Formulaire />} />
          <Route path="/camera-de-surveillance" element={WebCm} />
      </Routes>
    </div>
  );

}

export default App;