import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      setUser(data);
      alert("Login réussi");

      if (data.role === "client") {
        setRedirect("/");
      } else if (data.role === "prestataire") {
        setRedirect("/backoffice-prestataire");
      }
    } catch (e) {
      alert("Login échoué");
    }
  }

  // Utilisez redirectUrl pour la redirection
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <div className="p-5 grow">
        <Link to={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className="w-8 h-8"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </Link>

        <div className="mt-4">
          <h1 className="mb-12 font-sans text-3xl font-bold text-center">
            Connectez-vous sur YachtHaven
          </h1>
          <form className="max-w-xs mx-auto" onSubmit={handleLoginSubmit}>
            <label>Email *</label>
            <input
              className="mb-14"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />

            <label>Mot de passe *</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />

            <div className="mb-10 font-sans font-bold underline">
              <Link to={"/forgotpwd"}> Mot de passe oublié ?</Link>
            </div>
            <button className="font-sans font-bold primary">
              Se connecter
            </button>
          </form>
          <div className="flex items-center justify-center my-14">
            <div className="bg-black h-0.5 w-20"></div>
            <div className="mx-2 text-xs">OU</div>
            <div className="bg-black h-0.5 w-20"></div>
          </div>
          <div className="max-w-xs mx-auto text-center">
            <h2 className="mb-6 text-xl font-bold">Nouveau sur YachtHaven ?</h2>
            <button className="font-sans font-bold secondary">
              {" "}
              <Link to={"/register"}>S inscrire</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
