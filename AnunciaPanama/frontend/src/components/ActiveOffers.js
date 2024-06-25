"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const ActiveOffers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/offers`);
        setOffers(response.data);
      } catch (error) {
        console.error('Error obteniendo ofertas:', error);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ofertas Activas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <div key={offer.id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{offer.title}</h3>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveOffers;
