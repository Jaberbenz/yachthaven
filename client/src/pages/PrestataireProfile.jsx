import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import PrestataireAccountNav from "../PrestataireAccountNav";
import { UserContext } from "../UserContext";
import PrestationsPage from "./PrestationsPage";

export default function PrestataireProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  console.log(subpage);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <PrestataireAccountNav />
      {subpage === "profile" && (
        <div>
          <div className="max-w-xs mx-auto text-xl text-center">
            Logged in as {user.nom} ({user.email}) <br />
            <button
              onClick={logout}
              className="max-w-sm mt-2 font-bold primary"
            >
              logout
            </button>
          </div>
        </div>
      )}
      {subpage === "services" && <PrestationsPage />}
    </div>
  );
}
