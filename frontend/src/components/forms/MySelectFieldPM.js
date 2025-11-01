import * as React from 'react';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import AxiosInstance from '../Axios';

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
      <FormControl variant="standard" sx={ {width:{width}} }>
        <InputLabel id="demo-simple-select-filled-label">{label}</InputLabel>

        <Controller
            name = {name}
            control = {control}
        
            render={
              ({field : {onChange , value }, fieldState: {error}, formState,}) => (
        
                 <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          onChange={onChange}
            value={value}
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
        
        
      )
    }
            >
        
              
                   </Controller>

        
      </FormControl>}
   
    </>
  );
}
