// components/AnuncioCard.js

const AnuncioCard = ({ anuncio }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-48">
          <img
            src={anuncio.imagen}
            alt={anuncio.titulo}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center">
            <img
              src={anuncio.logoComercio}
              alt={anuncio.nombreComercio}
              className="w-10 h-10 rounded-full mr-2"
            />
          </div>
          <h2 className="text-xl font-semibold mt-2">{anuncio.titulo}</h2>
          <p className="text-gray-600">{anuncio.descripcion}</p>
        </div>
      </div>
    );
  };
  
  export default AnuncioCard;
  