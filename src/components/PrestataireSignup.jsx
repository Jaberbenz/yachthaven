// src/components/PrestataireSignup.js

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase'; // Assurez-vous que ce chemin est correct pour votre configuration

function PrestataireSignup() {
  const [nomEntreprise, setNomEntreprise] = useState('');
  const [adresse, setAdresse] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'prestataire'), {
        NomEntreprise: nomEntreprise,
        Adresse: adresse,
        Email: email,
        Téléphone: telephone,
        Description: description
        // Vous pouvez ajouter l'ID de l'utilisateur si nécessaire
      });
      alert("Prestataire enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription du prestataire : ", error);
      alert("Erreur lors de l'inscription du prestataire.");
    }
  };

  return (
    <div>
      <h2>Inscription Prestataire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nomEntreprise}
          onChange={(e) => setNomEntreprise(e.target.value)}
          placeholder="Nom de l'entreprise"
          required
        />
        <input
          type="text"
          value={adresse}
          onChange={(e) => setAdresse(e.target.value)}
          placeholder="Adresse"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
          placeholder="Téléphone"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description de votre entreprise"
          required
        />
        <button type="submit">S inscrire</button>
        
      </form>
    </div>
  );
}

export default PrestataireSignup;
