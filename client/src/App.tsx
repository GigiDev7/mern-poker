import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Tables from "./pages/Tables";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectRoutes from "./components/ProtectRoutes";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "./actions/auth";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  }, [dispatch]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (user) {
      const decodedToken: any = jwt_decode(user.token);
      if (Date.now() >= decodedToken.exp * 1000) {
        dispatch<any>(logout());
      }
    }
  }, [location.pathname, dispatch]);

  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/tables"
          element={
            <ProtectRoutes>
              <Tables />
            </ProtectRoutes>
          }
        />
        <Route
          path="/table/:tableId"
          element={
            <ProtectRoutes>
              <Game />
            </ProtectRoutes>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
