// Formulaire contrôlé : nom et message, avec validation avant ajout.
// Props attendues : onAjouter (fonction appelée avec le nouveau commentaire).
import { useState } from "react";

export default function CommentaireForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  function gererEnvoi(evenement) {
    evenement.preventDefault();

    const nomNettoye = nom.trim();
    const messageNettoye = message.trim();

    if (nomNettoye === "") {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (messageNettoye.length < 5) {
      setErreur("Le message doit contenir au moins 5 caractères.");
      return;
    }

    onAjouter({
      id: crypto.randomUUID(),
      name: nomNettoye,
      body: messageNettoye,
    });
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form onSubmit={gererEnvoi}>
      <label htmlFor="commentaire-nom">Nom</label>
      <input
        id="commentaire-nom"
        className="champ"
        value={nom}
        onChange={(evenement) => setNom(evenement.target.value)}
      />

      <label htmlFor="commentaire-message">Message</label>
      <textarea
        id="commentaire-message"
        className="champ"
        value={message}
        onChange={(evenement) => setMessage(evenement.target.value)}
      />

      {erreur && <p className="message-erreur">{erreur}</p>}

      <button className="bouton" type="submit">
        Publier le commentaire
      </button>
    </form>
  );
}