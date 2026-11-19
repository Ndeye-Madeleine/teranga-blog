// TODO(P502) : Étape 5.
// Page d'accueil : présentation et les derniers articles.
import { useState } from "react";
import ArticleCard from "../components/ArticleCard.jsx";
import { articlesDeTest } from "../donnees-test.js";

export default function Accueil() {
  const [favoris, setFavoris] = useState([]);

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id)
        ? actuels.filter((favoriId) => favoriId !== id)
        : [...actuels, id]
    );
  }

  return (
    <>
      <p>{favoris.length} article(s) en favori</p>
      <section className="grille">
        <ArticleCard
          article={articlesDeTest[0]}
          estFavori={favoris.includes(articlesDeTest[0].id)}
          onBasculerFavori={basculerFavori}
        />
        <ArticleCard
          article={articlesDeTest[1]}
          estFavori={favoris.includes(articlesDeTest[1].id)}
          onBasculerFavori={basculerFavori}
        />
        <ArticleCard
          article={articlesDeTest[2]}
          estFavori={favoris.includes(articlesDeTest[2].id)}
          onBasculerFavori={basculerFavori}
        />
      </section>
    </>
  );
}