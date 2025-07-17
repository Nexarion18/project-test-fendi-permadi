import { NavLink, BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Components/Layout";
import Ideas from "./pages/ideas";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Jika URL === "/" redirect ke /ideas */}
          <Route index element={<Navigate to="/ideas" replace />} />
          <Route path="ideas" element={<Ideas />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
