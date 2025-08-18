import axios from "axios";
const httpConfig = axios.create({
	baseURL: "https://iketel.ru/api/",
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
	},
});



export default httpConfig;
