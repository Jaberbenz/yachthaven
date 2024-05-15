import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const { id } = useParams();
  const [client, setClient] = useState({
    nom: "",
    email: "",
    prenom: "",
    numeroTel: "",
    role: "",
  });

  useEffect(() => {
    const fetchClient = async () => {
      const res = await axios.get(`/client/${id}`);
      console.log(res.data);
      setClient(res.data);
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`/client/${id}`, client);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
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
        First Name:
        <input
          type="text"
          name="prenom"
          value={client.prenom}
          onChange={handleChange}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="tel"
          name="numeroTel"
          value={client.numeroTel}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default EditProfile;
