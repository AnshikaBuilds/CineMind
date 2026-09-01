import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../api/projectApi";
import "./CreateProject.css";

function CreateProject() {
  const navigate = useNavigate();

  const [project, setProject] = useState({
    title: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createProject(project);

      console.log("Created project:", response.data);

      const newProject = response.data;

      // Open the newly created project's page
      navigate(`/projects/${newProject.id}/generate`);
    } catch (error) {
      console.error("Failed to create project:", error);
      console.error(error.response?.data);

      alert("Failed to create project.");
    }
  };

  return (
    <div className="create-project-page">
      <div className="create-project-card">
        <h1>Create New AI Project</h1>

        <p className="subtitle">
          Start a brand new AI-powered movie production.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Movie Title</label>

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
            rows="7"
            name="description"
            placeholder="Describe your movie idea..."
            value={project.description}
            onChange={handleChange}
            required
          />

          <button type="submit" className="createProjectBtn">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
