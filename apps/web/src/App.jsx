import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getEvenements, getSupabase } from "@senevent/shared";
import Accueil from "./pages/Accueil";
import PageNouveau from "./pages/PageNouveau";
import PageDetail from "./pages/PageDetail";
import Auth from "./pages/Auth";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [session, setSession] = useState(null);

  // Gestion de la session Supabase
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
          element={<PageNouveau onAjoutReussi={charger} />}
        />
        <Route
          path="/evenement/:id"
          element={<PageDetail evenements={evenements} session={session} />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
