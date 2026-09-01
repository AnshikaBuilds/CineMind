import { useState, useEffect } from "react";
import "./ProductionDashboard.css";

const activityLog = [
  {
    time: "2m ago",
    text: "Storyboard Agent rendered scene 14 — Europa surface",
    icon: "fa-image",
  },
  {
    time: "12m ago",
    text: "Character Agent finalized Kael's backstory",
    icon: "fa-user-astronaut",
  },
  {
    time: "28m ago",
    text: "Screenwriter Agent completed Act II",
    icon: "fa-feather-pointed",
  },
  {
    time: "1h ago",
    text: "Director Agent approved visual tone",
    icon: "fa-clapperboard",
  },
];

/* ---------- Circular ring for overall progress ---------- */
const CircularProgress = ({ value, size = 132, stroke = 10 }) => {
  const [animated, setAnimated] = useState(0);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(value), 150);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <div className="ring-wrap">
      <svg width={size} height={size} className="circular-progress">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>
        <circle
          className="ring-bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          className="ring-fg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          stroke="url(#ringGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="ring-center">
        <span className="ring-value">{value}%</span>
        <span className="ring-label">Overall</span>
      </div>
    </div>
  );
};

/* ---------- Linear progress bar (animates on mount) ---------- */
const ProgressBar = ({ value }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(value), 150);
    return () => clearTimeout(t);
  }, [value]);
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${width}%` }} />
    </div>
  );
};

const StatusDot = ({ status = "idle" }) => (
  <span className={`status-dot ${status}`} />
);

const AgentPill = ({ label, state }) => (
  <div className={`agent-pill ${state}`}>
    <StatusDot status={state} />
    <span>{label}</span>
  </div>
);

/* ---------- Reusable card for Script / Characters / Storyboard / Production ---------- */
const StatCard = ({ icon, title, accent, metrics, progress, footer }) => (
  <div className={`stat-card accent-${accent}`}>
    <div className="stat-card-header">
      <div className="stat-icon">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h3>{title}</h3>
    </div>

    <div className="stat-metrics">
      {metrics.map((m) => (
        <div className="stat-metric" key={m.label}>
          <span className="metric-value">{m.value}</span>
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </div>

    <ProgressBar value={progress} />

    <div className="stat-footer">
      <span>{footer}</span>
      <span className="stat-percent">{progress}%</span>
    </div>
  </div>
);

/* ---------- Reusable card for Marketing / Music / Export ---------- */
const MiniCard = ({ icon, title, accent, rows }) => (
  <div className={`mini-card accent-${accent}`}>
    <div className="mini-card-header">
      <div className="stat-icon small">
        <i className={`fa-solid ${icon}`} />
      </div>
      <h4>{title}</h4>
    </div>
    <div className="mini-rows">
      {rows.map((r) => (
        <div className="mini-row" key={r.label}>
          <span className="mini-row-label">{r.label}</span>
          <span className="mini-row-value">
            <StatusDot status={r.state} />
            {r.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function ProductionDashboard() {
  return (
    <section className="dashboard-section">
      <div className="dashboard-grid">
        {/* ============ 1. MAIN OVERVIEW CARD ============ */}
        <div className="overview-card glow-border">
          <div className="overview-top">
            <div>
              <span className="eyebrow">Now producing</span>
              <h2 className="overview-title">Echoes of Europa</h2>
              <div className="overview-tags">
                <span className="tag">Sci-Fi / Thriller</span>
                <span className="tag">2h 18m</span>
                <span className="tag status-tag">
                  <StatusDot status="working" /> In Production
                </span>
              </div>
            </div>
            <CircularProgress value={68} />
          </div>

          <div className="overview-body">
            <div className="agents-row">
              <div className="agents-group">
                <span className="group-label">Completed</span>
                <div className="agent-pills">
                  <AgentPill label="Director Agent" state="done" />
                  <AgentPill label="Screenwriter Agent" state="done" />
                  <AgentPill label="Character Agent" state="done" />
                </div>
              </div>

              <div className="agents-group">
                <span className="group-label">Working now</span>
                <div className="agent-pills">
                  <AgentPill label="Storyboard Agent" state="working" />
                  <AgentPill label="Producer Agent" state="working" />
                </div>
              </div>

              <div className="agents-group eta-group">
                <span className="group-label">Estimated completion</span>
                <div className="eta-value">
                  <i className="fa-regular fa-clock" />
                  <span>1h 42m remaining</span>
                </div>
              </div>
            </div>

            <div className="timeline">
              <span className="group-label">Live activity</span>
              <ul>
                {activityLog.map((item) => (
                  <li key={item.text}>
                    <div className="timeline-icon">
                      <i className={`fa-solid ${item.icon}`} />
                    </div>
                    <div className="timeline-text">
                      <p>{item.text}</p>
                      <span>{item.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ============ 2. FOUR STAT CARDS ============ */}
        <div className="stat-cards-grid">
          <StatCard
            icon="fa-feather-pointed"
            title="Script Progress"
            accent="purple"
            progress={82}
            footer="Story completeness: Strong"
            metrics={[
              { value: "94", label: "Pages generated" },
              { value: "32", label: "Scenes" },
              { value: "A+", label: "Coherence" },
            ]}
          />
          <StatCard
            icon="fa-user-astronaut"
            title="Characters"
            accent="blue"
            progress={90}
            footer="Personalities generated"
            metrics={[
              { value: "12", label: "Total characters" },
              { value: "3", label: "Main characters" },
              { value: "12", label: "AI personalities" },
            ]}
          />
          <StatCard
            icon="fa-clapperboard"
            title="Storyboard"
            accent="purple"
            progress={57}
            footer="Visual frames rendering"
            metrics={[
              { value: "32", label: "Total scenes" },
              { value: "146", label: "Camera shots" },
              { value: "88", label: "Visual frames" },
            ]}
          />
          <StatCard
            icon="fa-calendar-days"
            title="Production Plan"
            accent="blue"
            progress={41}
            footer="Iceland + Deep Sea Set"
            metrics={[
              { value: "$120–150M", label: "Budget est." },
              { value: "2", label: "Locations" },
              { value: "82d", label: "Shooting days" },
            ]}
          />
        </div>

        {/* ============ 3. SECOND ROW MINI CARDS ============ */}
        <div className="mini-cards-grid">
          <MiniCard
            icon="fa-bullhorn"
            title="Marketing"
            accent="purple"
            rows={[
              { label: "Poster", value: "Ready", state: "done" },
              { label: "Trailer", value: "Rendering", state: "working" },
              { label: "Social campaign", value: "Drafting", state: "working" },
            ]}
          />
          <MiniCard
            icon="fa-music"
            title="Music & Sound"
            accent="blue"
            rows={[
              {
                label: "Background score",
                value: "Composing",
                state: "working",
              },
              { label: "Theme music", value: "Ready", state: "done" },
              { label: "Sound effects", value: "Queued", state: "idle" },
            ]}
          />
          <MiniCard
            icon="fa-file-arrow-up"
            title="Export Center"
            accent="purple"
            rows={[
              { label: "Script PDF", value: "Ready", state: "done" },
              { label: "Storyboard PDF", value: "Ready", state: "done" },
              { label: "Pitch deck", value: "Generating", state: "working" },
              { label: "Movie package", value: "Locked", state: "idle" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
