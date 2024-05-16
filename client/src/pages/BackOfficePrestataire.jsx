import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function BackOfficePrestataire() {
  const [prestations, setPrestations] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`/upcoming-bookings/${user._id}`)
        .then((response) => {
          console.log(response.data);
          setPrestations(response.data);
        })
        .catch((error) => {
          console.error("Error fetching upcoming bookings:", error);
        });
    }
  }, [user]);

  if (!user) {
    return null; // Ne rien faire si l'utilisateur n'est pas défini
  }

  return (
    <div>
      <h1>Voici vos prochaines prestations</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 mb-10 md:grid-cols-2 lg:grid-cols-3">
        {prestations?.length > 0 ? (
          prestations.map((prestation) => (
            <div
              key={prestation._id}
              className="w-11/12 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <Link
                to={
                  prestation.prestation
                    ? `/account-prestataire/prestations/${prestation.prestation._id}`
                    : "#"
                }
                className="relative block h-40 overflow-hidden bg-center bg-cover rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${
                    prestation.prestation &&
                    prestation.prestation.photos.length > 0
                      ? prestation.prestation.photos[0]
                      : "default_image.jpg"
                  })`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-end px-2 py-3 bg-black bg-opacity-40">
                  <h2 className="text-xl font-semibold text-white">
                    {prestation.prestation
                      ? prestation.prestation.titre
                      : "Titre non disponible"}
                  </h2>
                </div>
              </Link>
              <p className="p-2 text-gray-500">
                {new Date(prestation.date).toLocaleDateString()} de{" "}
                {prestation.startTime} à {prestation.endTime}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Aucune prestation à venir trouvée.
          </p>
        )}
      </div>
    </div>
  );
}
