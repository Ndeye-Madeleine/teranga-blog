// TODO(P302) : Étape 3 (chapitre 3).
// Champ de recherche contrôlé.
// Props attendues : valeur (texte), onChangement (fonction).
export default function BarreRecherche({ valeur, onChangement }) {
  return (
    <input
      className="champ"
      type="search"
      value={valeur}
      onChange={(evenement) => onChangement(evenement.target.value)}
      placeholder="Rechercher un article par titre"
    />
  );
}