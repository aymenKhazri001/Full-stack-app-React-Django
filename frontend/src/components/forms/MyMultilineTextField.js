import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form'
export default function MyMultilineTextField(props) {
  const {label, width ,placeHolder, name, control } = props
  return (
    <Controller
    name = {name}
    control = {control}

    render={
      ({field : {onChange , value }, fieldState: {error}, formState,}) => (




        <TextField
          id="standard-multiline-static"
          sx={{width:{width}}}
          label={label} 
          multiline
          rows={1}
          onChange={onChange}
          value={value}
          variant="standard"
                      placeholder={placeHolder}
                      error={!!error}
            helperText = {error?.message}

        />

         

        
      )
    }
    >

      
           </Controller>
   
  );
}