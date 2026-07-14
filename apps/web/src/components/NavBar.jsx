import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>SenEvent</div>
      <div className={styles.liens}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.lien} ${styles.actif}` : styles.lien
          }
          end
        >
          Accueil
        </NavLink>
        <NavLink
          to="/nouveau"
          className={({ isActive }) =>
            isActive ? `${styles.lien} ${styles.actif}` : styles.lien
          }
        >
          + Ajouter
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;