import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { JobItem } from './JobItem';

export const JobList = ({ candidate }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const data = await api.getJobList();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Cargando posiciones...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Posiciones Disponibles</h2>
      <div style={styles.candidateInfo}>
        <p><strong>Candidato:</strong> {candidate.firstName} {candidate.lastName}</p>
        <p><strong>Email:</strong> {candidate.email}</p>
        <p><strong>ID de candidato:</strong> {candidate.candidateId}</p>
      </div>
      {jobs.map((job) => (
        <JobItem 
          key={job.id} 
          job={job} 
          candidate={candidate}
          onSubmitSuccess={(title) => {
            console.log(`Postulación exitosa para: ${title}`);
          }}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    color: '#333',
    marginBottom: '20px',
  },
  candidateInfo: {
    backgroundColor: '#f5f5f5',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#d32f2f',
  },
};