import { useNavigate } from "react-router-dom";
import NouvelEvenement from "../components/NouvelEvenement";

const PageNouveau = ({ onAjout }) => {
  const navigate = useNavigate();

  const handleAjout = (nouvelEvenement) => {
    onAjout(nouvelEvenement); 
    navigate("/"); 
  };

  return (
    <div>
      <NouvelEvenement onAjout={handleAjout} />
    </div>
  );
};

export default PageNouveau;