import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { generateMovieStream } from "../api/projectApi";
import "./Agentspage.css";

function Agentspage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getToken, isLoaded, isSignedIn } = useAuth();

  const [currentAgent, setCurrentAgent] = useState("master");
  const [completedAgents, setCompletedAgents] = useState([]);
  const [statusMessage, setStatusMessage] = useState(
    "Starting CineMind AI production...",
  );
  const [error, setError] = useState("");

  const agents = [
    {
      id: "master",
      name: "Master Director",
      description: "Orchestrating the entire movie production",
      icon: "fa-film",
    },
    {
      id: "research",
      name: "Research Agent",
      description:
        "Analyzing current trends, audiences and cinematic references",
      icon: "fa-magnifying-glass-chart",
    },
    {
      id: "story",
      name: "Screenwriter Agent",
      description: "Developing the story and screenplay",
      icon: "fa-feather-pointed",
    },
    {
      id: "characters",
      name: "Character Agent",
      description: "Creating the characters and personalities",
      icon: "fa-user-astronaut",
    },
    {
      id: "storyboard",
      name: "Storyboard Agent",
      description: "Planning scenes and visual compositions",
      icon: "fa-image",
    },
    {
      id: "production",
      name: "Producer Agent",
      description: "Planning production requirements",
      icon: "fa-calendar-days",
    },
    {
      id: "marketing",
      name: "Marketing Agent",
      description: "Developing the marketing strategy",
      icon: "fa-bullhorn",
    },
    {
      id: "music",
      name: "Music & Sound Agent",
      description: "Designing the musical and sound direction",
      icon: "fa-music",
    },
  ];

  /*useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    let cancelled = false;

    const startGeneration = async () => {
      try {
        setError("");

        console.log("Starting movie generation for project:", id);

        // -----------------------------------------
        // CONNECT TO BACKEND SSE STREAM
        // -----------------------------------------

        const response = await generateMovieStream(id, getToken);

        console.log("SSE stream connected ✅");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        // -----------------------------------------
        // READ STREAM
        // -----------------------------------------

        while (!cancelled) {
          const { value, done } = await reader.read();

          if (done) {
            console.log("SSE stream finished.");

            break;
          }

          buffer += decoder.decode(value, {
            stream: true,
          });

          // SSE events are separated by blank lines
          const events = buffer.split("\n\n");

          // Keep incomplete event for next chunk
          buffer = events.pop() || "";

          for (const rawEvent of events) {
            if (!rawEvent.trim()) {
              continue;
            }

            const lines = rawEvent.split("\n");

            const dataLine = lines.find((line) => line.startsWith("data:"));

            if (!dataLine) {
              continue;
            }

            const jsonData = dataLine.replace(/^data:\s;

            try {
              const data = JSON.parse(jsonData);

              console.log("SSE EVENT:", data);

              // -----------------------------------------
              // ERROR
              // -----------------------------------------

              if (data.status === "error") {
                setError(data.message || "Movie generation failed.");

                return;
              }

              // -----------------------------------------
              // AGENT STARTED / WORKING
              // -----------------------------------------

              if (data.agent) {
                setCurrentAgent(data.agent);
              }

              // -----------------------------------------
              // AGENT COMPLETED
              // -----------------------------------------

              if (data.status === "completed") {
                setCompletedAgents((previous) => {
                  if (previous.includes(data.agent)) {
                    return previous;
                  }

                  return [...previous, data.agent];
                });

                setStatusMessage(
                  data.message || `${data.agent} agent completed.`,
                );
              }

              // -----------------------------------------
              // FINAL RESULT
              // -----------------------------------------

              if (data.status === "finished") {
                setCompletedAgents(agents.map((agent) => agent.id));

                setCurrentAgent("finished");

                setStatusMessage(
                  data.message || "CineMind production completed.",
                );
              }

              // -----------------------------------------
              // SAVED
              // -----------------------------------------

              if (data.status === "saved") {
                setStatusMessage("Movie blueprint saved successfully.");

                setTimeout(() => {
                  if (!cancelled) {
                    navigate(`/projects/${id}`, {
                      replace: true,
                    });
                  }
                }, 1000);

                return;
              }
            } catch (parseError) {
              console.error("Invalid SSE event:", parseError, rawEvent);
            }
          }
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("Movie generation connection failed:", error);

        setError(
          error.message || "Connection to CineMind production server was lost.",
        );
      }
    };

    startGeneration();

    // -----------------------------------------
    // CLEANUP
    // -----------------------------------------

    return () => {
      cancelled = true;
    };
  }, [id, navigate, getToken, isLoaded, isSignedIn]);*/

  useEffect(() => {
    if (!isLoaded || !isSignedIn) {
      return;
    }

    let cancelled = false;
    let navigationTimer = null;

    const startGeneration = async () => {
      try {
        setError("");

        console.log("[CineMind] Starting movie generation for project:", id);

        const response = await generateMovieStream(id, getToken);

        console.log("[CineMind] SSE stream connected ✅");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";

        while (!cancelled) {
          const { value, done } = await reader.read();

          if (done) {
            console.log("[CineMind] SSE stream finished.");

            break;
          }

          buffer += decoder.decode(value, {
            stream: true,
          });

          const events = buffer.split("\n\n");

          buffer = events.pop() || "";

          for (const rawEvent of events) {
            if (!rawEvent.trim()) {
              continue;
            }

            const lines = rawEvent.split("\n");

            const dataLine = lines.find((line) => line.startsWith("data:"));

            if (!dataLine) {
              continue;
            }

            const jsonData = dataLine.replace(/^data:\s*/, "");

            try {
              const data = JSON.parse(jsonData);

              console.log("[CineMind] SSE EVENT:", data);

              // -----------------------------------------
              // ERROR
              // -----------------------------------------

              if (data.status === "error") {
                console.error("[CineMind] Backend error:", data.message);

                setError(data.message || "Movie generation failed.");

                return;
              }

              // -----------------------------------------
              // CURRENT AGENT
              // -----------------------------------------

              if (data.agent) {
                setCurrentAgent(data.agent);
              }

              // -----------------------------------------
              // AGENT COMPLETED
              // -----------------------------------------

              if (data.status === "completed") {
                setCompletedAgents((previous) => {
                  if (previous.includes(data.agent)) {
                    return previous;
                  }

                  return [...previous, data.agent];
                });

                setStatusMessage(
                  data.message || `${data.agent} agent completed.`,
                );
              }

              // -----------------------------------------
              // MASTER FINISHED
              // -----------------------------------------

              if (data.status === "finished" && data.agent === "master") {
                console.log(
                  "[CineMind] Master finished. Waiting for saved event...",
                );

                setCompletedAgents(agents.map((agent) => agent.id));

                setCurrentAgent("finished");

                setStatusMessage(
                  data.message || "CineMind production completed.",
                );
              }

              // -----------------------------------------
              // SAVED
              // -----------------------------------------

              if (data.status === "saved") {
                console.log("[CineMind] SAVED received ✅", data);

                setStatusMessage("Movie blueprint saved successfully.");

                navigationTimer = setTimeout(() => {
                  if (cancelled) {
                    return;
                  }

                  console.log(
                    "[CineMind] Navigating to:",
                    `/projects/${data.project_id}`,
                  );

                  navigate(`/projects/${data.project_id}`, {
                    replace: true,
                  });
                }, 800);

                return;
              }
            } catch (parseError) {
              console.error(
                "[CineMind] Invalid SSE event:",
                parseError,
                rawEvent,
              );
            }
          }
        }

        // -----------------------------------------
        // HANDLE FINAL BUFFER
        // -----------------------------------------

        if (buffer.trim() && !cancelled) {
          const lines = buffer.split("\n");

          const dataLine = lines.find((line) => line.startsWith("data:"));

          if (dataLine) {
            const jsonData = dataLine.replace(/^data:\s*/, "");

            try {
              const data = JSON.parse(jsonData);

              console.log("[CineMind] FINAL SSE EVENT:", data);

              if (data.status === "saved") {
                console.log("[CineMind] SAVED received from final buffer ✅");

                navigationTimer = setTimeout(() => {
                  if (!cancelled) {
                    navigate(`/projects/${data.project_id}`, {
                      replace: true,
                    });
                  }
                }, 800);
              }
            } catch (parseError) {
              console.error(
                "[CineMind] Invalid final SSE event:",
                parseError,
                buffer,
              );
            }
          }
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("[CineMind] Movie generation connection failed:", error);

        setError(
          error.message || "Connection to CineMind production server was lost.",
        );
      }
    };

    startGeneration();

    return () => {
      cancelled = true;

      if (navigationTimer) {
        clearTimeout(navigationTimer);
      }
    };
  }, [id, navigate, getToken, isLoaded, isSignedIn]);

  const completedCount = completedAgents.length;

  const progress = Math.round((completedCount / agents.length) * 100);

  const completed = currentAgent === "finished";

  return (
    <div className="generation-page">
      {/* HEADER */}

      <div className="generation-header">
        <div className="generation-icon">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>

        <p className="generation-eyebrow">CineMind Production Intelligence</p>

        <div className="gen">
          <p className="gen-para1">
            Research read the pulse of sci-fi today. Story turned it into a
            spark — an original world waiting to happen. Then Character gave it
            a soul, Music gave it a heartbeat, Marketing gave it a voice, and
            Production gave it form.
          </p>

          <p className="gen-para2">
            Five minds. One vision. A universe, ready to be made.
          </p>
        </div>

        <h1>
          {completed ? "Your movie is ready." : "Your movie is being created."}
        </h1>

        <p>{statusMessage}</p>
      </div>

      {/* MASTER AGENT */}

      <div className="master-agent-card">
        <div className="master-agent-icon">
          <i className="fa-solid fa-film"></i>
        </div>

        <div>
          <span>MASTER AGENT</span>

          <h2>Director Agent</h2>

          <p>
            {completed
              ? "Production planning completed."
              : currentAgent === "master"
                ? "Creating the master production plan..."
                : "Coordinating the production team..."}
          </p>
        </div>

        <div className="master-status">
          <span></span>

          {completed ? "Complete" : "Working"}
        </div>
      </div>

      {/* ERROR */}

      {error && (
        <div className="generation-error">
          <i className="fa-solid fa-circle-exclamation"></i>

          <span>{error}</span>
        </div>
      )}

      {/* AGENTS */}

      <div className="agents-progress">
        {agents.map((agent, index) => {
          const isCompleted = completedAgents.includes(agent.id);

          const isWorking = currentAgent === agent.id;

          return (
            <div
              className={`generation-agent ${
                isCompleted ? "completed" : isWorking ? "working" : ""
              }`}
              key={agent.id}
            >
              <div className="agent-number">
                {isCompleted ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  index + 1
                )}
              </div>

              <div className="generation-agent-icon">
                <i className={`fa-solid ${agent.icon}`}></i>
              </div>

              <div className="generation-agent-info">
                <h3>{agent.name}</h3>

                <p>{agent.description}</p>
              </div>

              <div className="generation-agent-status">
                {isCompleted
                  ? "Completed"
                  : isWorking
                    ? "Working..."
                    : "Waiting"}
              </div>
            </div>
          );
        })}
      </div>

      {/* PROGRESS */}

      <div className="generation-progress">
        <div className="progress-text">
          <span>Production Progress</span>

          <strong>{progress}%</strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Agentspage;
