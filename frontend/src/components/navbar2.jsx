import { Link } from "react-router-dom";
import { UserButton, Show, SignInButton, useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";

function Navbar2() {
  const { user } = useUser();
  const [showProjectModal, setShowProjectModal] = useState(false);

  return (
    <>
      <div className="sidenav">
        {/* ================================
          NAVIGATION
      ================================= */}

        <div className="sideItem" onClick={() => setShowProjectModal(true)}>
          <i className="fa-solid fa-plus"></i>
          <p>New Project</p>
        </div>

        <Link to="/dashboard" className="sideItem">
          <i className="fa-solid fa-home"></i>
          <p>Dashboard</p>
        </Link>

        {/* ================================
          PROFILE
      ================================= */}

        <div className="sidebar-profile">
          {/* SIGNED IN */}
          <Show when="signed-in">
            <div className="profile-content">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "profile-avatar",
                  },
                }}
              />

              <div className="profile-info">
                <p className="profile-name">
                  {user?.firstName || user?.username || "CineMind User"}
                </p>

                <span className="profile-email">
                  {user?.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </Show>

          {/* SIGNED OUT */}
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="sidebar-signin">
                <div className="signin-icon">
                  <i className="fa-solid fa-user"></i>
                </div>

                <div className="signin-info">
                  <p>Sign In</p>
                  <span>Access CineMind</span>
                </div>
              </button>
            </SignInButton>
          </Show>
        </div>
      </div>
      <CreateProjectModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
      />
    </>
  );
}

export default Navbar2;
