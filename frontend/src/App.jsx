import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Navbar2 from "./components/navbar2";
import Heading from "./components/heading";
import CreateProject from "./pages/CreateProject";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
import Agentspage from "./pages/Agentspage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="layout">
        <Navbar2 />

        <div className="content">
          <Routes>
            <Route path="/" element={<Heading />} />

            <Route path="/create-project" element={<CreateProject />} />

            <Route path="/dashboard" element={<DashboardPage />} />

            <Route path="/projects/:id" element={<ProjectPage />} />

            <Route path="/projects/:id/generate" element={<Agentspage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
