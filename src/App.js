import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {TextField,Container,Grid,ButtonBase,Typography,Paper,Tooltip,Button} from'@material-ui/core';

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
  image: {
    width: 700,
    height:350,
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },

}));

function App() {
  const [data, setData] = useState([]);
  const [search,setSearch] = useState('');
  const [loading,setLoading]= useState(false);
  const classes = useStyles();
 
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
  const mapData = data.map(data => {
    return data
  })


  return (
    <Container className={classes.Container} >
      <h2>{loading}</h2>
      <h1  style={{textAlign:'center'}} >10 popular tourist attractions from wongnai</h1>
      <form style={{textAlign:'center'}}>
        <TextField 
          onChange={(event) => {setSearch(event.target.value)}}
          id="outlined-full-width"
          style={{ width: 400}}
          placeholder="search"
          variant="outlined"
        />
      </form>
      <br/>

      {mapData.map((data,idx) => (
      <DataItem key={idx} {...data} />
      ))}

    </Container>

  );
}
//title,description,photos,tags,eid
const DataItem = ({ title,photos,description,eid,tags})=>{
  const classes = useStyles();
return (
    <div className={classes.root}>

      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Typography gutterBottom variant="subtitle1" >
                <h2 >{eid}.{title}</h2>
                
              <Tooltip >
                <Button><h3>หมวดหมู่</h3></Button>
              </Tooltip>
              <Tooltip >
                <Button><h4>{tags[0]}</h4></Button>
              </Tooltip>
              <Tooltip >
                <Button><h4>{tags[1]}</h4></Button>
              </Tooltip>
              <Tooltip>
                <Button><h4>{tags[2]}</h4></Button>
              </Tooltip>
              <Tooltip >
                <Button><h4>{tags[3]}</h4></Button>
            </Tooltip>
          </Typography>
        
      
          <Typography gutterBottom variant="subtitle1">
                {description}
          </Typography>
            <Grid item>
              <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={photos[0]} />
              </ButtonBase>            
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <img className={classes.img} alt="complex" src={photos[1]} style={{width:200,height:120}} />
                  <img className={classes.img} alt="complex" src={photos[2]} style={{width:200,height:120}}/>  
                  <img className={classes.img} alt="complex" src={photos[3]} style={{width:200,height:120}}/>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
      </Paper>
      <br></br>
    </div>
  )
} 

export default App;


