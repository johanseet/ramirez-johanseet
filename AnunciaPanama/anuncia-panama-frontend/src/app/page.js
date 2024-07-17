//AnunciaPanama/anuncia-panama-frontend/src/app/page.js
import AnuncioCard from '@components/common/AnuncioCard';
const anuncios = [
  {
    id: 1,
    imagen: '/images/card1.jpg',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 1',
    titulo: 'Anuncio 1',
    descripcion: 'Descripción del anuncio 1',
  },
  {
    id: 2,
    imagen: '/images/card2.jpeg',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 2',
    titulo: 'Anuncio 2',
    descripcion: 'Descripción del anuncio 2',
  },
  {
    id: 3,
    imagen: '/images/card3.png',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 3',
    titulo: 'Anuncio 3',
    descripcion: 'Descripción del anuncio 3',
  },
  {
    id: 4,
    imagen: '/images/card4.jpeg',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 4',
    titulo: 'Anuncio 4',
    descripcion: 'Descripción del anuncio 4',
  },
  {
    id: 5,
    imagen: '/images/card5.png',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 5',
    titulo: 'Anuncio 5',
    descripcion: 'Descripción del anuncio 5',
  },
  {
    id: 6,
    imagen: '/images/card6.jpg',
    logoComercio: '/images/logo.svg',
    nombreComercio: 'Comercio 6',
    titulo: 'Anuncio 6',
    descripcion: 'Descripción del anuncio 6',
  }
];
export default function HomePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-8">Anuncios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {anuncios.map((anuncio) => (
          <AnuncioCard key={anuncio.id} anuncio={anuncio} />
        ))}
      </div>
    </div>
  );
}
