// TODO(P503) : Étape 5.
// Articles mis en favori, partagés par le layout (useOutletContext).
import { useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles.jsx";

export default function Favoris() {
  const { favoris, basculerFavori } = useOutletContext();

  if (favoris.length === 0) {
    return <p className="discret">Aucun article en favori pour le moment.</p>;
  }

  return (
    <>
      <h2>Mes favoris ({favoris.length})</h2>
      <ListeArticles
        articles={favoris}
        favoris={favoris.map((favori) => favori.id)}
        onBasculerFavori={basculerFavori}
      />
    </>
  );
}