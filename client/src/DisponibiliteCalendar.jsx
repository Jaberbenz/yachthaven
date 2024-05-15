import moment from "moment";
import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarWithEvents({
  onClose,
  disponibilities,
  onNewReservation,
}) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventStart, setNewEventStart] = useState("");
  const [newEventEnd, setNewEventEnd] = useState("");

  const minTime = new Date();
  minTime.setHours(7, 0, 0);
  const maxTime = new Date();
  maxTime.setHours(23, 59, 59);

  const handleAddEvent = () => {
    if (!newEventTitle || !newEventStart || !newEventEnd) {
      alert("Please fill all the fields.");
      return;
    }

    const newEvent = {
      title: newEventTitle,
      start: new Date(newEventStart),
      end: new Date(newEventEnd),
      allDay: false,
    };

    const reservationDetail = {
      name: newEvent.title,
      day: new Date(newEventStart).toLocaleDateString(),
      startTime: new Date(newEventStart).toLocaleTimeString(),
      endTime: new Date(newEventEnd).toLocaleTimeString(),
    };

    // Ajouter l'événement au calendrier
    setEvents((prevEvents) => [...prevEvents, newEvent]);

    onNewReservation(reservationDetail);

    // Fermer le formulaire
    closeForm();
  };

  const closeForm = () => {
    setShowModal(false);
    setNewEventTitle("");
    setNewEventStart("");
    setNewEventEnd("");
  };

  const isTimeSlotValid = useCallback((start, end, disponibilities) => {
    if (!disponibilities || disponibilities.length === 0) {
      // console.error("Disponibilities are not available in dispo calendar.");
      return false; // Empêche l'exécution si les disponibilités ne sont pas définies
    }
    const dayOfWeek = start.getDay();
    const dayNames = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];

    const startHour = start.getHours();
    const startMinutes = start.getMinutes();
    const endHour = end.getHours();
    const endMinutes = end.getMinutes();

    return disponibilities.some((dispo) => {
      const dispoDayOfWeek = dayNames.indexOf(dispo.jour);
      if (dispoDayOfWeek === -1) return false;

      const dispoStartTime = moment(dispo.ouverture, "HH:mm");
      const dispoEndTime = moment(dispo.fermeture, "HH:mm");

      const startTimeInMinutes = startHour * 60 + startMinutes;
      const endTimeInMinutes = endHour * 60 + endMinutes;

      const allowedStart =
        dispoStartTime.hours() * 60 + dispoStartTime.minutes();
      const allowedEnd = dispoEndTime.hours() * 60 + dispoEndTime.minutes();

      return (
        dayOfWeek === dispoDayOfWeek &&
        startTimeInMinutes >= allowedStart &&
        endTimeInMinutes <= allowedEnd
      );
    });
  }, []);

  const slotPropGetter = (date) => {
    const dayOfWeek = date.getDay(); // Jour de la semaine (0 = Dimanche, 1 = Lundi, etc.)
    const hour = date.getHours(); // Heure du jour de la date

    const dayNames = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const dayName = dayNames[dayOfWeek];

    const isReservable = disponibilities.some((dispo) => {
      const startTime = parseInt(dispo.ouverture.split(":")[0], 10); // Heure de début de disponibilité
      const endTime = parseInt(dispo.fermeture.split(":")[0], 10); // Heure de fin de disponibilité
      return dispo.jour === dayName && hour >= startTime && hour < endTime;
    });

    if (isReservable) {
      return {
        style: {
          backgroundColor: "red",
        },
      };
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="fixed top-0 p-4 bg-white rounded-lg shadow-lg">
            <h2>Add New Event</h2>
            <input
              type="text"
              placeholder="Event Title"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              placeholder="Start Date and Time"
              value={new Date(newEventStart).toISOString().substring(0, 16)}
              onChange={(e) => setNewEventStart(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              placeholder="End Date and Time"
              value={new Date(newEventEnd).toISOString().substring(0, 16)}
              onChange={(e) => setNewEventEnd(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={handleAddEvent}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
              >
                Add Event
              </button>
              <button
                onClick={closeForm}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={(slotInfo) => {
          const start = new Date(slotInfo.start);
          const end = new Date(slotInfo.end);
          if (isTimeSlotValid(start, end, disponibilities)) {
            setNewEventStart(slotInfo.start.toISOString());
            setNewEventEnd(slotInfo.end.toISOString());
            setShowModal(true);
          } else {
            alert("This time slot is not reservable.");
          }
        }}
        defaultView="week"
        views={["week", "day", "agenda"]}
        startAccessor="start"
        endAccessor="end"
        min={minTime}
        max={maxTime}
        style={{ height: 500 }}
        slotPropGetter={slotPropGetter}
      />
      <button className="p-4 m-5 bg-gray-500" onClick={onClose}>
        X
      </button>
    </div>
  );
}

CalendarWithEvents.propTypes = {
  onClose: PropTypes.func.isRequired,
  disponibilities: PropTypes.arrayOf(
    PropTypes.shape({
      jour: PropTypes.string.isRequired,
      ouverture: PropTypes.string.isRequired,
      fermeture: PropTypes.string.isRequired,
    })
  ).isRequired,
  onNewReservation: PropTypes.func.isRequired,
};
