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

const IMAGES_DEFAUT = {
  concert:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=900&q=80",
  expo:
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=900&q=80",
  conference:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
  atelier:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
  soutenance:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
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
  const image =
    evenement.image_url ||
    IMAGES_DEFAUT[evenement.categorie] ||
    IMAGES_DEFAUT.concert;
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

      <div className={styles.imageBox}>
        <img src={image} alt={evenement.titre} className={styles.image} />
        <span className={styles.badge} style={{ backgroundColor: couleur }}>
          {evenement.categorie}
        </span>
      </div>

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
