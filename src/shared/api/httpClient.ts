import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_URL || "/api/";
const normalizedApiBaseUrl = apiBaseUrl.endsWith("/")
	? apiBaseUrl
	: `${apiBaseUrl}/`;

const httpConfig = axios.create({
	baseURL: normalizedApiBaseUrl,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});

export default httpConfig;
