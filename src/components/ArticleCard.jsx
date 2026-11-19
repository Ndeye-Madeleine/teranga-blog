// TODO(P101) : Étape 1 (chapitre 1) puis étape 2 (chapitre 2).
// Carte d'un article.
// Props attendues : article (objet avec id, title, body), et plus tard estFavori, onBasculerFavori.
export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  const extrait =
    article.body.length > 60 ? article.body.slice(0, 60) + "..." : article.body;

  return (
    <article className="carte">
      <h3>{article.title}</h3>
      <p>{extrait}</p>
      <button className="bouton" onClick={() => onBasculerFavori(article.id)}>
        {estFavori ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </article>
  );
}