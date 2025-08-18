import axios from "axios";
const httpConfig = axios.create({
	baseURL: "/api/",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});



export default httpConfig;
