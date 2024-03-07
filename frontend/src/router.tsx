import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PropsWithChildren } from "react";
import { useMyUserQuery } from "./hooks/useUser";
import { FourOFourPage } from "./pages/FourOFourPage";
import { AuthenticatePage } from "./pages/AuthenticatePage";
import { CharacterPage } from "./pages/CharacterPage";
import { PageLayout } from "./pages/PageLayout";

const ProtectedRoute = ({children}: PropsWithChildren) => {
  const { user } = useMyUserQuery();
  if (!user?.token) return <Navigate to="/login" replace />
  return <>{children}</>
};

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PageLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/character",
        element: (
          <HomePage />
        ),
      },
      {
        path: "/character/:characterId",
        element: (
            <CharacterPage />
        ),
      },
    ]
  },
  {
    path: "/login",
    element: <AuthenticatePage />
  },
  {
    path: "/signup",
    element: <AuthenticatePage />
  },
  {
    path: "/*",
    element: <FourOFourPage />
  }
];

export const router = createBrowserRouter(routes);
