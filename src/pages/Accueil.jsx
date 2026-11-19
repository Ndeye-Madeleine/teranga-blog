// TODO(P502) : Étape 5.
// Page d'accueil : présentation et les derniers articles.
import { useState } from "react";
import BarreRecherche from "../components/BarreRecherche.jsx";
import ListeArticles from "../components/ListeArticles.jsx";
import { articlesDeTest } from "../donnees-test.js";

export default function Accueil() {
  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id)
        ? actuels.filter((favoriId) => favoriId !== id)
        : [...actuels, id]
    );
  }

  const articlesAffiches = articlesDeTest.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      <p>{favoris.length} article(s) en favori</p>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />
      <ListeArticles
        articles={articlesAffiches}
        favoris={favoris}
        onBasculerFavori={basculerFavori}
      />
    </>
  );
}