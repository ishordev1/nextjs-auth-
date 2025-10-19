import { MyAxios } from "@/helper/MyAxios";

export const createTask = async (taskData) => {
    try {
        const response = await MyAxios.post('/task', taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const getTasks = async () => {
    try {
        const response = await MyAxios.get('/task');
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};
