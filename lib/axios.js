import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_LARAVEL_API,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export const axios_with_token=(token)=>{
  return Axios.create({
      baseURL: process.env.NEXT_PUBLIC_LARAVEL_API+"/api",
      headers: {
        'Authorization' : 'Bearer '+token,
      },
      withCredentials: true,
  })

}

export default axios
