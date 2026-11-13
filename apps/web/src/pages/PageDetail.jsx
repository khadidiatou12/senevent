import { useParams, Link, useNavigate } from "react-router-dom";
import { supprimerEvenement } from "@senevent/shared";
import BoutonInscription from "../components/BoutonInscription";
import styles from "./PageDetail.module.css";

const COULEURS = {
  concert: "#7c3aed",
  expo: "#db2777",
  conference: "#2563eb",
  atelier: "#ea580c",
  soutenance: "#0891b2",
  sport: "#16a34a",
};

const PageDetail = ({ evenements, session }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const evenement = evenements.find((ev) => String(ev.id) === id);

  if (!evenement) {
    return (
      <div className={styles.introuvable}>
        <div className={styles.introuvableIcone}>🔎</div>
        <p>Evenement introuvable.</p>
        <Link to="/" className={styles.retourLien}>← Retour a l'accueil</Link>
      </div>
    );
  }

  const supprimer = async () => {
    const confirme = window.confirm("Supprimer cet evenement ?");
    if (!confirme) return;
    try {
      await supprimerEvenement(evenement.id);
      navigate("/");
    } catch (e) {
      alert("Erreur : " + e.message);
    }
  };

  const estGratuit = evenement.prix === 0;
  const couleur = COULEURS[evenement.categorie] || "#64748b";
  const date = new Date(evenement.date_debut).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={styles.carte}>
      <Link to="/" className={styles.retour}>← Retour</Link>

      {evenement.image_url && (
        <img src={evenement.image_url} alt={evenement.titre} className={styles.image} />
      )}

      <span className={styles.badge} style={{ backgroundColor: couleur }}>
        {evenement.categorie}
      </span>

      <h1 className={styles.titre}>{evenement.titre}</h1>

      <div className={styles.infos}>
        <p className={styles.ligne}><span className={styles.icone}>📍</span><span>{evenement.lieu_nom}</span></p>
        <p className={styles.ligne}><span className={styles.icone}>🗓️</span><span>{date}</span></p>
        <p className={styles.ligne}><span className={styles.icone}>👤</span><span>{evenement.profiles ? evenement.profiles.nom : "Equipe SenEvent"}</span></p>
      </div>

      <p className={estGratuit ? styles.prixGratuit : styles.prix}>
        {estGratuit ? "Gratuit" : `${evenement.prix} FCFA`}
      </p>

      <BoutonInscription evenementId={evenement.id} session={session} />

      {session && session.user.id === evenement.organisateur_id && (
        <button onClick={supprimer} className={styles.supprimer}>
          Supprimer cet evenement
        </button>
      )}
    </div>
  );
};

export default PageDetail;
