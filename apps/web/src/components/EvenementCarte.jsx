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

// Image par defaut selon la categorie (photos libres Unsplash)
const IMAGES_DEFAUT = {
  concert:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
  expo:
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&q=80",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
  atelier:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80",
  soutenance:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
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
  const image =
    ev.image_url || IMAGES_DEFAUT[ev.categorie] || IMAGES_DEFAUT.concert;

  return (
    <div className={styles.carte}>
      <div className={styles.imageBox}>
        <img className={styles.image} src={image} alt={ev.titre} />
        <span className={styles.badge} style={{ backgroundColor: couleur }}>
          {ev.categorie}
        </span>
      </div>

      <div className={styles.corps}>
        <div className={styles.entete}>
          <h3 className={styles.titre}>{ev.titre}</h3>
          <span className={estGratuit ? styles.prixGratuit : styles.prix}>
            {prix}
          </span>
        </div>

        {afficherDetails && (
          <div className={styles.details}>
            <p className={styles.ligne}>
              <span className={styles.icone}>📍</span> {ev.lieu_nom}
            </p>
            {ev.date_debut && (
              <p className={styles.ligne}>
                <span className={styles.icone}>🗓️</span>{" "}
                {formatDate(ev.date_debut)}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EvenementCarte;
