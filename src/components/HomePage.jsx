import React from 'react';
import 'src/assets/styles/HomePage.scss';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase'; // Ajustez ce chemin en fonction de la structure de votre projet

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        {/* Your header content goes here */}
      </header>
      
      <main className="home-main">
        <section className="welcome-section">
          <h1>BIENVENUE SUR YACHTHAVEN</h1>
          <p>Lorem ipsum dolor sit amet...</p>
        </section>

        <section className="services-section">
          <h2>NOS SERVICES</h2>
          {/* Carousel and other content goes here */}
        </section>

        <div className="actions">
          <button className="btn-reserve">RESERVER</button>
          <button className="btn-signup">INSCRIVEZ-VOUS EN TANT QUE CLIENT</button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
