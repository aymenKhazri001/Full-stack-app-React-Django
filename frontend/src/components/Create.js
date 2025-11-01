import { useState, useEffect } from 'react'
import {Box, Typography, Button } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyDatePickerField from './forms/MyDatepickerField'
import MySelectField from './forms/MySelectField'
import MyMultilineTextField from './forms/MyMultilineTextField'
import MySelectFieldPM from './forms/MySelectFieldPM'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate} from 'react-router-dom'
function Create() {



 const [projectManager, setProjectManager]  = useState()
  const [loading, setLoading]  = useState(true)


  const GetData = ()=>{
    AxiosInstance.get(`project_manager/`).then((res)=>{
      setProjectManager(res.data)
      setLoading(false)
    })
 
 
  }

useEffect(()=>{
  GetData()
},[])









const navigate = useNavigate()
const defaultValues = {
  name:'',
  comments:'',
  status:'',
  
  
}

  const {handleSubmit,control} = useForm({defaultValues: defaultValues})
  const submission = (data) => {
    console.log(`---------------------${data}`, data)
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.post(`project/`,{
          name : data.name,
          comments : data.comments,
          status : data.status,
          project_manager   : data.project_manager,
          start_date : StartDate,
          end_date : EndDate,
        }
    ).then((res)=>{
      console.log('**********------',res)
      navigate(`/`)

    })
  }
  return (
    <div>
{loading? <p>Loading data...</p> :

<form onSubmit={handleSubmit(submission)}>
      <Box sx={{display:"flex", width:'100%', backgroundColor: "#000f", marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
          Create records
        </Typography>
      </Box>

      <Box sx={{display:"flex", width:'100%', boxShadow:3, padding:4, flexDirection:'column'}}>
        <Box  sx={{display:"flex", justifyContent:"space-around" , marginBottom:'40px'}}  >
          <MyTextField
           label="Name"
            name="name"
            control={control}
             placeHolder="Provide a project name" 
                         width='30%'
             ></MyTextField>

            <MyDatePickerField
            width='30%'
             label="Start date"
            name="start_date"
            control={control}
            >
              </MyDatePickerField>

            <MyDatePickerField
            width='30%'
             label="End date"
             name="end_date"
             control={control}
             
             >
              </MyDatePickerField>

        </Box>

        <Box  sx={{display:"flex", justifyContent:"space-around"}}  >
          <MyMultilineTextField
           label="Comments"
           name="comments"
           control={control}
           placeHolder="Provide a project comments" 
           width='30%'
           ></MyMultilineTextField>

            <MySelectField
            width='30%'
            label="Status"
            name="status"
            control={control}
            >
              </MySelectField>
            <MySelectFieldPM
            width='30%'
            label="Project Manager"
            name="project_manager"
            control={control}
            >
              </MySelectFieldPM>



        </Box>
            <Box sx={{display:"flex", justifyContent:"center", marginTop : '40px' } } >
              <Button variant="contained" type='submit' sx={{width:"30%"}} >
                Submit
              </Button>
              </Box>
       

      </Box>
    </form>

}
    
           </div>
  )
}

export default Create