import { useState, useEffect } from "react";
import { mesInscriptions } from "@senevent/shared";
import EvenementCarte from "../components/EvenementCarte";
import styles from "./MesInscriptions.module.css";

const MesInscriptions = ({ session }) => {
  const [evenements, setEvenements] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    if (!session) {
      setChargement(false);
      return;
    }
    mesInscriptions(session.user.id)
      .then((data) => setEvenements(data))
      .catch((e) => console.error(e))
      .finally(() => setChargement(false));
  }, [session]);

  if (!session) {
    return (
      <div className={styles.vide}>
        <div className={styles.videIcone}>🔒</div>
        <p className={styles.videTexte}>
          Connecte-toi pour voir tes inscriptions.
        </p>
      </div>
    );
  }

  if (chargement) {
    return <p className={styles.chargement}>Chargement...</p>;
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.titre}>Mes inscriptions</h2>
      <p className={styles.compteur}>
        {evenements.length} evenement(s)
      </p>

      {evenements.length === 0 ? (
        <div className={styles.vide}>
          <div className={styles.videIcone}>🎫</div>
          <p className={styles.videTexte}>
            Tu n'es inscrit a aucun evenement pour le moment.
          </p>
        </div>
      ) : (
        <div className={styles.grille}>
          {evenements.map((ev) => (
            <EvenementCarte key={ev.id} ev={ev} afficherDetails />
          ))}
        </div>
      )}
    </div>
  );
};

export default MesInscriptions;
