import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import AxiosInstance from '../Axios';
import { FormHelperText } from '@mui/material';

export default function MySelectFieldPM(props) {
    const {label,width,  name, control}= props

    
  const [myData, setMyData]  = useState([])
  const [loading, setLoading]  = useState(true)


  const GetData = ()=>{
    AxiosInstance.get(`project_manager/`).then((res)=>{
      setMyData(res.data)
      setLoading(false)
    })
 
 
  }

useEffect(()=>{
  GetData()
},[])




 
  return (
    <>
      {loading?<p>loading the pm coming</p>:
      

        <Controller
            name = {name}
            control = {control}
        
            render={
              ({field : {onChange , value }, fieldState: {error}, formState,}) => (
                <FormControl variant="standard" sx={ {width:{width}} }>
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>
        
                 <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={onChange}
            value={value}
            error = {!!error}
            
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            myData.map(item=>(

              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))
          }
          
        </Select>
        <FormHelperText sx={{color:"#d32f2f"}} >{error?.message}</FormHelperText>
        
        </FormControl>
      )
    }
            >
        
              
                   </Controller>

        
      }
   
    </>
  );
}
