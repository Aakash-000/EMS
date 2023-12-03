import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import {  Button, Container, Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { AuthContext } from '../context/AuthContext';
import RatingandReviewPage from './RatingandReviewPage';


const theme = createTheme({
    components:{
        MuiContainer:{
            styleOverrides:{
                root:{
                    display:"flex",
                    flexDirection:"row",
                    gap:"10px"
                }
            }
        },
        MuiTypography:{
          styleOverrides:{
            root:{
              fontSize: '13px' ,  
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            }
          }
        }
    }
})

function StandardImageList() {

  const [venueDetail,setVenueDetail] = React.useState([])
  const[state] = React.useContext(AuthContext);
  const {email} = useParams() 

  React.useEffect(()=>{
    async function getVenueById(){
      if(state.logstate !== null){
      try{
      const request = await fetch(`http://localhost:8888/client-/venueDetails/${email}`,{
        method:"GET",
        headers:{
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
      }
      });
      const response = await request.json()
      setVenueDetail((prevValue) => prevValue = response?.data)
      console.log(response)
    }catch(error){
      console.log(error)
    }
    }else{
      try{
        const request = await fetch(`http://localhost:8888/home-/venue/${email}`,{
          method:"GET"
        });
        const response = await request.json()
        setVenueDetail((prevValue) => prevValue = response.data)
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
    }
    getVenueById()
    },[])


  return (
    <Container sx={{display:"flex",flexDirection:"column",gap:"20px"}}>
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {venueDetail?.images?.map((item,index) => (
        <ImageListItem key={index}>
          <img
            src={item}
            srcSet={item}
            alt={item+"name"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    <RatingandReviewPage email={email} rating={venueDetail.ratings}/>
    </Container>
  );
}

const DetailDescription = (props)=> {

    const [venueDetail,setVenueDetail] = React.useState([])
    const {email} = useParams()  
    const [value, setValue] = React.useState(1);
    const[state] = React.useContext(AuthContext);
    const[programList,setProgramList] = React.useState([])
    const[recipemenuList,setRecipeMenuList] = React.useState([])
   

    console.log(value)

    React.useEffect(()=>{
      async function getVenueById(){
        if(state.logstate == null || state.logstate == "CLIENT"){
        try{
        const request = await fetch(`http://localhost:8888/client-/venueDetails/${email}`,{
          method:"GET",
          headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
        }
        });
        const response = await request.json()
        setVenueDetail((prevValue) => prevValue = response?.data)
        setValue((prevValue)=> prevValue = response.data?.ratings)
        let recipelist = response.data?.functionTypes
        setProgramList((prevValue) => prevValue = recipelist)
        setRecipeMenuList((prevValue)=> prevValue = response.data?.recipeMenuLists)
        console.log(response)
      }catch(error){
        console.log(error)
      }
      }else{
        try{
          const request = await fetch(`http://localhost:8888/home-/venue/${email}`,{
            method:"GET"
          });
          const response = await request.json()
          setVenueDetail((prevValue) => prevValue = response.data)
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      }
      getVenueById()
      },[])

     
      // React.useEffect(()=>{
      //   let value = true
      //   async function getVenueRatings(){

      //       try{
      //         const request = await fetch(`http://localhost:8888/client-/getrating/${email}`,
      //         {
      //         method:"GET",
      //         headers:{
      //         Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
      //         }
      //         })
      //         const response = await request.json()
      //         console.log(response)
      //         }catch(error){
      //         console.log(error)
      //       }
      //   }
      //   getVenueRatings()
      //   return ()=> {
      //     value = false
      //   }
      // },[])

    return(
      <React.Fragment>
     <Container sx={{width:"fit-content",display:"flex",flexDirection:"column",gap:"10px"}}>
      <Typography sx={{fontSize:"30px",fontWeight:"800"}}>{venueDetail.venueName}</Typography>
      <Typography sx={{fontSize:"25px",fontWeight:"700"}}>{venueDetail.userName}</Typography>
      <Typography sx={{fontSize:"21px",fontWeight:"700"}}>{venueDetail.city_name}</Typography>
      <Typography sx={{fontSize:"21px",fontWeight:"700"}}>{venueDetail.capacity}</Typography>
      <Container disableGutters sx={{display:'flex',flexDirection:'row',alignItems:"flex-start"}}>
        <Container  disableGutters sx={{display:'flex',flexDirection:'column'}}>
        <Typography sx={{fontSize:"18px",fontWeight:"700",
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      }}>Available Events</Typography>
        <ul style={{paddingLeft:"18px"}}>
        {programList?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        <Typography sx={{fontSize:"18px",fontWeight:"700",
        fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
      }}>Available RecipeList</Typography>
        <ul style={{paddingLeft:"18px"}}>
        {recipemenuList?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        </Container>
         <Container disableGutters sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
      <Typography sx={{fontSize:"18px",fontWeight:"700",
      fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
    }}>Available Services</Typography>
      <ul style={{paddingLeft:"18px"}}>
        {venueDetail?.services?.map((item,index)=>(
          <li key={index} style={{fontSize:"16px",
          fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          fontWeight:"600",paddingLeft:"0px"}}>
            {item}
            </li>
        ))}
        </ul>
        {state.logstate == "CLIENT" && (
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography
      sx={{fontWeight:"700",fontSize:"13px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"}}>
        Rated by Clients
      </Typography>
      <Rating
      readOnly
        name="simple-uncontrolled"
        precision={0.5}
        value={value}
      />
      </Box>
      )}
        </Container>
        </Container>
      {/* {state.logstate == "CLIENT" && (
        <form onSubmit={handleRate}>
      <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <Button type="Submit" sx={{backgroundColor:"#fb3a00f"}}>Rate</Button>
      </Box>
      </form>
      )} */}
     </Container> 
      </React.Fragment>
    )
}

export const DescriptionPanel = ()=> {

  const [state,setState] = React.useContext(AuthContext);
  const siderbarT = state.siderbarToggle;

  const handleScroll = ()=>{
    if(window.scrollY >= 30 ){
        setState((prevState)=>{return {...prevState,pageScroll:true}})
    }else{
      setState((prevState)=>{return {...prevState,pageScroll:false}})
    }
}

React.useEffect(()=>{
  let value = true
    if(value){
    window.addEventListener("scroll",handleScroll)
    }
    return ()=> {
    window.removeEventListener("scroll",handleScroll)
    value = false
    }
},[])

    return(
        <ThemeProvider theme={theme} siderbarT={siderbarT}>
        <Container>
        <StandardImageList/>
        <DetailDescription/>
        </Container>
        </ThemeProvider>
    )

}

