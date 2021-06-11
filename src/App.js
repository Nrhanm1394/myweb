import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Container,Typography} from'@material-ui/core';

   const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          marginTop: 50,
          width: '50ch',
        }, 
      },
      iconButton: {
        marginTop: 50,
      },
      Card:{
        width: '80%',
        height: 'auto',
        display: 'block',
        margin: 'auto',
      },
      Container:{
        Text:'center',

        
      }
    }));

function App() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('');
  const [loading,setLoading]= useState(false);
 
  useEffect(() => {
    axios
      .get("http://localhost:9000/trips")
      .then((respon) => {
        setData(respon.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  if(loading){
    return <p>loading........</p>
  }
  const filterData = data.filter(data =>{
    return data.title.includes(search)
  })

  return (
    <div>
    <Container >
      <h1>Travel......</h1>
      <form>
    
      <TextField
          onChange={(event) => {setSearch(event.target.value)}}
          id="outlined-full-width"
          style={{ width: '80%' }}
          placeholder="search"
          margin="normal"
          variant="outlined"
        />
      </form>
      <br/>
      {filterData.map((data,idx) => (
      <DataItem key={idx} {...data} />
      ))}
    </Container>
    
    </div>
  );
}
//title,description,photos,tags
const DataItem = (props) => {
  const {title} = props;
  const classes = useStyles();
  return (
    <Typography className = {classes.Typography}>
    {title}
    <br></br>
    </Typography>
         
  )
} 

export default App;


