import { useEffect, useState } from 'react'
import {Box, Typography, Button } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyDatePickerField from './forms/MyDatepickerField'
import MySelectField from './forms/MySelectField'
import MyMultilineTextField from './forms/MyMultilineTextField'
import { useForm } from 'react-hook-form'
import AxiosInstance from './Axios'
import Dayjs from 'dayjs'
import {useNavigate, useParams} from 'react-router-dom'
 

function Edit() {
const MyParam = useParams()
console.log(MyParam)
const MyId = MyParam.id
const [loading, setLoading] = useState(true);

const GetData = ()=>{
    AxiosInstance.get(`project/${MyId}`).then((res)=>{
      console.log(res.data)
      setValue('name', res.data.name)
      setValue('status', res.data.status)
      setValue('comments', res.data.comments)
    
      setValue('start_date', Dayjs(res.data.start_date))
      setValue('end_date', Dayjs(res.data.end_date))
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

  const {handleSubmit,setValue,control} = useForm({defaultValues: defaultValues})
  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD")
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD")
    AxiosInstance.put(`project/${MyId}/`,{
          name : data.name,
          comments : data.comments,
          status : data.status,
          start_date : StartDate,
          end_date : EndDate,
        }
    ).then((res)=>{
      navigate(`/`)

    })
  }
  return (
    <div>
 {loading ? <p>Loading...</p> :
    <form onSubmit={handleSubmit(submission)}>

      <Box sx={{display:"flex", width:'100%', backgroundColor: "#000f", marginBottom:'10px'}}>
        <Typography sx={{marginLeft:'20px', color:'#ffffff'}}>
          Update records
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

            <Box sx={{width:'30%'}} >
              <Button variant="contained" type='submit' tx={{width:"100%"}} >
                Submit
              </Button>
              </Box>

        </Box>
       

      </Box>
    </form>}
           </div>
  )
}

export default Edit