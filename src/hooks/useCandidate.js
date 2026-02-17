import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useCandidate = (email) => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        setLoading(true);
        const data = await api.getCandidateByEmail(email);
        setCandidate(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchCandidate();
    }
  }, [email]);

  return { candidate, loading, error };
};