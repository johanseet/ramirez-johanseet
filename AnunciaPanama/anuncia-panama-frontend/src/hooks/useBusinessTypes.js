import { useState, useEffect } from 'react';
import { getBusinessTypes } from '@api/businessService';

const useBusinessTypes = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const types = await getBusinessTypes();
        setBusinessTypes(types);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessTypes();
  }, []);

  return { businessTypes, loading, error };
};

export default useBusinessTypes;
