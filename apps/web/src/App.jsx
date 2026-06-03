import { useState } from "react";
import SearchBar from "./components/SearchBar";
import EvenementCarte from "./components/EvenementCarte";
import styles from "./App.module.css";

const App = () => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(false);
  // Nouvel état pour stocker la requête de recherche de l'utilisateur
  const [recherche, setRecherche] = useState("");

  // Requête asynchrone pour consommer le fichier JSON local
  const chargerEvenements = async () => {
    setChargement(true);
    try {
      const reponse = await fetch("/evenements.json");
      const data = await reponse.json();
      setEvenements(data);
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    }
    setChargement(false);
  };

  // Filtrage du tableau en temps réel selon le titre de l'événement
  const evenementsFiltres = evenements.filter((ev) =>
    ev.titre.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SenEvent — Événements à Dakar</h1>
      
      <button 
        className={styles.btnCharger}
        onClick={chargerEvenements} 
        disabled={chargement}
      >
        {chargement ? "Chargement en cours..." : "Charger les événements"}
      </button>

      {/* Affichage de la barre de recherche uniquement si des événements sont chargés */}
      {evenements.length > 0 && (
        <>
          <SearchBar valeur={recherche} onChangement={setRecherche} />
          <p className={styles.stats}>
            {evenementsFiltres.length} événement(s) trouvé(s)
          </p>
        </>
      )}

      {/* Boucle d'affichage des composants enfants cartographiés */}
      {evenementsFiltres.map((ev) => (
        <EvenementCarte key={ev.id} ev={ev} />
      ))}
    </div>
  );
};

export default App;