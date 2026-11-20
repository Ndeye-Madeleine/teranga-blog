// TODO(P501) : Étape 5 (chapitre 5).
// Mise en page partagée : barre de navigation (NavLink) + zone de page (Outlet).
// L'état des favoris sera remonté ici puis partagé avec useOutletContext.
// Le logo est fourni : public/logo-teranga-blog.png, servi à l'adresse /logo-teranga-blog.png.
// Affiche-le dans la barre de navigation (balise img avec un texte alternatif), avec un Link vers l'accueil.
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

export default function LayoutPrincipal() {
  const [favoris, setFavoris] = useState([]);

  function basculerFavori(article) {
    setFavoris((actuels) =>
      actuels.some((favori) => favori.id === article.id)
        ? actuels.filter((favori) => favori.id !== article.id)
        : [...actuels, article]
    );
  }

  return (
    <div className="conteneur">
      <nav className="barre-nav">
        <Link to="/">
          <img src="/logo-teranga-blog.png" alt="Teranga Blog" height="40" />
        </Link>
        <NavLink to="/" end>
          Accueil
        </NavLink>
        <NavLink to="/articles">Articles</NavLink>
        <NavLink to="/auteurs">Auteurs</NavLink>
        <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
      </nav>
      <main>
        <Outlet context={{ favoris, basculerFavori }} />
      </main>
    </div>
  );
}