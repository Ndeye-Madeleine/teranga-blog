// TODO(P504) : Étape 5.
// Page 404, affichée pour toute URL inconnue.
import { Link } from "react-router";

export default function Introuvable() {
  return (
    <>
      <h2>Page introuvable (404)</h2>
      <p>L'adresse demandée n'existe pas.</p>
      <Link to="/">Retour à l'accueil</Link>
    </>
  );
}