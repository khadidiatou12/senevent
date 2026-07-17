import { useParams, Link } from "react-router-dom";
import BoutonInscription from "../components/BoutonInscription";

const PageDetail = ({ evenements, session }) => {
  const { id } = useParams();

  

  const evenement = evenements.find((ev) => String(ev.id) === id);

  if (!evenement) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <p>Événement introuvable.</p>
        <Link to="/" style={{ color: "#1a3a5c" }}>
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        background: "white",
        borderRadius: "12px",
        padding: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#1a3a5c",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        ← Retour
      </Link>

      <img
        src={evenement.image_url}
        alt={evenement.titre}
        style={{
          width: "100%",
          borderRadius: "8px",
          margin: "1rem 0",
        }}
      />

      <h1 style={{ color: "#1a3a5c" }}>{evenement.titre}</h1>
      <p><strong>Catégorie :</strong> {evenement.categorie}</p>
      <p><strong>Lieu :</strong> {evenement.lieu_nom}</p>
      <p>
        <strong>Date :</strong>{" "}
        {new Date(evenement.date_debut).toLocaleString("fr-FR")}
      </p>
      <p style={{ color: "#e67e22", fontWeight: "bold", fontSize: "1.3rem" }}>
        {evenement.prix === 0 ? "Gratuit" : `${evenement.prix} FCFA`}
      </p>
      <BoutonInscription evenementId={evenement.id} session={session} />

    </div>
  );
};

export default PageDetail;