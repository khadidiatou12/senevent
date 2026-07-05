import { Link } from "react-router-dom";

const NonTrouvee = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>Page introuvable</h1>
      <Link to="/">Retour a l'accueil</Link>
    </div>
  );
};

export default NonTrouvee;