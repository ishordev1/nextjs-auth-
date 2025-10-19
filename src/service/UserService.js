import { MyAxios } from "@/helper/MyAxios";


export const signup = async (data) => {
    try {
        const res = await MyAxios.post('/signup', data);
        return res.data;
    }
    catch (err) {
        console.log(err);
        throw err
    }
}

export const signin = async (data) => {
    try {
        const res = await MyAxios.post('/login', data);
        return res.data;
    }
    catch (err) {
        console.log(err);
        throw err
    }
}
export const getCurrentUser=async()=>{
    try{
        const res=await MyAxios.get('/current-user');
        console.log("service:"+res.data.user);

        return res.data.user;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}

export const logout=async()=>{
    try{
        const res=await MyAxios.post('/logout');
        return res.data;
    }
    catch(err){
        console.log(err);
        throw err;
    }
}