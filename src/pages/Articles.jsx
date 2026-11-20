// Liste des articles chargés depuis l'API, avec recherche.
import { useEffect, useState } from "react";
import BarreRecherche from "../components/BarreRecherche.jsx";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeArticles from "../components/ListeArticles.jsx";
import { API_URL } from "../constants.js";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/posts?_limit=12`, { signal: controleur.signal })
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

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id)
        ? actuels.filter((favoriId) => favoriId !== id)
        : [...actuels, id]
    );
  }

  const articlesAffiches = articles.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      <p>{favoris.length} article(s) en favori</p>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesAffiches}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </>
  );
}