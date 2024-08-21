import axios from 'axios'
export const verifyAccount= async(token:string)=>{

try {
    const response =await axios.get(`/api/auth/verify-account?t=${token}`);
    if(response.status===200){
    }
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response);

    }  
}
}