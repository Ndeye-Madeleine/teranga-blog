// TODO(P304) : Étape 3 (chapitre 3).
// Affiche les commentaires d'un article.
// Props attendues : commentaires (tableau avec id, name, body).
export default function ListeCommentaires({ commentaires }) {
  return (
    <section>
      <h3>Commentaires ({commentaires.length})</h3>
      {commentaires.length === 0 && (
        <p className="discret">Aucun commentaire pour le moment.</p>
      )}
      {commentaires.map((commentaire) => (
        <article className="carte" key={commentaire.id}>
          <strong>{commentaire.name}</strong>
          <p>{commentaire.body}</p>
        </article>
      ))}
    </section>
  );
}