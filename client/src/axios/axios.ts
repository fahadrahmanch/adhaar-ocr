import axios from "axios";
const API_BASE = "http://localhost:9000";

export const api = axios.create({
    baseURL: API_BASE,
});

export const uploadAadhaar = (formData: FormData) => {
    return api.post("/ocr", formData);
}; 
