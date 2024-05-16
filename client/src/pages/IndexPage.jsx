import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "../layouts/Card";

const IndexPage = () => {
  const [prestations, setPrestations] = useState([]);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await axios.get("/allprestations");
        console.log("Prestations data:", response.data); // Vérifiez les données reçues
        setPrestations(response.data);
      } catch (error) {
        console.error("Failed to fetch prestations:", error);
      }
    };

    fetchPrestations();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="min-h-screen font-sans text-secondary">
      <div className="relative min-h-[60vh]">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(../../fond_accueil.png)` }}
        ></div>

        <div className="relative p-4">
          <h1 className="m-4 text-2xl font-bold text-center text-white">
            Bienvenue sur YachtHaven
          </h1>
          <p className="text-center text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam a
            voluptatum in senectus non neque praesentium...
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="mb-4 text-2xl font-bold text-center text-white">
            RESERVEZ DES MAINTENANT
          </h1>
          <div className="flex items-center p-2 bg-white rounded-md shadow-lg">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select a location</option>
              <option value="location1">Location 1</option>
              <option value="location2">Location 2</option>
              {/* Add more options as needed */}
            </select>
          </div>
        </div>
      </div>

      {/* Slider Component */}
      <div>
        <Slider {...settings}>
          {prestations.map((prestation) => (
            <Card key={prestation._id} prestation={prestation} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      style={{ ...style, display: "block", right: "50px", top: "10rem" }}
      onClick={onClick}
    >
      <div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow"
        style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.25)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      style={{
        ...style,
        display: "block",
        left: "25px",
        top: "10rem",
        zIndex: 1,
      }}
      onClick={onClick}
    >
      <div
        className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow"
        style={{ boxShadow: "0 5px 5px rgba(0,0,0,0.25)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="gray"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default IndexPage;
