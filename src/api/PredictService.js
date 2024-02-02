import axios from "axios";

const API_URL = 'http://localhost:8080/predict'


export default class PredictService{
    static async getWeatherPredict(lat, lon){
        try {
            return await axios.post(`${API_URL}/${lat}/${lon}`)
        }catch (e){
            if (!e.response) return {message: "No server response"}
            else if (e.response.status === 400) return {message: "Invalid parameters"}
        }
    }
}