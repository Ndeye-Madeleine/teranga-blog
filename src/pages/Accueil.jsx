// Page d'accueil : présentation et les derniers articles.
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeArticles from "../components/ListeArticles.jsx";
import { API_URL } from "../constants.js";

export default function Accueil() {
  const { favoris, basculerFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/posts?_limit=6`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
        return reponse.json();
      })
      .then((donnees) => {
        setArticles(donnees);
        setChargement(false);
      })
      .catch((erreurRequete) => {
        if (erreurRequete.name !== "AbortError") {
          setErreur(erreurRequete.message);
          setChargement(false);
        }
      });

    return () => controleur.abort();
  }, []);

  return (
    <>
      <h1>Bienvenue sur Teranga Blog</h1>
      <p>Les derniers articles de la communauté.</p>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles}
          favoris={favoris.map((favori) => favori.id)}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </>
  );
}