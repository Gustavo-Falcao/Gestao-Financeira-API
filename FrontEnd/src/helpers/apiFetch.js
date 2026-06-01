import { useNavigate } from "react-router-dom"

const API_URL = "http://localhost:5065/api"

export function apiHttpMethodHandler() {
  const navigate = useNavigate();

  async function apiFetch(endpoint, options = {}) {
      const token = localStorage.getItem("token")
  
      const response = await fetch(`${API_URL}${endpoint}`, {
          ...options, headers: {"Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}`}),
              ...options.headers,
          },
      })
  
      if(response.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
          return
      }
  
      return response
  }

  return { apiFetch }
}
