import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // 백엔드 서버 주소로 설정
  withCredentials: true,
});

export default axiosInstance;
