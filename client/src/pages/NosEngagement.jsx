export default function NosEngagements() {
  return (
    <div className="min-h-screen p-4 font-sans bg-gray-100 text-secondary">
      <div className="max-w-2xl p-6 mx-auto bg-white shadow-lg rounded-2xl">
        <h1 className="mb-6 text-3xl font-bold text-center text-blue-900">
          Nos engagements
        </h1>
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <div className="flex-1 md:pr-4">
            <p className="mb-4 text-justify text-gray-800">
              Pour nous, l'excellence est une valeur fondamentale. Nous croyons
              fermement en la poursuite de l'excellence dans tout ce que nous
              faisons, que ce soit dans la qualité de nos produits, notre
              service clientèle ou nos pratiques commerciales. L'excellence est
              notre norme, et elle guide chaque aspect de notre entreprise vers
              la perfection.
            </p>
            <p className="mb-4 text-justify text-gray-800">
              Le partage est également au cœur de notre philosophie. Nous
              croyons en la collaboration, en l'échange d'idées et en la
              création d'une communauté forte. Nous partageons nos succès avec
              nos partenaires et nos clients, et nous cherchons constamment à
              contribuer au bien-être collectif.
            </p>
            <p className="mb-4 text-justify text-gray-800">
              Les produits locaux occupent une place spéciale dans notre
              entreprise. Nous valorisons les liens avec notre communauté locale
              et nous soutenons activement les producteurs locaux. En
              privilégiant les producteurs locaux, nous renforçons l'économie
              locale, réduisons notre empreinte écologique et offrons à nos
              clients des produits frais et de qualité supérieure.
            </p>
            <p className="mb-4 text-justify text-gray-800">
              Ensemble, ces valeurs façonnent notre identité et guident nos
              actions au quotidien. Elles nous aident à créer une entreprise
              solide, axée sur l'excellence, le partage et le soutien de notre
              communauté locale.
            </p>
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <img
              src="/nosEngagements.png"
              alt="Nos engagements"
              className="object-cover w-full h-64 rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
