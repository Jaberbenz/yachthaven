import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";

const EditProfilePres = () => {
  const { user, setUser } = useContext(UserContext);
  const [prestataire, setPrestataire] = useState({
    nom: user.nom || "",
    email: user.email || "",
    prenom: user.prenom || "",
    numeroTel: user.numeroTel || "",
    numeroSiret: user.numeroSiret || "",
    adresse: user.adresse || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setPrestataire({ ...prestataire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", prestataire.nom);
    formData.append("email", prestataire.email);
    formData.append("prenom", prestataire.prenom);
    formData.append("numeroTel", prestataire.numeroTel);
    formData.append("numeroSiret", prestataire.numeroSiret);
    formData.append("adresse", prestataire.adresse);
    if (profilePhoto) {
      formData.append("photo", profilePhoto);
    }

    try {
      console.log("Submitting update for prestataire:", prestataire);
      const response = await axios.put(`/prestataire/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Update response:", response.data);
      setUser(response.data); // Update the user context with the new data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Photo de profil:
        <input
          type="file"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
        />
      </label>
      <label>
        Nom:
        <input
          type="text"
          name="nom"
          value={prestataire.nom}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={prestataire.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Prénom:
        <input
          type="text"
          name="prenom"
          value={prestataire.prenom}
          onChange={handleChange}
        />
      </label>
      <label>
        Numéro de téléphone:
        <input
          type="tel"
          name="numeroTel"
          value={prestataire.numeroTel}
          onChange={handleChange}
        />
      </label>
      <label>
        Numéro SIRET:
        <input
          type="text"
          name="numeroSiret"
          value={prestataire.numeroSiret}
          onChange={handleChange}
        />
      </label>
      <label>
        Adresse:
        <input
          type="text"
          name="adresse"
          value={prestataire.adresse}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Mettre à jour le profil</button>
    </form>
  );
};

export default EditProfilePres;
