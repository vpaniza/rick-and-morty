import { Navigate, RouteObject, createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { PropsWithChildren } from "react";
import { useMyUserQuery } from "./hooks/useUser";
import { FourOFourPage } from "./pages/FourOFourPage";
import { CharacterPage } from "./pages/CharacterPage";
import { PageLayout } from "./pages/PageLayout";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";

const ProtectedRoute = ({children}: PropsWithChildren) => {
  const { user } = useMyUserQuery();
  if (!user?.token) return <Navigate to="/login" replace />

  if (!children) return <Navigate to="/character" replace />;
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
        index: true, 
        element: <Navigate to="/character" replace />, // Redirect to /character if user visits "/"
      },
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
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignUpPage />
  },
  {
    path: "/*",
    element: <FourOFourPage />
  }
];

export const router = createBrowserRouter(routes);
