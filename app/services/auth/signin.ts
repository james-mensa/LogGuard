
import axios from 'axios'
interface UserDetails{
    email: string;
    password: string;
}

export const signIn= async(userDetails:UserDetails)=>{
const formData=userDetails
try {
    const response =await axios.post('/api/auth/signin', formData)
    console.log({response})
} catch (error) {
    if (axios.isAxiosError(error)) {
        console.error('Axios error occurred:',error.response.data);

    }  
}

}