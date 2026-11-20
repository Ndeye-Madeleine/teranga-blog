// Détail d'un article (paramètre d'URL id) et ses commentaires.
import { useEffect, useState } from "react";
import CommentaireForm from "../components/CommentaireForm.jsx";
import EtatRequete from "../components/EtatRequete.jsx";
import ListeCommentaires from "../components/ListeCommentaires.jsx";
import { API_URL } from "../constants.js";

function lireJson(reponse) {
  if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
  return reponse.json();
}

export default function Article({ id }) {
  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/posts/${id}`, { signal: controleur.signal }).then(lireJson),
      fetch(`${API_URL}/posts/${id}/comments`, { signal: controleur.signal }).then(lireJson),
    ])
      .then(([donneesArticle, donneesCommentaires]) => {
        setArticle(donneesArticle);
        setCommentaires(donneesCommentaires);
        setChargement(false);
      })
      .catch((erreurRequete) => {
        if (erreurRequete.name !== "AbortError") {
          setErreur(erreurRequete.message);
          setChargement(false);
        }
      });

    return () => controleur.abort();
  }, [id]);

  function ajouterCommentaire(nouveau) {
    setCommentaires((actuels) => [
      ...actuels,
      { ...nouveau, postId: article.id },
    ]);
  }

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      {article && (
        <>
          <article className="carte">
            <h2>{article.title}</h2>
            <p>{article.body}</p>
          </article>
          <ListeCommentaires commentaires={commentaires} />
          <CommentaireForm onAjouter={ajouterCommentaire} />
        </>
      )}
    </EtatRequete>
  );
}