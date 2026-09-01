import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { getProject } from "../api/projectApi";
import "./ProjectPage.css";

function ProjectPage() {
  const { id } = useParams();
  const location = useLocation();
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const navigationBlueprint = location.state?.blueprint || null;

  const [project, setProject] = useState(null);
  const [blueprint, setBlueprint] = useState(navigationBlueprint);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    async function loadProject() {
      try {
        setLoading(true);
        setError("");

        const response = await getProject(id, getToken);

        setProject(response.data);

        if (!navigationBlueprint && response.data?.blueprint) {
          setBlueprint(response.data.blueprint);
        }
      } catch (err) {
        console.error("Failed to load project:", err);
        setError("Unable to load this project.");
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id, navigationBlueprint, getToken, isLoaded, isSignedIn]);

  /* ================================
     LOADING
  ================================= */

  if (loading) {
    return (
      <div className="project-loading">
        <div className="loading-spinner"></div>

        <p>Loading project...</p>
      </div>
    );
  }

  /* ================================
     ERROR
  ================================= */

  if (error) {
    return (
      <div className="project-error">
        <i className="fa-solid fa-triangle-exclamation"></i>

        <h2>{error}</h2>

        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  /* ================================
     PROJECT NOT FOUND
  ================================= */

  if (!project) {
    return (
      <div className="project-error">
        <i className="fa-solid fa-film"></i>

        <h2>Project not found</h2>

        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  /* ================================
     BLUEPRINT DATA
  ================================= */

  const masterPlan = blueprint?.master_plan;
  const research = blueprint?.research;
  /*const image = blueprint?.image;*/
  const story = blueprint?.story;
  const characters = blueprint?.characters;
  const storyboard = blueprint?.storyboard;
  const production = blueprint?.production;
  const marketing = blueprint?.marketing;
  const music = blueprint?.music;

  return (
    <div className="project-page">
      {/* ================================
          HEADER
      ================================= */}

      <header className="project-header">
        <div>
          <Link to="/dashboard" className="back-projects">
            <i className="fa-solid fa-arrow-left"></i>
            All Projects
          </Link>

          <div className="project-title-row">
            <div className="project-main-icon">
              <i className="fa-solid fa-film"></i>
            </div>

            <div>
              <p className="project-eyebrow">MOVIE PROJECT</p>

              <h1>{project.title}</h1>

              {project.genre && (
                <span className="project-main-genre">{project.genre}</span>
              )}
            </div>
          </div>
        </div>

        {/*{!blueprint && (
          <Link to={`/projects/${id}/generate`} className="generate-ai-btn">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            Start AI Production
          </Link>
        )}*/}
      </header>

      {/* ================================
          DESCRIPTION
      ================================= */}

      {project.description && (
        <div className="project-description-card">
          <div className="description-icon">
            <i className="fa-solid fa-align-left"></i>
          </div>

          <div>
            <span className="section-label">PROJECT DESCRIPTION</span>

            <p>{project.description}</p>
          </div>
        </div>
      )}

      {/* ================================
          BLUEPRINT
      ================================= */}

      {blueprint ? (
        <section className="blueprint-section">
          {/* ================================
              BLUEPRINT HEADER
          ================================= */}

          <div className="workspace-heading">
            <div>
              <span className="section-label">CINEMIND AI PRODUCTION</span>

              <h2>Movie Blueprint</h2>
            </div>

            <span className="workspace-status">
              <span className="status-circle"></span>
              AI Generated
            </span>
          </div>

          {/* ================================
              MASTER PLAN
          ================================= */}

          {masterPlan && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">MASTER DIRECTOR AGENT</span>

                  <h2>Production Direction</h2>
                </div>
              </div>

              <div className="workspace-grid">
                <WorkspaceInfoCard
                  icon="fa-compass"
                  title="Project Direction"
                  content={masterPlan.project_direction}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-feather-pointed"
                  title="Story Focus"
                  content={masterPlan.story_focus}
                  accent="blue"
                />

                <WorkspaceInfoCard
                  icon="fa-users"
                  title="Character Focus"
                  content={masterPlan.character_focus}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-palette"
                  title="Visual Focus"
                  content={masterPlan.visual_focus}
                  accent="blue"
                />

                <WorkspaceInfoCard
                  icon="fa-calendar-days"
                  title="Production Focus"
                  content={masterPlan.production_focus}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-bullhorn"
                  title="Marketing Focus"
                  content={masterPlan.marketing_focus}
                  accent="blue"
                />

                <WorkspaceInfoCard
                  icon="fa-music"
                  title="Music Focus"
                  content={masterPlan.music_focus}
                  accent="purple"
                />
              </div>
            </section>
          )}

          {/* ================================
          RESEARCH AGENT
          ================================= */}

          {research && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">
                    RESEARCH AGENT • PARALLEL
                  </span>

                  <h2>Research Intelligence</h2>
                </div>

                <span className="workspace-status">
                  <span className="status-circle"></span>
                  Web Research Complete
                </span>
              </div>

              {/* GENRE TRENDS */}

              {research.genre_trends?.length > 0 && (
                <div className="workspace-grid">
                  <InfoListCard
                    icon="fa-chart-line"
                    title="Genre Trends"
                    items={research.genre_trends}
                    accent="purple"
                  />

                  {/* SIMILAR MOVIES */}

                  <InfoListCard
                    icon="fa-film"
                    title="Comparable Movies"
                    items={research.similar_movies}
                    accent="blue"
                  />
                </div>
              )}

              {/* AUDIENCE + CREATIVE REFERENCES */}

              <div className="workspace-grid">
                {research.audience_insights?.length > 0 && (
                  <InfoListCard
                    icon="fa-users"
                    title="Audience Insights"
                    items={research.audience_insights}
                    accent="purple"
                  />
                )}

                {research.creative_references?.length > 0 && (
                  <InfoListCard
                    icon="fa-lightbulb"
                    title="Creative References"
                    items={research.creative_references}
                    accent="blue"
                  />
                )}
              </div>

              {/* SOURCES */}

              {research.sources?.length > 0 && (
                <div className="research-sources">
                  <div className="research-sources-header">
                    <div className="workspace-icon">
                      <i className="fa-solid fa-globe"></i>
                    </div>

                    <div>
                      <span className="section-label">WEB SOURCES</span>
                      <h3>Research Sources</h3>
                    </div>
                  </div>

                  <div className="research-source-list">
                    {research.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="research-source"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>

                        <span>{source}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* ================================
              STORY
          ================================= */}

          {story && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">SCREENWRITER AGENT</span>

                  <h2>Story Foundation</h2>
                </div>
              </div>

              {/* LOGLINE */}

              {story.logline && (
                <div className="project-description-card">
                  <div className="description-icon">
                    <i className="fa-solid fa-feather-pointed"></i>
                  </div>

                  <div>
                    <span className="section-label">LOGLINE</span>

                    <p>{story.logline}</p>
                  </div>
                </div>
              )}

              {/* THEME + TONE + CONFLICT */}

              <div className="workspace-grid">
                {story.theme && (
                  <WorkspaceInfoCard
                    icon="fa-lightbulb"
                    title="Theme"
                    content={story.theme}
                    accent="purple"
                  />
                )}

                {story.tone && (
                  <WorkspaceInfoCard
                    icon="fa-wave-square"
                    title="Tone"
                    content={story.tone}
                    accent="blue"
                  />
                )}

                {story.main_conflict && (
                  <WorkspaceInfoCard
                    icon="fa-bolt"
                    title="Main Conflict"
                    content={story.main_conflict}
                    accent="purple"
                  />
                )}
              </div>

              {/* THREE ACT STRUCTURE */}

              {story.story_structure && (
                <>
                  <div className="workspace-heading">
                    <div>
                      <span className="section-label">STORY DEVELOPMENT</span>

                      <h2>Three-Act Structure</h2>
                    </div>
                  </div>

                  <div className="storyboard-grid">
                    <ActCard
                      number="01"
                      title="Act I — Setup"
                      content={story.story_structure.act_1}
                    />

                    <ActCard
                      number="02"
                      title="Act II — Confrontation"
                      content={story.story_structure.act_2}
                    />

                    <ActCard
                      number="03"
                      title="Act III — Resolution"
                      content={story.story_structure.act_3}
                    />
                  </div>
                </>
              )}
            </section>
          )}

          {/* ================================
              CHARACTERS
          ================================= */}

          {characters?.characters?.length > 0 && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">CHARACTER AGENT</span>

                  <h2>Characters</h2>
                </div>
              </div>

              <div className="ai-team-grid">
                {characters.characters.map((character, index) => (
                  <div className="ai-agent-card" key={character.id || index}>
                    <div className="agent-icon">
                      <i className="fa-solid fa-user-astronaut"></i>
                    </div>

                    <div className="agent-info">
                      <h3>{character.name}</h3>

                      {character.role && <p>{character.role}</p>}

                      {character.description && <p>{character.description}</p>}
                    </div>

                    <div className="agent-ready">
                      <span></span>
                      Generated
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================================
              STORYBOARD
          ================================= */}

          {storyboard?.scenes?.length > 0 && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">STORYBOARD AGENT</span>

                  <h2>Storyboard</h2>
                </div>
              </div>

              <div className="storyboard-grid">
                {storyboard.scenes.map((scene, index) => (
                  <div className="scene-card" key={scene.scene_number || index}>
                    <span className="scene-number">
                      Scene{" "}
                      {String(scene.scene_number || index + 1).padStart(2, "0")}
                    </span>

                    <h3>{scene.title}</h3>

                    <p>{scene.description}</p>

                    {scene.visual_direction && (
                      <div className="visual-direction">
                        <span>
                          <i className="fa-solid fa-camera"></i> VISUAL
                          DIRECTION
                        </span>

                        <p>{scene.visual_direction}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ================================
              PRODUCTION
          ================================= */}

          {production && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">PRODUCER AGENT</span>

                  <h2>Production Plan</h2>
                </div>
              </div>

              <div className="workspace-grid">
                <InfoListCard
                  icon="fa-location-dot"
                  title="Locations"
                  items={production.locations}
                  accent="purple"
                />

                <InfoListCard
                  icon="fa-box"
                  title="Props"
                  items={production.props}
                  accent="blue"
                />

                <WorkspaceInfoCard
                  icon="fa-camera"
                  title="Cinematography"
                  content={production.cinematography}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-lightbulb"
                  title="Lighting"
                  content={production.lighting}
                  accent="blue"
                />
              </div>
            </section>
          )}

          {/* ================================
              MARKETING
          ================================= */}

          {marketing && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">MARKETING AGENT</span>

                  <h2>Marketing Strategy</h2>
                </div>
              </div>

              <div className="workspace-grid">
                <WorkspaceInfoCard
                  icon="fa-quote-left"
                  title="Tagline"
                  content={marketing.tagline}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-users"
                  title="Target Audience"
                  content={marketing.target_audience}
                  accent="blue"
                />

                <WorkspaceInfoCard
                  icon="fa-image"
                  title="Poster Concept"
                  content={marketing.poster_concept}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-bullhorn"
                  title="Campaign Strategy"
                  content={marketing.campaign_strategy}
                  accent="blue"
                />
              </div>
            </section>
          )}

          {/* ================================
              MUSIC
          ================================= */}

          {music && (
            <section className="blueprint-block">
              <div className="workspace-heading">
                <div>
                  <span className="section-label">MUSIC AGENT</span>

                  <h2>Music & Sound</h2>
                </div>
              </div>

              <div className="workspace-grid">
                <WorkspaceInfoCard
                  icon="fa-music"
                  title="Musical Style"
                  content={music.musical_style}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-heart"
                  title="Mood"
                  content={music.mood}
                  accent="blue"
                />

                <InfoListCard
                  icon="fa-guitar"
                  title="Instruments"
                  items={music.instruments}
                  accent="purple"
                />

                <WorkspaceInfoCard
                  icon="fa-headphones"
                  title="Soundtrack Direction"
                  content={music.soundtrack_direction}
                  accent="blue"
                />
              </div>
            </section>
          )}
        </section>
      ) : (
        <div className="project-description-card">
          <div className="description-icon">
            <i className="fa-solid fa-wand-magic-sparkles"></i>
          </div>

          <div>
            <span className="section-label">CINEMIND AI PRODUCTION</span>

            <h2>Movie Blueprint</h2>

            <p>
              Your AI production team is ready to transform this project into a
              complete movie blueprint.
            </p>

            <Link
              to={`/projects/${id}/generate`}
              className="generate-ai-btn"
              style={{
                display: "inline-flex",
                marginTop: "18px",
              }}
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Start AI Production
            </Link>
          </div>
        </div>
      )}

      {/* ================================
          PRODUCTION WORKSPACE
      ================================= */}

      <section className="production-overview">
        <div className="workspace-heading">
          <div>
            <span className="section-label">PRODUCTION WORKSPACE</span>

            <h2>Production Team</h2>
          </div>

          <span className="workspace-status">
            <span className="status-circle"></span>

            {blueprint ? "Project Ready" : "Preparing"}
          </span>
        </div>

        <div className="card-oh">
          <div className="eyebrow-oh">CineMind architecture</div>

          <h1>Multi-Agent Production Architecture</h1>

          <div className="arch-oh">
            {/* Master Director */}
            <div className="master-oh">
              <div className="icon-wrap-oh">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
                </svg>
              </div>

              <div>
                <div className="title-oh">Master Director</div>
                <div className="desc-oh">Central orchestrator</div>
              </div>
            </div>

            <div className="orchestrator-tag-oh">orchestrator</div>

            <div
              className="connector-oh"
              data-label="coordinates-oh"
              style={{ marginTop: "22px" }}
            />

            {/* Research Agent */}
            <div className="node stage-oh">
              <svg
                className="icon-oh"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>

              <div className="label-oh">Research Agent</div>
            </div>

            <div className="connector-oh" />

            {/* Story Agent */}
            <div className="node stage-oh">
              <svg
                className="icon-oh"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>

              <div className="label-oh">Story Agent</div>
            </div>

            <div className="connector-oh" />

            {/* Specialized Agents */}
            <div className="branch-wrap-oh">
              <div className="tier-label-oh">specialized intelligence</div>

              <div className="branch-row-oh">
                {/* Character */}
                <div className="branch-item-oh">
                  <div className="node-oh">
                    <svg
                      className="icon-oh"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                    </svg>

                    <div className="label-oh">Character</div>
                    <div className="tag-oh">Cast intelligence</div>
                  </div>
                </div>

                {/* Marketing */}
                <div className="branch-item-oh">
                  <div className="node-oh">
                    <svg
                      className="icon-oh"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 11v2a2 2 0 0 0 2 2h1l5 4V5L6 9H5a2 2 0 0 0-2 2z" />
                      <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" />
                    </svg>

                    <div className="label-oh">Marketing</div>
                    <div className="tag-oh">Audience strategy</div>
                  </div>
                </div>

                {/* Music */}
                <div className="branch-item-oh">
                  <div className="node-oh">
                    <svg
                      className="icon-oh"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18V5l12-2v13" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>

                    <div className="label-oh">Music</div>
                    <div className="tag-oh">Score and sound</div>
                  </div>
                </div>
              </div>

              <div className="branch-converge-oh">
                <div className="stub-oh" />
                <div className="stub-oh" />
                <div className="stub-oh" />
              </div>

              <div className="branch-merge-line-oh" />
            </div>

            <div className="connector-oh" />

            {/* Storyboard */}
            <div className="node stage-oh">
              <svg
                className="icon-oh"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="5" width="20" height="14" rx="1" />
                <path d="M6 5v14M18 5v14" />
              </svg>

              <div className="label-oh">Storyboard Agent</div>
            </div>

            <div className="connector-oh" />

            {/* Production */}
            <div className="node stage-oh">
              <svg
                className="icon-oh"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8l4-3 3 2 4-3 3 2 4-3v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8z" />
                <path d="M3 8h18" />
              </svg>

              <div className="label-oh">Production Agent</div>
            </div>

            <div className="connector-oh" />

            {/* Final Production */}
            <div className="final-oh">
              <div className="icon-wrap-oh">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path
                    d="M10 9l5 3-5 3V9z"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>

              <div>
                <div className="title-oh">Final Production</div>
                <div className="desc-oh">Coordinated output</div>
              </div>
            </div>
          </div>

          <div className="footer-tag-oh">
            <span>1</span> master director &nbsp;+&nbsp;
            <span>7</span> specialized agents
          </div>
        </div>
      </section>
    </div>
  );
}

/* =================================================
   WORKSPACE INFORMATION CARD
================================================= */

function WorkspaceInfoCard({ icon, title, content, accent }) {
  if (!content) return null;

  return (
    <div className={`workspace-card ${accent}`}>
      <div className="workspace-card-top">
        <div className="workspace-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>
      </div>

      <h3>{title}</h3>

      <p>{content}</p>
    </div>
  );
}

/* =================================================
   LIST INFORMATION CARD
================================================= */

function InfoListCard({ icon, title, items, accent }) {
  if (!items?.length) return null;

  return (
    <div className={`workspace-card ${accent}`}>
      <div className="workspace-card-top">
        <div className="workspace-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>
      </div>

      <h3>{title}</h3>

      <div className="info-list">
        {items.map((item, index) => (
          <p key={index}>• {item}</p>
        ))}
      </div>
    </div>
  );
}

/* =================================================
   ACT CARD
================================================= */

function ActCard({ number, title, content }) {
  if (!content) return null;

  return (
    <div className="scene-card">
      <span className="scene-number">ACT {number}</span>

      <h3>{title}</h3>

      <p>{content}</p>
    </div>
  );
}

/* =================================================
   WORKSPACE CARD
================================================= */

function WorkspaceCard({ icon, title, description, progress, accent }) {
  return (
    <div className={`workspace-card ${accent}`}>
      <div className="workspace-card-top">
        <div className="workspace-icon">
          <i className={`fa-solid ${icon}`}></i>
        </div>

        <span className="workspace-progress">{progress}%</span>
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="workspace-progress-track">
        <div
          className="workspace-progress-fill"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>

      <span className="workspace-card-status">
        {progress >= 100
          ? "Generated"
          : progress > 0
            ? "Generating"
            : "Ready to generate"}
      </span>
    </div>
  );
}

export default ProjectPage;
