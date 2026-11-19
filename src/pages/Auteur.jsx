// TODO(P405) : Étape 4 puis 5.
// Fiche d'un auteur (paramètre d'URL id) et ses articles.
import { useEffect, useState } from "react";
import EtatRequete from "../components/EtatRequete.jsx";
import { API_URL } from "../constants.js";

function lireJson(reponse) {
  if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
  return reponse.json();
}

export default function Auteur({ id }) {
  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/users/${id}`, { signal: controleur.signal }).then(lireJson),
      fetch(`${API_URL}/posts?userId=${id}`, { signal: controleur.signal }).then(lireJson),
    ])
      .then(([donneesAuteur, donneesArticles]) => {
        setAuteur(donneesAuteur);
        setArticles(donneesArticles);
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

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      {auteur && (
        <>
          <article className="carte">
            <h2>{auteur.name}</h2>
            <p className="discret">@{auteur.username}</p>
            <p>{auteur.email}</p>
            <p>{auteur.phone}</p>
            <p>{auteur.company.name}</p>
          </article>

          <h3>Articles de {auteur.name} ({articles.length})</h3>
          <ul>
            {articles.map((article) => (
              <li key={article.id}>{article.title}</li>
            ))}
          </ul>
        </>
      )}
    </EtatRequete>
  );
}