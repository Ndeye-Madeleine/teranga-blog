// TODO(P401) : Étape 4 (chapitre 4).
// Affiche chargement, erreur ou le contenu (children) selon l'état d'une requête.
// Props attendues : chargement (booléen), erreur (texte ou null), children.
export default function EtatRequete({ chargement, erreur, children }) {
  if (erreur) {
    return (
      <p className="etat-erreur">Impossible de charger les données : {erreur}</p>
    );
  }

  if (chargement) {
    return <p className="etat-chargement">Chargement en cours...</p>;
  }

  return <>{children}</>;
}