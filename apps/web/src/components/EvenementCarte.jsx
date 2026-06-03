import styles from "./EvenementCarte.module.css";

const EvenementCarte = ({ ev }) => {
  // Rendu conditionnel du prix demandé par la checklist
  const prixAffiche = ev.prix === 0 ? "Gratuit" : `${ev.prix} FCFA`;

  return (
    <div className={styles.carte}>
      <h3 className={styles.titre}>{ev.titre}</h3>
      <p className={styles.infoText}><strong>Catégorie :</strong> {ev.categorie}</p>
      <p className={styles.infoText}><strong>Lieu :</strong> {ev.lieu_nom}</p>
      {/* Date affichant undefined conformément au modèle d'origine de l'étape 2 */}
      <p className={styles.infoText}><strong>Date :</strong> {ev.date}</p>
      <p className={styles.prixTag}>Prix : {prixAffiche}</p>
      
      {ev.image_url && (
        <img 
          src={ev.image_url} 
          alt={ev.titre} 
          className={styles.image} 
        />
      )}
    </div>
  );
};

export default EvenementCarte;