import NouvelEvenement from "../components/NouvelEvenement";

const PageNouveau = ({ onAjoutReussi }) => {
  return (
    <div>
      <NouvelEvenement onAjoutReussi={onAjoutReussi} />
    </div>
  );
};

export default PageNouveau;