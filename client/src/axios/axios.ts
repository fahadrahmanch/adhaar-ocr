import axios from "axios";
const API_BASE = "https://adhaar-ocr-z0lw.onrender.com";

export const api = axios.create({
    baseURL: API_BASE,
});

export const uploadAadhaar = (formData: FormData) => {
    return api.post("/ocr", formData);
}; 
