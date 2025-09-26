import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  timeout: 20000,
});

// Interceptor to show auth token if needed
api.interceptors.request.use(cfg => {
  // cfg.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  return cfg;
});

export default api;
// At top: detect mock mode
const MOCK = !import.meta.env.VITE_API_URL;

if(MOCK) {
  api.post = async (url, payload) => {
    if(url.includes("/dev/upload")){
      return { data: {
        dev_id: "mock_1",
        parsed_skills: [
          {skill:"python", normalized:"python", score:92, evidence:"Experience: built microservices in Python"},
          {skill:"fastapi", normalized:"fastapi", score:80, evidence:"Used FastAPI for APIs"}
        ]
      }};
    }
    if(url.includes("/project/upload")){
      return { data: {
        project_id: "mock_proj",
        required_skills: ["python","fastapi","docker"],
        matches: [
          { dev_id:"mock_1", name:"Alice", overall_score: 87.2, matched_skills: [
            {skill:"python", score:92, evidence:"Experience: built microservices..."},
            {skill:"fastapi", score:80, evidence:"Used FastAPI..."}
          ], years_experience: 3 }
        ]
      }};
    }
    return { data: {} };
  };
}
