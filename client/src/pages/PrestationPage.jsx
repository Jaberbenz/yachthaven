import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import CalendarWithEvents from "../DisponibiliteCalendar";

export default function PrestationPage() {
  const { id } = useParams();
  const [prestation, setPrestation] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [reservations, setReservations] = useState([]); // State pour stocker les réservations
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (id) {
      axios.get(`/prestation/${id}`).then((response) => {
        if (response.data && response.data.disponibilities) {
          setPrestation(response.data);
        } else {
          console.error("Disponibilities are missing in the response");
        }
      });
    }
  }, [id]);

  const handleNewReservation = (reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  if (!prestation) return "";

  const handleClose = () => {
    setShowCalendar(false);
  };

  console.log(numberOfPeople);
  console.log(prestation.maxGuests);

  const handlePeopleChange = (event) => {
    let inputVal = parseInt(event.target.value, 10);
    // Vérifier si la valeur entrée est un nombre et si elle est supérieure au maximum autorisé
    if (inputVal > prestation.maxGuests) {
      inputVal = prestation.maxGuests; // Réduire la valeur au maximum autorisé
    }
    setNumberOfPeople(inputVal || 1); // Utiliser 1 comme valeur par défaut si la valeur n'est pas un nombre
  };

  async function bookThisPres() {
    if (reservations.length === 0) {
      console.log("No reservations to book.");
      return;
    }
    console.log(numberOfPeople);
    try {
      const responses = await Promise.all(
        reservations.map((reservation) =>
          axios.post("/bookings", {
            prestation: id, // Assurez-vous que 'id' est l'ID de la prestation, pas un objet
            date: reservation.day,
            startTime: reservation.startTime,
            endTime: reservation.endTime,
            guestName: reservation.name,
            numberOfGuests: numberOfPeople,
          })
        )
      );

      responses.forEach((response) => {
        const bookingId = response.data.booking._id; // Assurez-vous que la réponse correspond à cette structure
        setRedirect(`/account-client/bookings/${bookingId}`);
      });
    } catch (error) {
      console.error("Failed to book reservations:", error);
    }
  }

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

  console.log(reservations);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="p-5 mx-4 mt-4 bg-gray-200 rounded-2xl ">
      <h1 className="text-2xl font-semibold text-center">{prestation.titre}</h1>
      <a
        className="flex gap-1 my-4 font-semibold underline"
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
      <div className="flex mt-4 overflow-hidden rounded-2xl">
        <button
          className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => setShowCalendar(true)}
        >
          Afficher les disponibilités
        </button>
        {showCalendar && prestation && prestation.disponibilities && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-600 bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-xl">
              <CalendarWithEvents
                onClose={handleClose}
                disponibilities={prestation.disponibilities}
                onNewReservation={handleNewReservation}
              />
              <div>
                {reservations.map((reservation, index) => (
                  <div key={index}>
                    <p>Nom: {reservation.name} </p>
                    <p>Day: {reservation.day}</p>
                    <p>Start Time: {reservation.startTime}</p>
                    <p>End Time: {reservation.endTime}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        {reservations.map((reservation, index) => (
          <div key={index}>
            <p>Nom: {reservation.name} </p>
            <p>Day: {reservation.day}</p>
            <p>Start Time: {reservation.startTime}</p>
            <p>End Time: {reservation.endTime}</p>
          </div>
        ))}
      </div>

      <div className="px-2 bg-white">
        <label> Nb de personnes :</label>
        <input
          type="number"
          value={numberOfPeople}
          onChange={handlePeopleChange}
          max={prestation.maxGuests}
        />
      </div>

      <button onClick={bookThisPres} className="font-sans font-bold primary">
        Reserver
      </button>
    </div>
  );
}
