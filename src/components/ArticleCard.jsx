// Carte d'un article.
// Props attendues : article (objet avec id, title, body), et plus tard estFavori, onBasculerFavori.
import { Link } from "react-router";

export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  const extrait =
    article.body.length > 60 ? article.body.slice(0, 60) + "..." : article.body;

  return (
    <article className="carte">
      <h3>
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h3>
      <p>{extrait}</p>
      <button className="bouton" onClick={() => onBasculerFavori(article)}>
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </article>
  );
}