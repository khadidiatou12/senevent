import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import PageNouveau from "./pages/PageNouveau";
import PageDetail from "./pages/PageDetail";
import styles from "./App.module.css";
import NavBar from "./components/NavBar";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  const charger = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const reponse = await fetch("/evenements.json");
      if (!reponse.ok) {
        throw new Error(`Erreur HTTP ${reponse.status}`);
      }
      const data = await reponse.json();
      setEvenements(data);
    } catch (e) {
      setErreur(e.message);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    charger();
  }, []);

  const ajouterEvenement = (nouvelEvenement) => {
    setEvenements([...evenements, nouvelEvenement]);
  };

  return (
    <div className={styles.container}>
      <NavBar />
      <h1 className={styles.titre}>SenEvent --- Evenements a Dakar</h1>

      <Routes>
        <Route
          path="/"
          element={
            <Accueil
              evenements={evenements}
              chargement={chargement}
              erreur={erreur}
              onReessayer={charger}
            />
          }
        />
        <Route
          path="/nouveau"
          element={<PageNouveau onAjout={ajouterEvenement} />}
        />
        <Route
          path="/evenement/:id"
          element={<PageDetail evenements={evenements} />}
        />
      </Routes>
    </div>
  );
};

export default App;