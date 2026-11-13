import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EvenementCarte from "../components/EvenementCarte";
import SearchBar from "../components/SearchBar";
import EtatChargement from "../components/EtatChargement";
import styles from "../App.module.css";

const CATEGORIES = ["concert", "expo", "conference", "atelier", "soutenance"];

const Accueil = ({ evenements, chargement, erreur, onReessayer }) => {
  const [recherche, setRecherche] = useState("");
  const [categorie, setCategorie] = useState("toutes");

  const evenementsFiltres = evenements.filter((ev) => {
    const matchTitre = ev.titre
      .toLowerCase()
      .includes(recherche.toLowerCase());
    const matchCategorie =
      categorie === "toutes" || ev.categorie === categorie;
    return matchTitre && matchCategorie;
  });

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

          <div className={styles.filtres}>
            <button
              className={
                categorie === "toutes"
                  ? `${styles.chip} ${styles.chipActif}`
                  : styles.chip
              }
              onClick={() => setCategorie("toutes")}
            >
              Toutes
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={
                  categorie === c
                    ? `${styles.chip} ${styles.chipActif}`
                    : styles.chip
                }
                onClick={() => setCategorie(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ textAlign: "center", margin: "1rem 0" }}>
            <Link to="/nouveau" className={styles.boutonAjout}>
              + Ajouter un evenement
            </Link>
          </div>

          <p className={styles.compteur}>
            {evenementsFiltres.length} evenement(s) trouve(s)
          </p>

          {evenementsFiltres.length === 0 ? (
            <div className={styles.vide}>
              <div className={styles.videIcone}>🔍</div>
              <p className={styles.videTexte}>Aucun evenement ne correspond.</p>
            </div>
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
