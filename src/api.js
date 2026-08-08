// Point this at your deployed Django backend. During local development
// this defaults to the Django dev server on http://localhost:8000/api.
const API_BASE = import.meta.env.VITE_API_BASE || "https://achievers-day-backend-b0cd.onrender.com/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Something went wrong");
  }
  return data;
}

export const api = {
  getStudent: (rollNo) => request(`/student/${encodeURIComponent(rollNo)}/`),
  listStudents: (search = "") =>
    request(`/students/${search ? `?search=${encodeURIComponent(search)}` : ""}`),
  submitRegistration: (payload) =>
    request(`/submit/`, { method: "POST", body: JSON.stringify(payload) }),
  dashboard: () => request(`/dashboard/`),
  listRegistrations: () => request(`/registrations/`),
  downloadUrl: (which) => `${API_BASE}/download/${which}/`,
};
