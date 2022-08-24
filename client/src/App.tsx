import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Tables from "./pages/Tables";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectRoutes from "./components/ProtectRoutes";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  });

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
