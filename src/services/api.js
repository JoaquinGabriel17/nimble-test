const BASE_URL = import.meta.env.VITE_BASE_URL;

export const api = {
  async getCandidateByEmail(email) {
    const response = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener datos del candidato');
    }
    return response.json();
  },

  async getJobList() {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener lista de trabajos');
    }
    return response.json();
  },

  async applyToJob(applicationData) {
    const response = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(applicationData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al enviar postulación');
    }
    return response.json();
  },
};