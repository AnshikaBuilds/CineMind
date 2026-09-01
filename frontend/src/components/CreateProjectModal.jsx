import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { createProject } from "../api/projectApi";
import "./CreateProjectModal.css";

function CreateProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const [project, setProject] = useState({
    title: "",
    genre: "",
    description: "",
  });

  const [creating, setCreating] = useState(false);

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      const response = await createProject(project, getToken);

      console.log("Project created:", response.data);

      const newProject = response.data;

      onClose();

      navigate(`/projects/${newProject.id}/generate`);
    } catch (error) {
      console.error("Failed to create project:", error);
      console.error("Backend response:", error.response?.data);

      alert(error.response?.data?.detail || "Failed to create project.");
    } finally {
      setCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="createProjectModal">
        <div className="modalHeader">
          <div>
            <h2>Create New Project</h2>
            <p>Start a new AI-powered movie production.</p>
          </div>

          <button className="closeBtn" onClick={onClose} type="button">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modalBody">
            <label>Project Title</label>

            <input
              type="text"
              name="title"
              placeholder="Echoes of Europa"
              value={project.title}
              onChange={handleChange}
              required
            />

            <label>Genre</label>

            <input
              type="text"
              name="genre"
              placeholder="Sci-Fi"
              value={project.genre}
              onChange={handleChange}
              required
            />

            <label>Description</label>

            <textarea
              rows="5"
              name="description"
              placeholder="Describe your movie..."
              value={project.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="modalFooter">
            <button className="cancelBtn" onClick={onClose} type="button">
              Cancel
            </button>

            <button className="createBtn" type="submit" disabled={creating}>
              <i className="fa-solid fa-wand-magic-sparkles"></i>

              {creating ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProjectModal;
