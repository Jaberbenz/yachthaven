import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Card = ({ prestation }) => {
  return (
    <div className="flex flex-col items-center w-full pt-4">
      <Link
        to={"/prestation/" + prestation._id}
        className="w-3/5 h-[308px] rounded-lg overflow-hidden shadow-lg relative"
        style={{
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* Image de fond */}
        <img
          className="object-cover w-full h-full"
          src={`http://localhost:4000/uploads/${prestation.photos?.[0]}`}
          alt={`Restaurant ${prestation.titre}`}
        />
        {/* Nom et description sur l'image */}
        <div className="absolute bottom-0 w-full px-4 pb-4">
          <h3 className="text-lg font-bold text-yellow-400">
            {prestation.titre}
          </h3>
          <p className="text-white">{prestation.description}</p>
        </div>
      </Link>
      {/* Bouton de réservation */}
      <button className="w-2/5 py-2 mt-4 font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600">
        RESERVER
      </button>
    </div>
  );
};

Card.propTypes = {
  prestation: PropTypes.object.isRequired,
};

export default Card;
