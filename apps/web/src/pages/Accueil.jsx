import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EvenementCarte from "../components/EvenementCarte";
import SearchBar from "../components/SearchBar";
import EtatChargement from "../components/EtatChargement";
import styles from "../App.module.css";

const Accueil = ({ evenements, chargement, erreur, onReessayer }) => {
  const [recherche, setRecherche] = useState("");

  const evenementsFiltres = evenements.filter((ev) =>
    ev.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  useEffect(() => {
    if (evenementsFiltres.length > 0) {
      document.title = `(${evenementsFiltres.length}) SenEvent`;
    } else {
      document.title = "SenEvent";
    }
  }, [evenementsFiltres.length]);

  return (
    <div>
      <EtatChargement
        chargement={chargement}
        erreur={erreur}
        onReessayer={onReessayer}
      />
      {!chargement && !erreur && (
        <>
          <SearchBar recherche={recherche} onRecherche={setRecherche} />

          <div style={{ textAlign: "center", margin: "1rem 0" }}>
            <Link
              to="/nouveau"
              style={{
                background: "#1a3a5c",
                color: "white",
                padding: "0.6rem 1.2rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              + Ajouter un événement
            </Link>
          </div>

          <p className={styles.compteur}>
            {evenementsFiltres.length} evenement(s) trouve(s)
          </p>
          {evenementsFiltres.length === 0 ? (
            <p className={styles.message}>Aucun evenement ne correspond.</p>
          ) : (
            evenementsFiltres.map((ev) => (
              <Link
                key={ev.id}
                to={`/evenement/${ev.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <EvenementCarte ev={ev} afficherDetails={true} />
              </Link>
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Accueil;