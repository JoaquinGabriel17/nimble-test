import { useState } from 'react';
import { api } from '../services/api';

export const JobItem = ({ job, candidate, onSubmitSuccess }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!repoUrl.trim()) {
      setError('Por favor ingresa la URL del repositorio');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await api.applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        repoUrl: repoUrl.trim(),
        applicationId: candidate.applicationId 
      });
      
      setSuccess(true);
      if (onSubmitSuccess) onSubmitSuccess(job.title);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.jobItem}>
      <h3 style={styles.jobTitle}>{job.title}</h3>
      <p style={styles.jobId}>Job ID: {job.id}</p>
      
      {!success ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="url"
            placeholder="https://github.com/tu-usuario/tu-repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={isSubmitting}
            style={styles.input}
            required
          />
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              ...styles.button,
              ...(isSubmitting ? styles.buttonDisabled : {})
            }}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Postulación'}
          </button>
        </form>
      ) : (
        <div style={styles.successMessage}>
          ✅ Postulación enviada exitosamente
        </div>
      )}
      
      {error && (
        <div style={styles.errorMessage}>
          ❌ {error}
        </div>
      )}
    </div>
  );
};

const styles = {
  jobItem: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '16px',
    backgroundColor: '#fff',
  },
  jobTitle: {
    margin: '0 0 8px 0',
    color: '#333',
  },
  jobId: {
    margin: '0 0 16px 0',
    color: '#666',
    fontSize: '14px',
  },
  form: {
    display: 'flex',
    gap: '12px',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0066cc',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  successMessage: {
    padding: '12px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '4px',
    fontSize: '14px',
  },
  errorMessage: {
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '12px',
  },
};