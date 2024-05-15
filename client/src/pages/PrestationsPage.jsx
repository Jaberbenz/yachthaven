import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrestataireAccountNav from "../PrestataireAccountNav";

export default function PrestationsPage() {
  const [prestations, setPrestations] = useState([]);
  const [showFullDescriptions, setShowFullDescriptions] = useState({});

  useEffect(() => {
    axios.get("/prestations").then(({ data }) => {
      setPrestations(data);
    });
  }, []);

  const toggleDescription = (id) => {
    setShowFullDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <PrestataireAccountNav />
      <div className="p-4 text-center">
        <Link
          className="inline-flex items-center gap-1 px-4 py-2 text-white rounded-full bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          to={"/account-prestataire/services/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Ajouter Prestation
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-4 mb-10 md:grid-cols-2 lg:grid-cols-3">
        {prestations.length > 0 ? (
          prestations.map((prestation) => (
            <div
              key={prestation._id}
              className="w-11/12 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <Link
                to={`/account-prestataire/services/${prestation._id}`}
                className="relative block h-40 overflow-hidden bg-center bg-cover rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${
                    prestation.photos[0] || "default_image.jpg"
                  })`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-end px-2 py-3 bg-black bg-opacity-40">
                  <h2 className="text-xl font-semibold text-white">
                    {prestation.titre}
                  </h2>
                </div>
              </Link>
              <div className="gap-0">
                <p
                  className={`${
                    showFullDescriptions[prestation._id] ? "" : "truncate"
                  } text-gray-500 pt-2 px-2`}
                >
                  {prestation.description}
                </p>
                <button
                  onClick={() => toggleDescription(prestation._id)}
                  className="right-0 px-2 pt-0 text-gray-500 underline"
                >
                  {showFullDescriptions[prestation._id]
                    ? "Afficher moins"
                    : "Afficher plus"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="w-full text-center text-gray-500 ">
            Aucune prestation trouvée.
          </p>
        )}
      </div>
    </div>
  );
}
