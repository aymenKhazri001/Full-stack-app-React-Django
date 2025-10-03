import AxiosInstance from "./Axios"
import { useEffect, useMemo, useState } from "react"
import Dayjs from "dayjs";
import { Box,IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {Link} from 'react-router-dom'
import {
  MaterialReactTable,
  
} from 'material-react-table';

function Home() {

  const [myData, setMyData]  = useState()
  const [loading, setLoading]  = useState(true)


  const GetData = ()=>{
    AxiosInstance.get(`project/`).then((res)=>{
      setMyData(res.data)
      setLoading(false)
    })
 
 
  }

useEffect(()=>{
  GetData()
},[])




  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'Name',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        size: 150,
      },
      {
        accessorKey: 'comments', //normal accessorKey
        header: 'Comments',
        size: 200,
      },
      {
        accessorFn: (row)=> Dayjs(row.start_date).format('DD-MM-YYYY'),
        header: 'Start_date',
        size: 150,
      },
      {
        accessorFn: (row)=> Dayjs(row.end_date).format('DD-MM-YYYY'),
        header: 'End_date',
        size: 150,
      }
    ],
    [],
  );

  console.log(myData)
  
  return (
    <div>
      {loading ? <p>loading</p>: <MaterialReactTable
       columns={columns}
        data={myData}
        enableRowActions
      renderRowActions={({row}) => (
        <Box sx={{ display: 'flex',
         flexWrap: 'nowrap',
          gap: '8px' }}>
          <IconButton
            color="secondary"
            component={Link} 
            to={`edit/${row.original.id}`}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
           
          >
            <DeleteIcon />
          </IconButton>

        </Box>
      )}
></MaterialReactTable>}
    </div>
  )
};


export default Home