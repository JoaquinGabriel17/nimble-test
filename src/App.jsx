import { useCandidate } from './hooks/useCandidate';
import { JobList } from './components/JobList';

const YOUR_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL || '';

function App() {
  const { candidate, loading, error } = useCandidate(YOUR_EMAIL);

  if (loading) {
    return (
      <div style={styles.center}>
        <h2>Cargando datos del candidato...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.center}>
        <h2>Error al cargar datos</h2>
        <p style={styles.error}>{error}</p>
        <p>Verifica que el email sea correcto: {YOUR_EMAIL}</p>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>Nimble Gravity - Job Application</h1>
      </header>
      <main>
        <JobList candidate={candidate} />
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
  },
  header: {
    backgroundColor: '#0066cc',
    color: 'white',
    padding: '24px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  error: {
    color: '#d32f2f',
    marginTop: '16px',
  },
};

export default App;