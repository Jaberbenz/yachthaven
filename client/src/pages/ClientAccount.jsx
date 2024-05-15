import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ClientAccountNav from "../ClientAccountNav";
import { UserContext } from "../UserContext";
import ReservationsPage from "./ReservationsPage";

export default function ClientAccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  useEffect(() => {
    // Get user data from localStorage if it's not already in state
    if (!user || !user.email) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email) {
        setUser(storedUser);
      }
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/client/${user.email}`);
          setUser(response.data); // Update user context with fetched data
          // Also store user data in localStorage
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      };

      fetchData();
    }
  }, [user, setUser]);

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
        <div className="max-w-xs mx-auto text-xl text-center">
          <div>Logged in as {user.nom}</div>
          <div>Email: {user.email}</div>
          <div>First Name: {user.prenom}</div>
          <div>Phone Number: {user.numeroTel} </div>
          <div>Role: {user.role}</div>
          <Link to={`/account-client/update/${user._id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
            </svg>
          </Link>
          <button onClick={logout} className="max-w-sm mt-2 font-bold primary">
            Logout
          </button>
        </div>
      )}
      {subpage === "services" && <ReservationsPage />}
    </div>
  );
}
