import { Link } from "react-router-dom";

export default function RegisterChoice() {
  return (
    <div>
      <div className="max-w-xs px-10 py-20 mx-auto text-center grow">
        <h1 className="mb-16 font-sans text-3xl font-bold text-center">
          Choisissez votre type de profil
        </h1>
        <button className="mt-20 font-sans font-bold primary">
          <Link to={"/register-client"}>Client</Link>
        </button>
        <div className="flex items-center justify-center my-14">
          <div className="bg-black h-0.5 w-20"></div>
          <div className="mx-2 text-xs">OU</div>
          <div className="bg-black h-0.5 w-20"></div>
        </div>
        <button className="font-sans font-bold secondary">
          {" "}
          <Link to={"/register-prestataire"}>Prestataire</Link>
        </button>
      </div>
    </div>
  );
}
