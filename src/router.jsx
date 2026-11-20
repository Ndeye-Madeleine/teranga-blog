import { createBrowserRouter } from "react-router";
import LayoutPrincipal from "./layouts/LayoutPrincipal.jsx";
import Accueil from "./pages/Accueil.jsx";
import Article from "./pages/Article.jsx";
import Articles from "./pages/Articles.jsx";
import Auteur from "./pages/Auteur.jsx";
import Auteurs from "./pages/Auteurs.jsx";
import Favoris from "./pages/Favoris.jsx";
import Introuvable from "./pages/Introuvable.jsx";

export const router = createBrowserRouter([
  {
    Component: LayoutPrincipal,
    children: [
      { index: true, Component: Accueil },
      {
        path: "articles",
        children: [
          { index: true, Component: Articles },
          { path: ":id", Component: Article },
        ],
      },
      {
        path: "auteurs",
        children: [
          { index: true, Component: Auteurs },
          { path: ":id", Component: Auteur },
        ],
      },
      { path: "favoris", Component: Favoris },
      { path: "*", Component: Introuvable },
    ],
  },
]);