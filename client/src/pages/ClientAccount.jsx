import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate, useParams } from "react-router-dom";
import ClientAccountNav from "../ClientAccountNav";
import { UserContext } from "../UserContext";
import ReservationsPage from "./ReservationsPage";

export default function ClientAccountPage() {
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
      <ClientAccountNav />
      {subpage === "profile" && (
        <div className="w-full max-w-sm p-6 mt-8 bg-white shadow-xl rounded-2xl h-4/5">
          <div className="flex flex-col items-center justify-between h-full">
            <div>
              <img
                src={user.photo ? `/${user.photo}` : "/default_avatar.png"}
                alt="User avatar"
                className="w-32 h-32 mb-4 rounded-full"
              />
              <h1 className="text-2xl font-bold text-gray-900">{user.nom}</h1>
              <p className="text-blue-600">{user.role}</p>
            </div>
            <ul className="my-4 space-y-2">
              <li>
                <strong>Email:</strong> {user.email}
              </li>
              <li>
                <strong>First Name:</strong> {user.prenom}
              </li>
              <li>
                <strong>Phone:</strong> {user.numeroTel}
              </li>
            </ul>
            <div className="flex justify-between w-full">
              <Link
                to={`/account-client/update/${user._id}`}
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 114.95 0 2.5 2.5 0 010 4.95L12 21H3v-9l12.232-12.232z"
                  />
                </svg>
                Edit
              </Link>
              <button
                onClick={() => logout()}
                className="flex items-center text-red-600 hover:text-red-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {subpage === "services" && <ReservationsPage />}
    </div>
  );
}
