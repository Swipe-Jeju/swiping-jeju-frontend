import axios from "axios";

// Axios 인스턴스 생성 및 설정
export const API = axios.create({
    baseURL: "",
    headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": 'cLQVZgB5CpfvIHCJ4N8bQeNXo3yBpYZ6'
    },
});

// // Axios 요청을 보내기 전에 CSRFToken을 헤더에 추가
// API.interceptors.request.use(
//     (config) => {
//         const csrfToken = getCSRFTokenFromCookie(); // 쿠키에서 CSRFToken 가져오기
//         if (csrfToken) {
//             config.headers["X-CSRFToken"] = csrfToken; // 헤더에 CSRFToken 추가
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );
