import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function SideBar({ isOpen, onClose }) {
  const { user } = useContext(UserContext);
  const [openCategory, setOpenCategory] = useState(null);

  const categories = {
    Destinations: ["Antibes", "Monaco", "Cannes", "Saint Tropez"],
    Parcourir: [
      "Restauration",
      "Bien Être",
      "Loisirs",
      "Hôtellerie",
      "Transport",
    ],
    "About us": ["Qui sommes-nous?", "Nos missions", "Nos engagements"],
    Contact: ["saw@archtravels.com", "yachtavenue", "06.xxxxx"],
  };

  const toggleCategory = (category) => {
    if (openCategory === category) {
      setOpenCategory(null);
    } else {
      setOpenCategory(category);
    }
  };
  console.log(user);

  const getContent = () => {
    if (user) {
      console.log(user._id);
      if (user.role === "client") {
        return (
          <div className="flex flex-col py-2 mx-2 my-4 space-y-2">
            <Link to={`/account-client/${user._id}`}>
              <button
                className="my-2 font-sans font-bold primary"
                onClick={onClose}
              >
                Mon Compte
              </button>
            </Link>
            <button
              className="my-2 font-sans font-bold secondary"
              onClick={onClose}
            >
              Réserver un service
            </button>
          </div>
        );
      } else if (user.role === "prestataire") {
        return (
          <div className="flex flex-col py-2 mx-2 my-4 space-y-2">
            <Link to={`/account-prestataire/${user._id}`}>
              <button
                className="my-2 font-sans font-bold primary"
                onClick={onClose}
              >
                Mon Compte
              </button>
            </Link>
            <Link to={"/account-prestataire/services/new"}>
              <button
                className="my-2 font-sans font-bold secondary"
                onClick={onClose}
              >
                Ajouter vos prestations
              </button>
            </Link>
          </div>
        );
      }
    }

    // Pour les utilisateurs non connectés
    return (
      <div className="flex flex-col py-2 mx-2 my-4 space-y-2">
        <Link to="/register">
          <button
            className="my-2 font-sans font-bold primary"
            onClick={onClose}
          >
            S&apos;inscrire
          </button>
        </Link>
        <Link to="/login">
          <button
            className="my-2 font-sans font-bold secondary"
            onClick={onClose}
          >
            Se connecter
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`${isOpen ? "translate-x-0" : "-translate-x-full"} 
                  fixed left-0 top-0 w-64 h-full 
                  bg-white shadow-md transition-transform z-50`}
    >
      <button className="p-2 text-black" onClick={onClose}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {getContent()}
      {Object.keys(categories).map((category, index) => (
        <div key={index}>
          <button
            className="flex items-center justify-between w-full py-6 text-left text-gray-700 hover:bg-gray-100 focus:outline-none"
            onClick={() => toggleCategory(category)}
          >
            <span>{openCategory === category ? "+" : "-"}</span>
            <span>{category}</span>
          </button>
          <div
            className={`pl-4 transition-all ease-in-out ${
              openCategory === category
                ? "duration-200 block"
                : "duration-200 hidden"
            }`}
          >
            {categories[category].map((item, idx) => (
              <div key={idx} className="py-3 text-gray-600">
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

SideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

// {!!user && user.role === "client" && <h2>SideBar client</h2>}

// {!!user && user.role === "prestataire" && <h2>SideBar prestataire</h2>}
