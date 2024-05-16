import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

const EditProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const [client, setClient] = useState({
    nom: user.nom || "",
    email: user.email || "",
    prenom: user.prenom || "",
    numeroTel: user.numeroTel || "",
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nom", client.nom);
    formData.append("email", client.email);
    formData.append("prenom", client.prenom);
    formData.append("numeroTel", client.numeroTel);
    if (profilePhoto) {
      formData.append("photo", profilePhoto);
    }

    try {
      console.log("Submitting update for client:", client);
      const response = await axios.put(`/client/${user._id}`, formData, {
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
          value={client.nom}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={client.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Prénom:
        <input
          type="text"
          name="prenom"
          value={client.prenom}
          onChange={handleChange}
        />
      </label>
      <label>
        Numéro de téléphone:
        <input
          type="tel"
          name="numeroTel"
          value={client.numeroTel}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Mettre à jour le profil</button>
    </form>
  );
};

export default EditProfile;
