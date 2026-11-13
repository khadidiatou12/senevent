import styles from "./EvenementCarte.module.css";

// Couleur du badge selon la categorie
const COULEURS = {
  concert: "#7c3aed",
  expo: "#db2777",
  conference: "#2563eb",
  atelier: "#ea580c",
  soutenance: "#0891b2",
  sport: "#16a34a",
};

// Formate une date ISO en "sam. 15 nov. · 20h00"
const formatDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  const date = d.toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const heure = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${date} · ${heure}`;
};

const EvenementCarte = ({ ev, afficherDetails }) => {
  const estGratuit = ev.prix === 0;
  const prix = estGratuit ? "Gratuit" : `${ev.prix} FCFA`;
  const couleur = COULEURS[ev.categorie] || "#64748b";

  return (
    <div className={styles.carte}>
      <div className={styles.entete}>
        <span className={styles.badge} style={{ backgroundColor: couleur }}>
          {ev.categorie}
        </span>
        <span
          className={estGratuit ? styles.prixGratuit : styles.prix}
        >
          {prix}
        </span>
      </div>

      <h3 className={styles.titre}>{ev.titre}</h3>

      {afficherDetails && (
        <div className={styles.details}>
          <p className={styles.ligne}>
            <span className={styles.icone}>📍</span> {ev.lieu_nom}
          </p>
          {ev.date_debut && (
            <p className={styles.ligne}>
              <span className={styles.icone}>🗓️</span> {formatDate(ev.date_debut)}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default EvenementCarte;
