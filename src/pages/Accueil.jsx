// TODO(P502) : Étape 5.
// Page d'accueil : présentation et les derniers articles.
import ArticleCard from "../components/ArticleCard.jsx";
import { articlesDeTest } from "../donnees-test.js";

export default function Accueil() {
  return (
    <section className="grille">
      <ArticleCard article={articlesDeTest[0]} />
      <ArticleCard article={articlesDeTest[1]} />
      <ArticleCard article={articlesDeTest[2]} />
    </section>
  );
}