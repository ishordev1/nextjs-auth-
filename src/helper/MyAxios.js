import axios from "axios";

export const MyAxios=axios.create({
    baseURL:"http://localhost:3000/api"
})