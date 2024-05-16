export default function NosMissions() {
  return (
    <div className="min-h-screen p-4 font-sans bg-gray-100 text-secondary">
      <div className="max-w-2xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-900">
          Nos missions
        </h1>
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <div className="flex-1 md:pr-4">
            <p className="mb-4 text-justify text-gray-800">
              Notre souhait ? Mêler pratique et découverte pour nos clients en
              leur faisant découvrir de nouvelles adresses locales
              prestigieuses, classées par catégories et selon leurs besoins.
              Nous souhaitons partager nos relations professionnelles avec les
              passionnés de yachting pour une expérience inédite.
            </p>
            <p className="mb-4 text-justify text-gray-800">
              Nous mettons à disposition des passionnés de yachting nos
              relations professionnelles les plus qualifiées pour leur offrir un
              service des plus prestigieux et raffinés. Notre priorité est de
              vous offrir une expérience qui dépasse vos attentes tout en
              inspirant nos partenaires à exceller avec passion et dévouement.
            </p>
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <img
              src="/nosMissions.png"
              alt="Nos missions"
              className="object-cover w-full h-64 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
