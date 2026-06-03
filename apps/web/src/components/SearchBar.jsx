import styles from "./SearchBar.module.css";

const SearchBar = ({ valeur, onChangement }) => {
  return (
    <div className={styles.searchWrapper}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Rechercher un événement par son titre..."
        value={valeur}
        onChange={(e) => onChangement(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;