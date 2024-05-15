import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClientAccountNav from "../ClientAccountNav";

export default function ReservationsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      const bookingsData = response.data;
      const promises = bookingsData.map((booking) =>
        axios.get("/prestation/" + booking.prestation)
      );
      Promise.all(promises).then((responses) => {
        const prestationsData = responses.map((response) => response.data);
        const bookingsWithPrestations = bookingsData.map((booking, index) => ({
          ...booking,
          prestation: prestationsData[index],
        }));
        setBookings(bookingsWithPrestations);
      });
    });
  }, []);
  console.log(bookings);
  return (
    <div>
      <ClientAccountNav />
      <div className="grid grid-cols-1 gap-4 mt-4 mb-10 md:grid-cols-2 lg:grid-cols-3">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="w-11/12 max-w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <Link
                to={"/account-client/bookings/" + booking._id}
                className="relative block h-40 overflow-hidden bg-center bg-cover rounded-lg shadow-lg"
                style={{
                  backgroundImage: `url(http://localhost:4000/uploads/${
                    booking.prestation.photos.length > 0
                      ? booking.prestation.photos[0]
                      : "default_image.jpg"
                  })`,
                }}
              >
                <div className="absolute inset-0 flex flex-col justify-end px-2 py-3 bg-black bg-opacity-40">
                  <h2 className="text-xl font-semibold text-white">
                    {booking.guestName}
                  </h2>
                </div>
              </Link>
              <p className="p-2 text-gray-500">
                {new Date(booking.date).toLocaleDateString()} from{" "}
                {booking.startTime} to {booking.endTime}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
