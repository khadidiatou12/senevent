import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getEvenements, getSupabase } from "@senevent/shared";
import Accueil from "./pages/Accueil";
import PageNouveau from "./pages/PageNouveau";
import PageDetail from "./pages/PageDetail";
import MesInscriptions from "./pages/MesInscriptions";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSupabase().auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    const { data: subscription } = getSupabase().auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );
    return () => subscription.subscription.unsubscribe();
  }, []);

  const charger = async () => {
    setChargement(true);
    setErreur(null);
    try {
      const data = await getEvenements();
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

  return (
    <div className={styles.container}>
      <NavBar session={session} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className={styles.hero}>
                <h1 className={styles.heroTitre}>SenEvent</h1>
                <p className={styles.heroSousTitre}>
                  Tous les evenements a Dakar, au meme endroit
                </p>
              </div>
              <Accueil
                evenements={evenements}
                chargement={chargement}
                erreur={erreur}
                onReessayer={charger}
              />
            </>
          }
        />
        <Route path="/nouveau" element={<PageNouveau onAjoutReussi={charger} />} />
        <Route path="/evenement/:id" element={<PageDetail evenements={evenements} session={session} />} />
        <Route path="/mes-inscriptions" element={<MesInscriptions session={session} />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
