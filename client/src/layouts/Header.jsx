import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(UserContext);

  let toPath;
  let linkPath;
  if (user && user.role === "client") {
    toPath = `/account-client/${user._id}`;
    linkPath = "/";
  } else if (user && user.role === "prestataire") {
    toPath = `/account-prestataire/${user._id}`;
    linkPath = "/backoffice-prestataire";
  } else {
    toPath = "/login";
    linkPath = "/"; // ou une autre page par défaut
  }

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-primary text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-10 h-10"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <path
          fillRule="evenodd"
          d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
          clipRule="evenodd"
        />
      </svg>
      <SideBar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <Link to={linkPath}>
        <svg width="60" height="60">
          <image href="/LOGO-white.svg" width="60" height="60" />
        </svg>
      </Link>

      <Link to={toPath}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
            clipRule="evenodd"
          />
        </svg>
      </Link>
    </header>
  );
}
