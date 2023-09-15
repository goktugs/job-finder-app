import axios from "axios";

export const authApiInterceptor = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const refreshToken = localStorage
              .getItem("refreshToken")
              ?.replace(/"/g, "");

            const response = await axios.post("/refresh", {
              refreshToken,
            });

            const newToken = response.data.accessToken;

            localStorage.setItem("accessToken", JSON.stringify(newToken));

            originalConfig.headers.authorization = `Bearer ${newToken}`;
            return instance(originalConfig);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(err);
      }
    }
  );
};
