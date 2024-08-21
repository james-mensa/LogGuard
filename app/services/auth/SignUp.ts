
import { UserRegisterTy } from '@/core/common/types';
import axios from 'axios'
export const signUp= async(userDetails:UserRegisterTy)=>{
const formData=userDetails;
try {
    const response =await axios.post('/api/auth/signup', formData)
    if(response.status===200){
        
    }
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response);

    }  
}

}