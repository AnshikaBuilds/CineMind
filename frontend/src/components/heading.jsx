import { useEffect, useState } from "react";
import leftLaurel from "../assets/leftLaurel.png";
import rightLaurel from "../assets/rightLaurel.png";
import cinemind from "../assets/cinemind.png";
import scene from "../assets/scene.png";
import logo from "../assets/logo.png";

{
  /*import Dashboard from "./Dashboard";*/
}
import { Link } from "react-router-dom";
{
  /*import MovieGeneratorModal from "./MovieGeneratorModal";*/
}
import CreateProjectModal from "./CreateProjectModal";

function Heading() {
  const placeholders = [
    "Create a sci-fi thriller on Europa...",
    "A Marvel-style superhero origin story...",
    "A horror movie inside an abandoned hospital...",
    "An emotional romance in Paris...",
    "A Netflix crime series set in Mumbai...",
    "A cinematic documentary about space exploration...",
  ];

  const [placeholder, setPlaceholder] = useState("");

  const [showProjectModal, setShowProjectModal] = useState(false);

  useEffect(() => {
    let index = 0;
    let char = 0;

    const type = () => {
      if (char <= placeholders[index].length) {
        setPlaceholder(placeholders[index].slice(0, char));
        char++;
        setTimeout(type, 45);
      } else {
        setTimeout(() => {
          char = 0;
          index = (index + 1) % placeholders.length;
          type();
        }, 1800);
      }
    };

    type();
  }, []);

  return (
    <>
      <section id="home">
        <div className="main">
          <div className="hero">
            <div className="heroTagline">
              <img src={leftLaurel} className="laurel" />
              <p className="tagline">
                One Prompt. An Entire Movie Production Team.
              </p>
              <img src={rightLaurel} className="laurel" />
            </div>

            <div className="cinehead">
              <h1>Dream It.</h1>
              <img src={cinemind} className="cinemind" />
              <h1>Creates It.</h1>
            </div>

            <p className="subtitle">
              Your AI-powered movie studio with intelligent agents that think,
              plan and create — from story to screen, in minutes.
            </p>

            {/*<div className="btn">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          <input placeholder={placeholder} />
          <i className="fa-solid fa-bars"></i>
        </div>*/}

            <div className="btn" onClick={() => setShowProjectModal(true)}>
              <i className="fa-solid fa-wand-magic-sparkles"></i>

              <input type="text" placeholder={placeholder} readOnly />

              <i className="fa-solid fa-bars"></i>
            </div>

            <div className="minibtns">
              <button>
                <i className="fa-solid fa-film"></i>
                Feature Film
              </button>

              <button>
                <i className="fa-solid fa-tv"></i>
                Web Series
              </button>

              <button>
                <i className="fa-solid fa-clapperboard"></i>
                Short Film
              </button>

              <button>
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Animation
              </button>

              <button>
                <i className="fa-regular fa-file-lines"></i>
                Docu-Style
              </button>
            </div>

            <div onClick={() => setShowProjectModal(true)}>
              <button className="generateBtn">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
                Generate My Movie
                <i className="fa-solid fa-arrow-right-long"></i>
              </button>
            </div>

            <section id="features">
              <div className="features-btn">Features</div>

              <h2 className="fea-head">
                Features That Bridge Ideas and Filmmaking
              </h2>

              <div className="blocks-container">
                <div className="block1">
                  <div className="text">
                    <div className="iconbox">
                      <i class="fa-solid fa-robot"></i>
                    </div>

                    <h2>Multi-Agent Production Architecture</h2>
                    <p>
                      CineMind uses a 8-Agent Architecture where one Master
                      Agent coordinates the workflow and 7 specialized
                      sub-agents handle different filmmaking tasks. This creates
                      a structured and collaborative AI-powered production
                      pipeline.
                    </p>
                    <ul>
                      <li className="liitem">
                        <i className="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Centralized Direction</strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i className="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Specialized Creative Intelligence</strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i className="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Connected Creative Pipeline</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="card">
                    <div className="eyebrow">CineMind architecture</div>

                    <h1>Multi-agent production architecture</h1>

                    <div className="subtitle">
                      8 Intelligent Agents. One coordinated cinematic workflow.
                    </div>

                    <div className="arch">
                      {/* Master Director */}
                      <div className="master">
                        <div className="icon-wrap">
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
                          <div className="title">Master Director</div>
                          <div className="desc">Central orchestrator</div>
                        </div>
                      </div>

                      <div className="orchestrator-tag">orchestrator</div>

                      <div
                        className="connector"
                        data-label="coordinates"
                        style={{ marginTop: "22px" }}
                      />

                      {/* Research Agent */}
                      <div className="node stage">
                        <svg
                          className="icon"
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

                        <div className="label">Research Agent</div>
                      </div>

                      <div className="connector" />

                      {/* Story Agent */}
                      <div className="node stage">
                        <svg
                          className="icon"
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

                        <div className="label">Story Agent</div>
                      </div>

                      <div className="connector" />

                      {/* Specialized Agents */}
                      <div className="branch-wrap">
                        <div className="tier-label">
                          specialized intelligence
                        </div>

                        <div className="branch-row">
                          {/* Character */}
                          <div className="branch-item">
                            <div className="node">
                              <svg
                                className="icon"
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

                              <div className="label">Character</div>
                              <div className="tag">Cast intelligence</div>
                            </div>
                          </div>

                          {/* Marketing */}
                          <div className="branch-item">
                            <div className="node">
                              <svg
                                className="icon"
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

                              <div className="label">Marketing</div>
                              <div className="tag">Audience strategy</div>
                            </div>
                          </div>

                          {/* Music */}
                          <div className="branch-item">
                            <div className="node">
                              <svg
                                className="icon"
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

                              <div className="label">Music</div>
                              <div className="tag">Score and sound</div>
                            </div>
                          </div>
                        </div>

                        <div className="branch-converge">
                          <div className="stub" />
                          <div className="stub" />
                          <div className="stub" />
                        </div>

                        <div className="branch-merge-line" />
                      </div>

                      <div className="connector" />

                      {/* Storyboard */}
                      <div className="node stage">
                        <svg
                          className="icon"
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

                        <div className="label">Storyboard Agent</div>
                      </div>

                      <div className="connector" />

                      {/* Production */}
                      <div className="node stage">
                        <svg
                          className="icon"
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

                        <div className="label">Production Agent</div>
                      </div>

                      <div className="connector" />

                      {/* Final Production */}
                      <div className="final">
                        <div className="icon-wrap">
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
                          <div className="title">Final Production</div>
                          <div className="desc">Coordinated output</div>
                        </div>
                      </div>
                    </div>

                    <div className="footer-tag">
                      <span>1</span> master director &nbsp;+&nbsp;
                      <span>7</span> specialized agents
                    </div>
                  </div>
                </div>

                {/*--------------------------------card 2------------------------------------------------------- */}

                <div className="block2">
                  <div className="cm-dual-engine">
                    <div
                      className="cm-dual-engine__glow"
                      aria-hidden="true"
                    ></div>

                    <div className="cm-dual-engine__header">
                      <span className="cm-eyebrow">CINEMIND AI CORE</span>
                      <h2 className="cm-heading">
                        Dual-Engine AI Intelligence
                      </h2>
                      <p className="cm-subtitle">
                        Two AI engines. One intelligent filmmaking ecosystem.
                      </p>
                    </div>

                    <div className="cm-visual">
                      <svg
                        className="cm-visual__lines"
                        viewBox="0 0 100 62"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="cmLineLeft"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#B79CFF" />
                            <stop offset="100%" stopColor="#3B82F6" />
                          </linearGradient>
                          <linearGradient
                            id="cmLineRight"
                            x1="100%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#B79CFF" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 22 20 C 30 34, 38 38, 50 44"
                          stroke="url(#cmLineLeft)"
                          strokeWidth="0.6"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 78 20 C 70 34, 62 38, 50 44"
                          stroke="url(#cmLineRight)"
                          strokeWidth="0.6"
                          fill="none"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="44" r="1.4" fill="#B79CFF" />
                      </svg>

                      <div className="cm-engine cm-engine--gemini">
                        <div className="cm-engine__icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2 L14.2 9.4 L21.6 12 L14.2 14.6 L12 22 L9.8 14.6 L2.4 12 L9.8 9.4 Z"
                              fill="#B79CFF"
                            />
                          </svg>
                        </div>
                        <h3 className="cm-engine__title">Google Gemini</h3>
                        <span className="cm-engine__label">
                          Creative Intelligence
                        </span>
                        <p className="cm-engine__micro">
                          Generation • Reasoning • Cinematic Content
                        </p>
                      </div>

                      <div className="cm-core">
                        <div className="cm-core__ring" aria-hidden="true"></div>
                        <span className="cm-core__title">CineMind</span>
                        <span className="cm-core__subtitle">AI CORE</span>
                      </div>

                      <div className="cm-engine cm-engine--parallel">
                        <div className="cm-engine__icon">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="12" cy="5" r="2.2" fill="#7FB0FF" />
                            <circle cx="5" cy="17" r="2.2" fill="#7FB0FF" />
                            <circle cx="19" cy="17" r="2.2" fill="#7FB0FF" />
                            <path
                              d="M12 7.2 L6.3 15.3 M12 7.2 L17.7 15.3 M7 17 H17"
                              stroke="#7FB0FF"
                              strokeWidth="1.1"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        <h3 className="cm-engine__title">Parallel AI</h3>
                        <span className="cm-engine__label">
                          Research Intelligence
                        </span>
                        <p className="cm-engine__micro">
                          Research • Retrieval • Context
                        </p>
                      </div>
                    </div>

                    <div className="cm-bottom">
                      <p className="cm-bottom__statement">
                        Creative reasoning + contextual intelligence
                      </p>
                      <div className="cm-bottom__caps">
                        <span>✦ Generate</span>
                        <span>✦ Research</span>
                        <span>✦ Enrich</span>
                      </div>
                    </div>
                  </div>

                  <div className="text">
                    <div className="iconbox">
                      <i className="fa-solid fa-microchip"></i>
                    </div>

                    <h2>Dual-Engine AI Intelligence</h2>
                    <p>
                      CineMind combines Google Gemini and Parallel AI to power
                      its intelligent filmmaking workflow—pairing advanced
                      generative reasoning with real-time research and
                      information retrieval.
                    </p>
                    <ul>
                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>
                            Gemini Creative generation, reasoning & cinematic
                            content
                          </strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>
                            Parallel AI is Real-time research & contextual
                            intelligence
                          </strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>
                            Dual-AI Synergy make Cinemind Stronger, helps to
                            create more informed production outputs
                          </strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/*-----------------------card 3---------------------------------------------------------------- */}

                <div className="block4">
                  <div className="text">
                    <div className="iconbox">
                      <i className="fa-solid fa-chart-column"></i>
                    </div>

                    <h2>Intelligent Production Insights</h2>
                    <p>
                      CineMind transforms complex movie-production data into a
                      clear, real-time project intelligence dashboard. It gives
                      filmmakers a complete overview of their project's
                      progress, resources, budget, and production requirements
                      in one place.
                    </p>
                    <ul>
                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Project Overview</strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Resource & Budget Intelligence</strong>
                        </span>
                      </li>

                      <li className="liitem">
                        <i class="fa-solid fa-circle-dot"></i>
                        <span className="litext">
                          <strong>Progress Analytics</strong>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="sa-card">
                    <div className="sa-grain" aria-hidden="true" />
                    <div className="sa-orb sa-orb--purple" aria-hidden="true" />
                    <div className="sa-orb sa-orb--blue" aria-hidden="true" />

                    {/* ---------- HEADER ---------- */}

                    <header className="sa-header">
                      <span className="sa-eyebrow">
                        <svg
                          viewBox="0 0 24 24"
                          className="sa-eyebrow-icon"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 19.5V5.5C4 4.4 4.9 3.5 6 3.5H16.5L20 7V19.5C20 20.6 19.1 21.5 18 21.5H6C4.9 21.5 4 20.6 4 19.5Z"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />

                          <path
                            d="M16.5 3.5V7H20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.3"
                          />

                          <path
                            d="M7.5 12H14.5M7.5 15H16.5M7.5 9H11"
                            stroke="currentColor"
                            strokeWidth="1.1"
                          />
                        </svg>
                      </span>

                      <span className="sa-status">
                        <span className="sa-status-dot" />
                        Ready
                      </span>
                    </header>

                    {/* ---------- VISUAL STAGE ---------- */}

                    <div className="sa-stage">
                      {/* Connecting energy lines */}

                      <svg
                        className="sa-lines"
                        viewBox="0 0 1000 650"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id="saLineGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#8B5CF6"
                              stopOpacity="0"
                            />

                            <stop
                              offset="55%"
                              stopColor="#8B5CF6"
                              stopOpacity="0.85"
                            />

                            <stop
                              offset="100%"
                              stopColor="#D9D2FF"
                              stopOpacity="0.95"
                            />
                          </linearGradient>
                        </defs>

                        <path
                          className="sa-line"
                          style={{ animationDelay: "0s" }}
                          d="M235,150 Q300,158 372,182"
                        />

                        <path
                          className="sa-line"
                          style={{ animationDelay: "0.5s" }}
                          d="M235,478 Q302,470 372,468"
                        />

                        <path
                          className="sa-line"
                          style={{ animationDelay: "1s" }}
                          d="M805,150 Q742,158 678,182"
                        />

                        <path
                          className="sa-line"
                          style={{ animationDelay: "1.5s" }}
                          d="M818,345 Q748,345 678,345"
                        />

                        <path
                          className="sa-line"
                          style={{ animationDelay: "2s" }}
                          d="M788,505 Q736,515 678,520"
                        />

                        <path
                          className="sa-line sa-line--rail"
                          style={{ animationDelay: "0.25s" }}
                          d="M100,590 Q230,602 372,560"
                        />
                      </svg>

                      {/* ---------- FLOW PIPELINE ---------- */}

                      <ul
                        className="sa-flow"
                        aria-label="Script generation pipeline"
                      >
                        {["Idea", "Story", "Scene", "Dialogue", "Script"].map(
                          (step, i) => (
                            <li
                              key={step}
                              className={`sa-flow-node${
                                i === 4 ? " sa-flow-node--final" : ""
                              }`}
                              style={{ "--i": i }}
                            >
                              <span className="sa-flow-dot" />

                              <span className="sa-flow-label">{step}</span>
                            </li>
                          ),
                        )}
                      </ul>

                      {/* ---------- SCREENPLAY CENTERPIECE ---------- */}

                      <div className="sa-page-zone">
                        <div className="sa-page">
                          <div className="sa-page-topline">FADE IN:</div>

                          <div className="sa-page-slug">
                            INT. ABANDONED HOSPITAL — NIGHT
                          </div>

                          <p className="sa-page-action">
                            A single flashlight beam cuts through the dark. MAYA
                            moves down the corridor, footsteps echoing off
                            peeling walls.
                          </p>

                          <div className="sa-page-character">MAYA</div>

                          <div className="sa-page-paren">(quietly)</div>

                          <p className="sa-page-dialogue">
                            Something&rsquo;s not right here.
                            <span className="sa-cursor" aria-hidden="true" />
                          </p>

                          <div className="sa-page-character">
                            DR. HALE (O.S.)
                          </div>

                          <p className="sa-page-dialogue sa-page-dialogue--muted">
                            Then don&rsquo;t stop walking.
                          </p>
                        </div>

                        {/* Scene blocks */}

                        <div className="sa-chip-stack" aria-hidden="true">
                          <div className="sa-scene-chip sa-scene-chip--1">
                            <span className="sa-scene-chip-tag">ACT I</span>

                            <span className="sa-scene-chip-num">SC. 01</span>
                          </div>

                          <div className="sa-scene-chip sa-scene-chip--2">
                            <span className="sa-scene-chip-num">SC. 02</span>
                          </div>

                          <div className="sa-scene-chip sa-scene-chip--3">
                            <span className="sa-scene-chip-num">SC. 03</span>
                          </div>
                        </div>

                        {/* Character indicators */}

                        <div className="sa-avatars" aria-hidden="true">
                          <span className="sa-avatar sa-avatar--a">M</span>

                          <span className="sa-avatar sa-avatar--b">H</span>
                        </div>
                      </div>

                      {/* ---------- FLOATING CAPABILITY WIDGETS ---------- */}

                      <div className="sa-widget sa-widget--scene">
                        <div className="sa-widget-glyph">
                          <span className="sa-scene-dot" />
                          <span className="sa-scene-dot" />
                          <span className="sa-scene-dot sa-scene-dot--on" />
                        </div>

                        <span className="sa-widget-label">Scene</span>
                      </div>

                      <div className="sa-widget sa-widget--dialogue">
                        <div className="sa-widget-glyph sa-widget-glyph--bubble">
                          <span className="sa-bubble-line sa-bubble-line--long" />
                          <span className="sa-bubble-line sa-bubble-line--short" />
                        </div>

                        <span className="sa-widget-label">Dialogue</span>
                      </div>

                      <div className="sa-widget sa-widget--character">
                        <div className="sa-widget-glyph sa-widget-glyph--avatars">
                          <span className="sa-mini-avatar">A</span>

                          <span className="sa-mini-avatar sa-mini-avatar--b">
                            B
                          </span>
                        </div>

                        <span className="sa-widget-label">Character</span>
                      </div>

                      <div className="sa-widget sa-widget--pacing">
                        <div className="sa-widget-glyph sa-widget-glyph--meter">
                          <span className="sa-meter-seg sa-meter-seg--full" />
                          <span className="sa-meter-seg sa-meter-seg--full" />
                          <span className="sa-meter-seg" />
                        </div>

                        <span className="sa-widget-label">Pacing</span>
                      </div>

                      <div className="sa-widget sa-widget--continuity">
                        <svg
                          viewBox="0 0 24 24"
                          className="sa-widget-glyph sa-widget-glyph--loop"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 12a8 8 0 0 1 13.6-5.7M20 12a8 8 0 0 1-13.6 5.7"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />

                          <path
                            d="M17.6 3.5V7h-3.5M6.4 20.5V17h3.5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>

                        <span className="sa-widget-label">Continuity</span>
                      </div>
                    </div>

                    {/* ---------- FOOTER ---------- */}

                    <footer className="sa-footer">
                      <p className="sa-tagline">
                        Transforms ideas into cinematic stories.
                      </p>

                      <div className="sa-engine">
                        <span className="sa-engine-label">
                          AI Script Engine
                        </span>

                        <span className="sa-engine-state">
                          <span className="sa-engine-dot" />
                          Ready
                        </span>
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </section>

            <section id="about">
              <div className="about-sec">
                <h1>Where Stories Begin</h1>
                <h1 className="color-sec">— And Films Come to Life</h1>
                <p>
                  Your first idea isn’t just a concept — it’s the beginning of a
                  cinematic journey. CineMind transforms a raw movie idea into a
                  structured production vision, bringing storytelling, character
                  development, visual planning, production strategy, and
                  creative intelligence together in one unified platform.
                </p>
                <p>
                  Built for creators who want to move from imagination to
                  execution with clarity, confidence, and creative control.
                </p>
                <h2 className="about-end">
                  Because every great film starts with an idea — the right tools
                  turn that idea into a story worth watching.
                </h2>
              </div>
            </section>

            <div className="glow-line"></div>

            <div className="footer">
              <div className="con-1">
                <div className="logoBox2">
                  <img src={logo} alt="CineMind Logo" className="logoo2" />
                </div>
                <p>
                  The AI-powered filmmaking platform that takes you from concept
                  to production. Transform your movie idea into a complete
                  cinematic blueprint with intelligent storytelling, character
                  development, visual planning, production insights, and
                  strategic creative intelligence — all in one place.
                </p>
                <h2>Ready to Bring Your Story to Life?</h2>

                <div onClick={() => setShowProjectModal(true)}>
                  <button className="start-btn">
                    Start Creating
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div className="con-2">
                <h2>Quick Links</h2>
                <a href="#home">Home</a>
                <a href="#features">Features</a>
                <Link to="/dashboard">My Projects</Link>
                <a href="#about">About</a>
              </div>
              <div className="con-3">
                <h2>Connect</h2>
                <div className="links">
                  <a
                    href="https://github.com/AnshikaBuilds"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-brands fa-github"></i>
                    GitHub
                  </a>
                </div>
                <div className="links">
                  <a
                    href="https://www.linkedin.com/in/anshika-yadav-80b16a404"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i class="fa-brands fa-linkedin"></i>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="end-line"></div>

            <div className="foot-end">
              <p>© 2026 CineMind. All rights reserved.</p>
              <div className="f1">
                <p>Terms of Service</p>
                <p>Privacy Policy</p>
                <p>Support</p>
              </div>
              <div className="f2">
                <p>Made with</p>
                <i class="fa-regular fa-heart"></i>
                <p>for storytellers.</p>
              </div>
            </div>
          </div>

          <div className="sceneContainer">
            <img src={scene} className="scene" />
          </div>
        </div>
      </section>

      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
    </>
  );
}

export default Heading;
