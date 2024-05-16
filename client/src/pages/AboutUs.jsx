const AboutUs = () => {
  return (
    <div className="min-h-screen p-4 font-sans text-secondary bg-gray-100">
      <div className="max-w-2xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-900">
          Qui sommes-nous ?
        </h1>
        <p className="mb-4 text-lg leading-7 text-gray-800">
          Après avoir fais le tour du monde avec la soif de découvrir les
          endroits les plus luxueux et respectueux de l’éco-système, nous avons
          relevé une problématique : Comment trouver les meilleurs endroits qui
          correspondent à nos valeurs et éthiques ? C’est pour cela que nous
          convions pour vous dans notre application nos plus prestigieux
          partenaires locaux.
        </p>
        <img
          src="path/to/your/image.jpg" // Remplacez par le chemin de votre image
          alt="Luxurious destination"
          className="object-cover w-full h-64 mb-4 rounded-xl"
        />
        <p className="mb-4 text-lg leading-7 text-gray-800">
          Voyager est un Art. Connaissances, engagement, émotions partagées :
          YachtHaven vous entoure de personnalités passionnées, de renommée
          internationale, crée des expériences immersives et des souvenirs
          inoubliables, afin de comprendre, redécouvrir le monde avec un œil
          neuf lors de voyages marins.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
