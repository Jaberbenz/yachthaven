import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPagePrestataire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numeroTel, setNumeroTel] = useState("");
  const [numeroSiret, setNumeroSiret] = useState("");
  const [adresse, setAdresse] = useState("");

  async function registerPrestataire(ev) {
    ev.preventDefault();

    try {
      await axios.post("/registerPrestataire", {
        nom,
        prenom,
        email,
        password,
        numeroTel,
        numeroSiret,
        adresse,
        role: "prestataire",
      });
      alert("Inscription reussie");
    } catch (e) {
      alert("Inscription echouee");
    }
  }

  return (
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
        <h1 className="mb-12 font-sans text-2xl font-bold text-center">
          Formulaire d inscription <br /> Prestataire
        </h1>
        <form className="max-w-xs mx-auto" onSubmit={registerPrestataire}>
          <label>Email*</label>
          <input
            className="mb-14"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />

          <label>Mot de passe*</label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />

          <label>Numéro de téléphone*</label>
          <input
            className="mb-14"
            type="number"
            placeholder="+33"
            value={numeroTel}
            onChange={(ev) => setNumeroTel(ev.target.value)}
          />

          <label>Adresse*</label>
          <input
            className="mb-14"
            type="text"
            placeholder="john"
            value={adresse}
            onChange={(ev) => setAdresse(ev.target.value)}
          />

          <label>Prénom*</label>
          <input
            className="mb-14"
            type="text"
            placeholder="john"
            value={prenom}
            onChange={(ev) => setPrenom(ev.target.value)}
          />

          <label>Nom*</label>
          <input
            className="mb-14"
            type="text"
            placeholder="john"
            value={nom}
            onChange={(ev) => setNom(ev.target.value)}
          />

          <label>Numéro de siret*</label>
          <input
            className="mb-14"
            type="number"
            placeholder="+33"
            value={numeroSiret}
            onChange={(ev) => setNumeroSiret(ev.target.value)}
          />

          <button className="mt-5 font-sans font-bold primary">
            S inscrire
          </button>
        </form>
        <div className="flex items-center justify-center my-14">
          <div className="bg-black h-0.5 w-20"></div>
          <div className="mx-2 text-xs">OU</div>
          <div className="bg-black h-0.5 w-20"></div>
        </div>
        <div className="max-w-xs mx-auto mb-20 text-center">
          <button className="font-sans font-bold secondary">
            {" "}
            <Link to={"/login"}>Se connecter</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
