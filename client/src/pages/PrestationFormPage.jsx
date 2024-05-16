import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import PrestataireAccountNav from "../PrestataireAccountNav";

export default function PrestationFormPage() {
  const { id } = useParams();
  const [titre, setTitre] = useState("");
  const [adresse, setAdresse] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [categorie, setCategorie] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [prix, setPrix] = useState(100);
  const [redirect, setRedirect] = useState(false);
  const [disponibilities, setDisponibilities] = useState([]);

  const jours = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche",
  ];

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/prestation/" + id).then((response) => {
      const { data } = response;
      console.log("Data received from GET request:", data); // Affiche les données reçues

      setTitre(data.titre);
      setAdresse(data.adresse);
      setPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setMaxGuests(data.maxGuests);
      setPrix(data.prix);
      setCategorie(data.categorie || "");
      setDisponibilities(data.disponibilities || []);
    });
  }, [id]);

  const handleAddDisponibility = () => {
    setDisponibilities([
      ...disponibilities,
      { jour: "", ouverture: "", fermeture: "" },
    ]);
  };

  const handleRemoveDisponibility = (index) => {
    setDisponibilities(disponibilities.filter((_, i) => i !== index));
  };

  const handleChangeDisponibility = (index, field, value) => {
    const updated = disponibilities.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setDisponibilities(updated);
  };

  async function savePrestation(ev) {
    ev.preventDefault();

    // Nettoyage des objets de disponibilité
    const cleanedDisponibilities = disponibilities.map(
      ({ jour, ouverture, fermeture }) => ({
        jour,
        ouverture,
        fermeture,
      })
    );

    const prestationData = {
      titre,
      adresse,
      photos,
      description,
      perks,
      extraInfo,
      maxGuests,
      categorie,
      prix,
      disponibilities: cleanedDisponibilities,
    };

    console.log("Sending cleaned data:", prestationData);

    if (id) {
      // Si l'ID existe, mise à jour de la prestation
      await axios.put("/prestation", {
        id,
        ...prestationData,
      });
      setRedirect(true);
    } else {
      // Création d'une nouvelle prestation
      await axios.post("/prestation", prestationData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account-prestataire/services"} />;
  }

  return (
    <div>
      <PrestataireAccountNav />
      <form onSubmit={savePrestation}>
        <h2 className="mx-2 text-xl">Titre</h2>
        <input
          type="text"
          value={titre}
          onChange={(ev) => setTitre(ev.target.value)}
          placeholder="titre, par exemple: LA VAGUE D’OR "
        />
        <h2 className="mx-2 text-xl">Adresse</h2>
        <input
          type="text"
          value={adresse}
          onChange={(ev) => setAdresse(ev.target.value)}
          placeholder="adresse"
        />
        <h2 className="mx-2 mt-4 text-xl">Photos</h2>
        <PhotosUploader photos={photos} onChange={setPhotos} />
        <h2 className="mx-2 mt-4 text-xl">Description</h2>
        <textarea
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <h2 className="mx-2 mt-4 text-xl">Perks</h2>
        <div className="grid grid-cols-2 gap-2 mx-2 mt-2">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        <h2 className="mx-2 mt-4 text-xl">Catégorie</h2>
        <select
          value={categorie}
          onChange={(ev) => setCategorie(ev.target.value)}
          className="block w-full px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >
          <option value="">Sélectionnez une catégorie</option>
          <option value="hôtellerie">Hôtellerie</option>
          <option value="loisirs">Loisirs</option>
          <option value="bien-être">Bien-être</option>
          <option value="restauration">Restauration</option>
        </select>
        <h2 className="mx-2 mt-4 text-xl">Info supplémentaire</h2>
        <textarea
          value={extraInfo}
          onChange={(ev) => setExtraInfo(ev.target.value)}
        />
        <h2 className="mx-2 mt-4 text-xl text-center">Disponibilités</h2>
        <div className="max-w-md px-4 mx-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {disponibilities.map((disponibility, index) => (
              <div key={index} className="p-3 mb-4 bg-white rounded shadow">
                <div className="mb-3">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Jour
                  </label>
                  <select
                    className="block w-full px-3 py-2 text-base font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    value={disponibility.jour}
                    onChange={(e) =>
                      handleChangeDisponibility(index, "jour", e.target.value)
                    }
                  >
                    <option value="">Sélectionnez un jour</option>
                    {jours.map((jour) => (
                      <option key={jour} value={jour}>
                        {jour}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <input
                    type="time"
                    className="form-input px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:shadow-outline"
                    value={disponibility.ouverture}
                    onChange={(e) =>
                      handleChangeDisponibility(
                        index,
                        "ouverture",
                        e.target.value
                      )
                    }
                    placeholder="Heure d'ouverture"
                  />
                  <input
                    type="time"
                    className="form-input px-3 py-1.5 border border-gray-300 rounded shadow-sm focus:shadow-outline"
                    value={disponibility.fermeture}
                    onChange={(e) =>
                      handleChangeDisponibility(
                        index,
                        "fermeture",
                        e.target.value
                      )
                    }
                    placeholder="Heure de fermeture"
                  />
                </div>
                <button
                  type="button"
                  className="w-full py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                  onClick={() => handleRemoveDisponibility(index)}
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            className="w-full py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleAddDisponibility}
          >
            Ajouter une disponibilité
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mx-2 mt-4">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold">Max personne</h3>
            <input
              type="number"
              value={maxGuests}
              onChange={(ev) => setMaxGuests(ev.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold">Prix</h3>
            <input
              type="number"
              value={prix}
              onChange={(ev) => setPrix(ev.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div>
          <button className="my-4 primary">Enregistrer</button>
        </div>
      </form>
    </div>
  );
}
