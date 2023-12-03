import { Box, Button, Container, Rating, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';

const theme = createTheme({
    components:{
        MuiFormLabel:{
            styleOverrides:{
                root:{
                    fontSize:'13px',
                    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                    fontWeight:'500',
                    letterSpacing:'0.3px'
                }
            }
        },
        MuiButton:{
            styleOverrides:{
              root:{
                fontFamily:"Montserrat, sans-serif",
                padding:"7px 10px",
                "&:hover": {
                  backgroundColor:"#005F73",
                  color:"#EDF2F4"
                },
            }
        }
    },
    MuiInputBase:{
        styleOverrides:{
            input:{
                    fontSize:'14px',
                    fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                    fontWeight:'400',
                    letterSpacing:'0.3px'
            }
        }
    }
    }
})

const RatingandReviewPage = (props) => {

    const [value, setValue] = React.useState(props.rating);
    const [state] = useContext(AuthContext);
    const[review,setReview] = useState("");
    const[dates,setDates] = useState([]);
    const date = new Date()
    const Year = date.getFullYear();
    const Month = date.getMonth()+1;
    const Day = date.getDate();
    const todaysdate = `${Year}-${Month}-0${Day}`.toString()
    const yesterdaysdate = `${Year}-${Month}-0${parseInt(Day)-1}`.toString()
    const backdate = `${Year}-${Month}-0${parseInt(Day)-2}`.toString()

    console.log(yesterdaysdate)
    console.log(todaysdate)
    console.log(backdate)

    React.useEffect(()=>{
        let val = true;
        async function getDates(){
            if(val){
            try{
            const request = await fetch(`http://localhost:8888/client-/getDates/${JSON.parse(sessionStorage.getItem("email"))}/${props.email}`,
            {
            method:"GET",
            headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
            }     
            });
            const response = await request.json()
            setDates((prevValue) => prevValue = response.data)
            console.log(response)
        }catch(error){
            console.log(error)
        }
        }
    }
    getDates()
    return ()=> {
        val = false
    }
    },[])

    const handleRate = async (e)=> {
        e.preventDefault()
        try{
          const request = await fetch(`http://localhost:8888/client-/rateVenue/${JSON.parse(sessionStorage.getItem("email"))}/${props.email}`,{
            method:"POST",
            headers:{
              "Content-Type":"application/json",
              Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
          },body: JSON.stringify({ratings:value,reviews:review})
          })
          const response = await request.json()
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      console.log(dates)

      function getResult(){
        for(let i of dates){
          if( i === todaysdate || i === yesterdaysdate || i === backdate){
            return true
          }
        }
        return false
      }
      console.log(getResult())
  return (
    <ThemeProvider theme={theme}>
    <Container disableGutters maxWidth={'xl'}>
        {(state.logstate == "CLIENT" && getResult() ) ?(
        <form onSubmit={handleRate}>
        <Box
        sx={{
        '& > legend': { mt: 2 },
        }}
        >
      <Typography component="legend"
            sx={{fontWeight:"700",fontSize:"13px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"}}>
        Rate
        </Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <TextField type="text" value={review} label="Review" multiline required
        fullWidth rows={8} onChange={(e)=>setReview((prevValue)=> prevValue = e.target.value)}/>
      <Button type="Submit" sx={{
        backgroundColor:"#005F73",fontWeight:"600",
        color:"#EDF2F4", borderRadius:"0px",marginTop:"20px"
      }}>Submit</Button>
      </Box>
      </form>
      ):""}
    </Container>
    </ThemeProvider>
  )
}

export default RatingandReviewPage