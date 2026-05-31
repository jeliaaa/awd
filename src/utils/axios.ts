import axios from "axios";
import Cookies from "js-cookie";
import i18n from 'i18next'

const BACKEND_URL = import.meta.env.VITE_BACKEND_APP_URL;

// Helper function to create Axios instance for a specific API version
const createAxiosInstance = (version: string) => {
    // baseURL is intentionally left empty here — the correct language-aware
    // URL is built dynamically in the request interceptor below so it always
    // uses the current i18n.language instead of the value captured at import time.
    const instance = axios.create({
        withCredentials: true,
    });

    instance.interceptors.request.use(
        (config) => {
            // Always use the live language so switching /ka ↔ /en works correctly
            const lang = i18n.language || "en";
            config.baseURL = `${BACKEND_URL}/${lang}/api/${version}`;

            const csrftoken = Cookies.get("csrftoken");
            if (csrftoken) {
                config.headers = config.headers || {};
                config.headers["X-CSRFToken"] = csrftoken;
            }

            // Dynamically set Content-Type based on data type
            if (config.data instanceof FormData) {
                config.headers["Content-Type"] = "multipart/form-data";
            } else {
                if (!config.headers["Content-Type"]) {
                    config.headers["Content-Type"] = "application/json";
                }
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    return instance;
};

// Export instances for different versions
export const apiV1 = createAxiosInstance("v1");
export const apiV2 = createAxiosInstance("v2");