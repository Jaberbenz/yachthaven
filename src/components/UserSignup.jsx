// src/components/UserSignup.js

import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase'; // Ajustez ce chemin en fonction de la structure de votre projet

function UserSignup() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'user'), {
        Nom: nom,
        Prénom: prenom,
        Email: email,
        MotDePasse: motDePasse, // Pensez à utiliser l'authentification Firebase pour plus de sécurité
      });
      alert("Inscription réussie !");
    } catch (error) {
      console.error("Erreur lors de l'inscription : ", error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div>
      <h2>Inscription Utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom"
          required
        />
        <input
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Prénom"
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
          type="password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          placeholder="Mot de passe"
          required
        />
        <button type="submit">S'inscrire</button>
        
      </form>
    </div>
  );
}

export default UserSignup;
