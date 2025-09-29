import AxiosInstance from "./Axios"
import { useEffect } from "react"

function Home() {

  const GetData = ()=>{
    AxiosInstance.get(`project/`).then((res)=>{
      console.log(res.data)
    })
 
 
  }

useEffect(()=>{
  GetData()
},[])



  return (
    <div>Home</div>
  )
}

export default Home