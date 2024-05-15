import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ReservationPage() {
  const { id } = useParams(); // ID de la réservation récupéré depuis l'URL
  const [prestation, setPrestation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    // Fonction pour récupérer les détails de la prestation
    const fetchPrestationDetails = async () => {
      try {
        const response = await axios.get(`/booking/${id}`);
        setPrestation(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPrestationDetails();
  }, [id]); // Exécutez l'effet lorsque l'ID change

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full min-h-screen bg-white">
        <div className="grid gap-4 p-8">
          <div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed flex px-2 py-2 text-white bg-gray-500 shadow ap-1 rounded-2xl shadow-black"
            >
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
              Fermer
            </button>
          </div>
          {prestation?.photos?.length > 0 &&
            prestation.photos.map((photo) => (
              <div key={prestation._id}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  console.log(prestation);

  return (
    <div className="p-5 mx-4 mt-4 bg-gray-200 rounded-2xl">
      <h1 className="text-2xl font-semibold text-center">{prestation.titre}</h1>
      <a
        className="flex gap-1 my-4 font-semibold text-center underline"
        target="_blank"
        href={"https://maps.google.com/?q=" + prestation.adresse}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>

        {prestation.adresse}
      </a>

      <div className="relative">
        <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
          <div>
            {prestation.photos?.[0] && (
              <div>
                <img
                  className="object-cover aspect-square"
                  src={"http://localhost:4000/uploads/" + prestation.photos[0]}
                />
              </div>
            )}
          </div>

          <div className="grid ">
            {prestation.photos?.[1] && (
              <img
                className="object-cover aspect-square"
                src={"http://localhost:4000/uploads/" + prestation.photos[1]}
              />
            )}
            <div className="overflow-hidden">
              {prestation.photos?.[2] && (
                <img
                  className="relative object-cover aspect-square top-2"
                  src={"http://localhost:4000/uploads/" + prestation.photos[2]}
                />
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute flex px-3 py-1 bg-white shadow shadow-md bottom-1 right-2 rounded-2xl shadow-gray-500"
        >
          Voir photos
        </button>
      </div>
      <div className="my-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        {prestation.description}
      </div>
    </div>
  );
}
