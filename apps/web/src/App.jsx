import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { supabase } from "./lib/supabase";
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
    // 1. Recuperer la session actuelle au montage
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // 2. Ecouter tout changement de session (login, logout, refresh)
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    // 3. Nettoyage : desabonner l'ecouteur au demontage
    return () => subscription.subscription.unsubscribe();
  }, []);

  

  const charger = async () => {
    setChargement(true);
    setErreur(null);
    const { data, error } = await supabase
      .from("evenements")
      .select("*")
      .order("date_debut", { ascending: true });
    if (error) {
      setErreur(error.message);
    } else {
      setEvenements(data);
    }
    setChargement(false);
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
          element={<PageDetail evenements={evenements} />}
        />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
