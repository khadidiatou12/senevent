import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const CATEGORIES = [
  { nom: "Concerts", cat: "concert" },
  { nom: "Expositions", cat: "expo" },
  { nom: "Conferences", cat: "conference" },
  { nom: "Ateliers", cat: "atelier" },
  { nom: "Soutenances", cat: "soutenance" },
];

const IconeSearch = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
  </svg>
);
const IconeTicket = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
  </svg>
);
const IconeStar = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ETAPES = [
  { Icone: IconeSearch, titre: "Decouvrez", texte: "Parcourez tous les evenements de Dakar et filtrez par categorie." },
  { Icone: IconeTicket, titre: "Inscrivez-vous", texte: "Reservez votre place en un clic et retrouvez vos inscriptions." },
  { Icone: IconeStar, titre: "Profitez", texte: "Vivez l'experience et ne ratez plus jamais un evenement." },
];

const STATS = [
  { chiffre: "5", label: "Categories" },
  { chiffre: "100%", label: "Gratuit" },
  { chiffre: "Dakar", label: "Partout en ville" },
];

const Landing = () => {
  return (
    <div className={styles.landing}>
      <section className={styles.hero}>
        <div className={styles.heroContenu}>
          <span className={styles.heroKicker}>DAKAR · EVENEMENTS</span>
          <h1 className={styles.heroTitre}>
            Vivez chaque evenement de la ville
          </h1>
          <p className={styles.heroSousTexte}>
            Concerts, expositions, conferences, ateliers. Une seule plateforme
            pour tout decouvrir et reserver.
          </p>
          <div className={styles.heroBoutons}>
            <Link to="/evenements" className={styles.ctaPrimaire}>
              Decouvrir les evenements
            </Link>
            <Link to="/auth" className={styles.ctaSecondaire}>
              Creer un compte
            </Link>
          </div>
          <div className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statChiffre}>{s.chiffre}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.sectionKicker}>SIMPLE ET RAPIDE</span>
        <h2 className={styles.sectionTitre}>Comment ca marche</h2>
        <div className={styles.etapes}>
          {ETAPES.map(({ Icone, titre, texte }, i) => (
            <div key={titre} className={styles.etape}>
              <div className={styles.etapeNum}>0{i + 1}</div>
              <div className={styles.etapeIcone}><Icone /></div>
              <h3 className={styles.etapeTitre}>{titre}</h3>
              <p className={styles.etapeTexte}>{texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.sectionGris}>
        <span className={styles.sectionKicker}>POUR TOUS LES GOUTS</span>
        <h2 className={styles.sectionTitre}>Explorez par categorie</h2>
        <div className={styles.categories}>
          {CATEGORIES.map((c) => (
            <Link key={c.cat} to="/evenements" className={styles.categorie}>
              {c.nom}
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.final}>
        <h2 className={styles.finalTitre}>Pret a sortir a Dakar ?</h2>
        <p className={styles.finalTexte}>
          Rejoignez SenEvent et ne manquez plus aucun evenement.
        </p>
        <Link to="/evenements" className={styles.ctaPrimaire}>
          Voir tous les evenements
        </Link>
      </section>

      <footer className={styles.footer}>
        <strong>SenEvent</strong>
        <span>Projet RETEL · UCAD Dakar · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

export default Landing;
