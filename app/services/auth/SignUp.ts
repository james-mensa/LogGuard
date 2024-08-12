
import axios from 'axios'
interface UserDetails{
    email: string;
    password: string;
}

export const signUp= async(userDetails:UserDetails)=>{
const formData=userDetails;
try {
    const response =await axios.post('/api/auth/signup', formData)
    console.log({response})
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response.data);

    }  
}

}