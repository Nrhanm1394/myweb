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
  const [search,setSearch] = useState('');
  // const [check,setCheck] = useState ([]);
  const classes = useStyles();
  // const query = new URLSearchParams(search).get('q');
  // const filteredData = filterPosts(data, searchQuery);
  // const [searchQuery, setSearchQuery] = useState(query || '');
  useEffect(() => {
    axios
      .get(`http://localhost:9000/trips`)
      .then((respon) => {
        setData (respon.data);
      })
      .catch((error) => {
        console.log(error)
      })
  }, []);

  // useEffect(() => {
  //   setCheck(
  //     data.filter((data) =>
  //       data.tags.includes(search)|| data.title.includes(search)|| data.eid.includes(search)|| data.desciption.includes(search)
  //     )
  //   );
  // }, [search, data]);

  const check = data.map(data => {
    return data
  })

  return (
    <div>
     
    <Container className={classes.Container} >
      <h1  style={{textAlign:'center'}} >10 popular tourist attractions from wongnai</h1>
      <form style={{textAlign:'center'}} action="/" method="get"
      >
        <TextField 
          onChange={(event) => {
            setSearch(event.target.value)
  
          }}

          value={search}
          id="outlined-full-width"
          style={{ width: 400}}
          placeholder="search"
          variant="outlined"
          name= "q"
        />
      </form>
      <br/>
      {check.map((data,idx) => (
      <DataItem key={idx} {...data} />
      ))}
    </Container>

    </div>
  );
}


// title,description,photos,tags,eid,url
const DataItem = ({ title,photos,description,eid,tags,url})=>{
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


