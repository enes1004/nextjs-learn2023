import axios from './axios'
import Axios from 'axios'

export default async function passport_client_auth(){
  const access_token=await axios.post(process.env.NEXT_PUBLIC_LARAVEL_API+'/oauth/token',{
      'grant_type' : 'client_credentials',
      'client_id' : process.env.LARAVEL_PASSPORT_ID,
      'client_secret' : process.env.LARAVEL_PASSPORT_SECRET,
      'scope' : '*',
  }).then(res => res.data.access_token);

  return Axios.create({
      baseURL: process.env.NEXT_PUBLIC_LARAVEL_API+"/api",
      headers: {
        'Authorization' : 'Bearer '+access_token,
      },
      withCredentials: true,
  })

}
