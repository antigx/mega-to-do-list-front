import axios from "axios";

// Defina a URL base da API usando variáveis de ambiente (Vite)
const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Crie uma instância do Axios com tipagem explícita
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar tokens JWT (com tipagem)
api.interceptors.request.use(
  (config) => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      // Garante que `headers` exista e adiciona o token
      if (!config.headers) {
        config.headers = {} as Record<string, string>;
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default api;
