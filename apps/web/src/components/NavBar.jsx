import { NavLink } from "react-router-dom";
import { seDeconnecter } from "@senevent/shared";
import styles from "./NavBar.module.css";

const NavBar = ({ session }) => {
  const lienActif = ({ isActive }) =>
    isActive ? `${styles.lien} ${styles.actif}` : styles.lien;

  const handleDeconnexion = async () => {
    await seDeconnecter();
  };

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.logo}>SenEvent</NavLink>
      <div className={styles.liens}>
        <NavLink to="/evenements" className={lienActif}>
          Evenements
        </NavLink>
        {session && (
          <NavLink to="/nouveau" className={lienActif}>
            + Ajouter
          </NavLink>
        )}
        {session && (
          <NavLink to="/mes-inscriptions" className={lienActif}>
            Mes inscriptions
          </NavLink>
        )}
        {session ? (
          <>
            <span className={styles.email}>{session.user.email}</span>
            <button onClick={handleDeconnexion} className={styles.deconnexion}>
              Se deconnecter
            </button>
          </>
        ) : (
          <NavLink to="/auth" className={lienActif}>
            Se connecter
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
