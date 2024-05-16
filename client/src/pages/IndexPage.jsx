import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  FaBus,
  FaFootballBall,
  FaHotel,
  FaSearch,
  FaSpa,
  FaUtensils,
} from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { UserContext } from "../UserContext";
import Card from "../layouts/Card";

const IndexPage = () => {
  const { user } = useContext(UserContext);

  const [prestations, setPrestations] = useState([]);
  const [location, setLocation] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const icons = [
    { name: "Restauration", icon: FaUtensils },
    { name: "Hotellerie", icon: FaHotel },
    { name: "Bien-être", icon: FaSpa },
    { name: "Loisirs", icon: FaFootballBall },
    { name: "Transport", icon: FaBus },
  ];

  const handleIconClick = (name) => {
    setSelectedIcon(selectedIcon === name ? "" : name);
  };

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
      {user ? (
        <div className="bg-white">
          <div className="flex justify-center p-2">
            <div className="relative w-full mx-4 max-w">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-3 pl-10 pr-4 text-black border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="" disabled hidden>
                  Destination
                </option>
                <option value="saint-tropez">Saint-Tropez</option>
                <option value="antibes">Antibes</option>
                <option value="monaco">Monaco</option>
                <option value="cannes">Cannes</option>
              </select>
              <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
            </div>
          </div>
          <div className="flex justify-around p-4 bg-white">
            {icons.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className={`flex flex-col items-center cursor-pointer ${
                  selectedIcon === name ? "text-golden" : "text-gray-600"
                }`}
                onClick={() => handleIconClick(name)}
              >
                <Icon className="w-6 h-6" />
                <span className="mt-1 text-sm">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
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
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam
              a voluptatum in senectus non neque praesentium...
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="mb-4 text-2xl font-bold text-center text-white">
              RESERVEZ DES MAINTENANT
            </h1>
            <div className="flex justify-center p-2">
              <div className="relative w-full mx-4 max-w">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 pl-10 pr-4 text-black border border-gray-300 rounded-full appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option
                    className="font-sans text-gray-200"
                    value=""
                    disabled
                    hidden
                  >
                    Destination
                  </option>
                  <option value="saint-tropez">Saint-Tropez</option>
                  <option value="antibes">Antibes</option>
                  <option value="monaco">Monaco</option>
                  <option value="cannes">Cannes</option>
                </select>
                <FaSearch className="absolute w-5 h-5 text-gray-500 transform -translate-y-1/2 left-3 top-1/2" />
              </div>
            </div>
          </div>
        </div>
      )}

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
