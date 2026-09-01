import { useEffect, useState } from "react";
import { getProjects } from "../api/projectApi";
import { useAuth } from "@clerk/react";
import { Link } from "react-router-dom";
import "./DashboardPage.css";
import CreateProjectModal from "../components/CreateProjectModal";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showProjectModal, setShowProjectModal] = useState(false);

  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    async function loadProjects() {
      // Wait until Clerk has loaded
      if (!isLoaded) {
        return;
      }

      // User must be signed in
      if (!isSignedIn) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getProjects(getToken);

        console.log("PROJECTS:", response.data);

        setProjects(response.data);
      } catch (error) {
        console.error("Failed to load projects:", error);

        setError("Unable to load your projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [getToken, isLoaded, isSignedIn]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (!isLoaded || loading) {
    return (
      <div className="dashboard-page">
        <div className="empty-projects">
          <i className="fa-solid fa-spinner fa-spin"></i>

          <h3>Loading your projects...</h3>

          <p>CineMind is preparing your workspace.</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // NOT SIGNED IN
  // --------------------------------------------------

  if (!isSignedIn) {
    return (
      <div className="dashboard-page">
        <div className="empty-projects">
          <i className="fa-solid fa-user-lock"></i>

          <h3>Sign in to CineMind</h3>

          <p>Please sign in to access your movie projects and AI workspace.</p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="empty-projects">
          <i className="fa-solid fa-triangle-exclamation"></i>

          <h3>{error}</h3>

          <button
            className="empty-create-btn"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <>
      <div className="dashboard-page">
        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}

        <div className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">CINEMIND STUDIO</p>

            <h1>Your Projects</h1>

            <p className="dashboard-description">
              Create, manage and bring your movie ideas to life.
            </p>
          </div>

          <div
            className="new-project-btn"
            onClick={() => setShowProjectModal(true)}
          >
            <i className="fa-solid fa-plus"></i>
            New Project
          </div>
        </div>

        {/* ========================================= */}
        {/* PROJECT HEADER */}
        {/* ========================================= */}

        <div className="projects-header">
          <h2>All Projects</h2>

          <span>
            {projects.length} {projects.length === 1 ? "project" : "projects"}
          </span>
        </div>

        {/* ========================================= */}
        {/* EMPTY STATE */}
        {/* ========================================= */}

        {projects.length === 0 ? (
          <div className="empty-projects">
            <i className="fa-solid fa-clapperboard"></i>

            <h3>No projects yet</h3>

            <p>
              Create your first movie project and start building your story.
            </p>

            <Link to="/create-project" className="empty-create-btn">
              Create Your First Project
            </Link>
          </div>
        ) : (
          /* ========================================= */
          /* PROJECT GRID */
          /* ========================================= */

          <div className="projects-grid">
            {projects.map((project) => (
              <Link
                to={`/projects/${project.id}`}
                className="project-card"
                key={project.id}
              >
                {/* CARD TOP */}

                <div className="project-card-top">
                  <div className="project-icon">
                    <i className="fa-solid fa-film"></i>
                  </div>

                  <span className="project-arrow">
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                </div>

                {/* PROJECT INFO */}

                <div className="project-info">
                  <h3>{project.title}</h3>

                  {project.genre && (
                    <span className="project-genre">{project.genre}</span>
                  )}

                  {project.description && <p>{project.description}</p>}
                </div>

                {/* CARD FOOTER */}

                <div className="project-card-footer">
                  <span>
                    <i className="fa-regular fa-clock"></i>
                    Project
                  </span>

                  <span className="open-project">
                    Open Project
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
    </>
  );
}

export default DashboardPage;
