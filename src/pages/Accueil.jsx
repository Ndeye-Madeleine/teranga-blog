// TODO(P502) : Étape 5.
// Page d'accueil : présentation et les derniers articles.
import { useState } from "react";
import BarreRecherche from "../components/BarreRecherche.jsx";
import CommentaireForm from "../components/CommentaireForm.jsx";
import ListeArticles from "../components/ListeArticles.jsx";
import ListeCommentaires from "../components/ListeCommentaires.jsx";
import { articlesDeTest, commentairesDeTest } from "../donnees-test.js";
import Articles from "./Articles.jsx";

export default function Accueil() {
  const [favoris, setFavoris] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [commentaires, setCommentaires] = useState(commentairesDeTest);

  function basculerFavori(id) {
    setFavoris((actuels) =>
      actuels.includes(id)
        ? actuels.filter((favoriId) => favoriId !== id)
        : [...actuels, id]
    );
  }

  function ajouterCommentaire(nouveau) {
    setCommentaires((actuels) => [...actuels, nouveau]);
  }

  const articlesAffiches = articlesDeTest.filter((article) =>
    article.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <>
      <Articles /> {/* TEMPORAIRE : à retirer à l'étape 5 */}
      <p>{favoris.length} article(s) en favori</p>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />
      <ListeArticles
        articles={articlesAffiches}
        favoris={favoris}
        onBasculerFavori={basculerFavori}
      />

      {/* TEMPORAIRE : test des commentaires avant la page Article */}
      <ListeCommentaires commentaires={commentaires} />
      <CommentaireForm onAjouter={ajouterCommentaire} />
    </>
  );
}