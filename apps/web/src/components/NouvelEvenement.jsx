import { useState } from "react";
import styles from "./NouvelEvenement.module.css";

function NouvelEvenement({ onAjout }) {
  const [titre, setTitre] = useState("");
  const [categorie, setCategorie] = useState("concert");
  const [lieuNom, setLieuNom] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [prix, setPrix] = useState("");
  const [erreurs, setErreurs] = useState({});

  const valider = () => {
    const e = {};
    if (titre.trim().length < 5) {
      e.titre = "Le titre doit faire au moins 5 caractères";
    }
    if (!lieuNom.trim()) {
      e.lieuNom = "Le lieu est obligatoire";
    }
    if (!dateDebut) {
      e.dateDebut = "La date est obligatoire";
    }
    if (prix === "" || Number(prix) < 0) {
      e.prix = "Le prix doit être un nombre positif (0 = gratuit)";
    }
    return e;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const e = valider();
    setErreurs(e);
    if (Object.keys(e).length > 0) return;

    const nouvelEvenement = {
      id: Date.now(),
      titre: titre.trim(),
      categorie,
      lieu_nom: lieuNom.trim(),
      date_debut: dateDebut,
      prix: Number(prix),
      image_url: "https://placehold.co/400x250/1a3a5c/fff?text=Nouveau",
    };

    onAjout(nouvelEvenement);

    setTitre("");
    setCategorie("concert");
    setLieuNom("");
    setDateDebut("");
    setPrix("");
    setErreurs({});
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formulaire}>
      <h2 className={styles.titre}>Nouvel événement</h2>

      <div className={styles.champ}>
        <label className={styles.label}>Titre</label>
        <input
          className={styles.input}
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        {erreurs.titre && <p className={styles.erreur}>{erreurs.titre}</p>}
      </div>

      <div className={styles.champ}>
        <label className={styles.label}>Catégorie</label>
        <select
          className={styles.select}
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="concert">Concert</option>
          <option value="expo">Expo</option>
          <option value="conference">Conférence</option>
          <option value="sport">Sport</option>
        </select>
      </div>

      <div className={styles.champ}>
        <label className={styles.label}>Lieu</label>
        <input
          className={styles.input}
          type="text"
          value={lieuNom}
          onChange={(e) => setLieuNom(e.target.value)}
        />
        {erreurs.lieuNom && <p className={styles.erreur}>{erreurs.lieuNom}</p>}
      </div>

      <div className={styles.champ}>
        <label className={styles.label}>Date de début</label>
        <input
          className={styles.input}
          type="datetime-local"
          value={dateDebut}
          onChange={(e) => setDateDebut(e.target.value)}
        />
        {erreurs.dateDebut && (
          <p className={styles.erreur}>{erreurs.dateDebut}</p>
        )}
      </div>

      <div className={styles.champ}>
        <label className={styles.label}>Prix (FCFA)</label>
        <input
          className={styles.input}
          type="number"
          value={prix}
          onChange={(e) => setPrix(e.target.value)}
        />
        {erreurs.prix && <p className={styles.erreur}>{erreurs.prix}</p>}
      </div>

      <button type="submit" className={styles.bouton}>
        Ajouter l'événement
      </button>
    </form>
  );
}

export default NouvelEvenement;