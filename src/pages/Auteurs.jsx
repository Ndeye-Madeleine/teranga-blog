// TODO(P404) : Étape 4 puis 5.
// Liste des auteurs chargés depuis l'API.
import { useEffect, useState } from "react";
import EtatRequete from "../components/EtatRequete.jsx";
import { API_URL } from "../constants.js";

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controleur = new AbortController();

    fetch(`${API_URL}/users`, { signal: controleur.signal })
      .then((reponse) => {
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`);
        return reponse.json();
      })
      .then((donnees) => {
        setAuteurs(donnees);
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

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      <section className="grille">
        {auteurs.map((auteur) => (
          <article className="carte" key={auteur.id}>
            <h3>{auteur.name}</h3>
            <p className="discret">@{auteur.username}</p>
            <p>{auteur.email}</p>
            <p>{auteur.company.name}</p>
          </article>
        ))}
      </section>
    </EtatRequete>
  );
}