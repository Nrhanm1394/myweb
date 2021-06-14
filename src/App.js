import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Container,Grid,ButtonBase,Typography,Paper,Tooltip,Button,FormControl} from'@material-ui/core';




   const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          marginTop: 50,
          width: '50ch',
       
        }, 
      },
      Container:{
        width: '85%',
        height: 'auto',
        display: 'block',
        margin: 'auto',    
   
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
    background: 'SEASHELL',
  },


}));

function App() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState([]);
  const [check,setCheck] = useState ([]);
  const classes = useStyles();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/trips?q=${search}`)
      .then((respon) => {
        setData (respon.data);
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [search]);


  return (
    <div>
     
    <Container className={classes.Container} >
      <h1  style={{textAlign:'center'}} >10 popular tourist attractions from wongnai</h1>
      <form style={{textAlign:'center'}} 
      >
        <TextField 
          onChange={(event) => {
            setSearch(event.target.value)
          }}
          id="outlined-full-width"
          style={{ width: 400}}
          placeholder="search"
          variant="outlined"
          name= "q"
        />
      </form>
      <br/>
      {data.map((data,idx) => (
      <DataItem key={idx} {...data} />
      ))}
    </Container>

    </div>
  );
}


// title,description,photos,tags,eid,url
const DataItem = ({ title,photos,description,eid,tags,url})=>{
const classes = useStyles();
const Tags = tags.map((tags) => 
<li>{tags}</li>
  );
return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Typography gutterBottom variant="subtitle1" >
                <h2 >{eid}.{title}</h2>
                <h3>หมวดหมู่</h3>
                <ul>{Tags}</ul>
          </Typography>
          <Typography gutterBottom variant="subtitle1">
                {description}
          </Typography>
            <Grid item>
              <ButtonBase >
              {photos.map((Image) => (
                 <img src={Image}  alt=" " style={{width:250,height:180}} />
               ))}
              </ButtonBase>        
            </Grid>
        </Grid>
      </Paper>
      <br></br>
    </div>
  ) 
} 

export default App;


