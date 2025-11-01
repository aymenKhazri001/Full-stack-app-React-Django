import { useEffect, useState } from 'react'
import {Box, Typography, Button } from '@mui/material'
import AxiosInstance from './Axios'
import {useNavigate, useParams} from 'react-router-dom'
 

function Delete() {
const MyParam = useParams()
console.log(MyParam)
const MyId = MyParam.id
const [myData, setMyData] = useState()
const [loading, setLoading] = useState(true);

const GetData = ()=>{
    AxiosInstance.get(`project/${MyId}`).then((res)=>{
      setMyData(res.data)
      setLoading(false)
    })
  }
useEffect(()=>{
  GetData()
  
},[])

const navigate = useNavigate()


  const submission = () => {
    AxiosInstance.delete(`project/${MyId}/`).then((res)=>{
      navigate(`/`)

    })
  }
  return (
    <div>
 {loading ? <p>Loading...</p> :
    <div>

      <Box sx={{display:"flex", width:'100%', backgroundColor: "#000f", marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
          Delete project : {myData.name} 
        </Typography>
      </Box>

      <Box sx={{display:"flex", width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>
        <Box  sx={{display:"flex", justifyContent:"start" , marginBottom:'40px'}}  >
             Are you sure that you want to delete project : {myData.name}
        </Box>
             <Box sx={{width:'30%'}} >
                     <Button sx={{backgroundColor : 'red'}} onClick={submission} variant="contained" type='reset' tx={{width:"100%"}} >
                      Delete the project
                    </Button>
              </Box>

      </Box>

    </div>}

   
           </div>
  )
}

export default Delete