// import axios from "axios";

// export const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     // Future: Token attach kar sakte ho
//     // const token = localStorage.getItem("token");
//     // if (token) config.headers.Authorization = `Bearer ${token}`;

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response) {
//       return Promise.reject(error.response.data);
//     }

//     return Promise.reject({
//       message: "Something went wrong",
//     });
//   }
// );

export const api = {
  get: async (url: string) => {
    if (url === "/tasks") {
      return [
        {
          id: "1",
          title: "Review Annotation",
          description: "Review pending annotations",
          status: "Pending",
          priority: "High",
          createdAt: "2026-06-08T10:00:00Z",
          updatedAt: "2026-06-08T10:00:00Z",
        },
      ];
    }

    return [];
  },
};