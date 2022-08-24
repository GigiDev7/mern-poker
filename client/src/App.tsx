import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Tables from "./pages/Tables";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });
    }
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tables" element={<Tables />} />
      <Route path="/table/:tableId" element={<Game />} />
    </Routes>
  );
}

export default App;
