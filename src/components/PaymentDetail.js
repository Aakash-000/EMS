import { Button, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField, ThemeProvider, createTheme } from '@mui/material';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import {eventNames} from './EventArray'
import SnackbarComponent from './SnackbarComponent';
import DatePickerComponent from './DatePickerComponent';
import { InsertPageBreak } from '@mui/icons-material';


const RoleDropdown = styled(TextField)`
  && {
    width: 100%;
  }
`;

const CustomTextField = styled(TextField)({
  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
  fontSize: '15px',
  fontWeight: 'bold',
  });

const theme = createTheme({
    components:{
      MuiTypography:{
        styleOverrides:{
          root:{
            fontSize:'18px',
            fontFamily: 'Lato, sans-serif',
            fontFamily: 'Montserrat, sans-serif'
          }
        }
      },MuiGrid:{
        styleOverrides:{
          root:{
            padding:'0px'
          }
        }
      },
        MuiInputLabel:{
        styleOverrides: {
          root: {
            fontSize:'13px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            paddingTop:'3px'
          },
        },
      },
      MuiInputBase:{
        styleOverrides: {
          root: {
            height:'45px',
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          },
        },
      },MuiPopper:{
        styleOverrides: {
          root: {
            '& .MuiPickersCalendarHeader-label':{
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            fontWeight:'500'
          },
          '& .MuiPickersMonth-monthButton':{
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            fontWeight:'500'
          },
          '& .MuiPickersYear-yearButton':{
            fontSize:'14px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            fontWeight:'500'
          }
        },
      },
    },MuiGrid:{
      styleOverrides:{
        root:{
          '& .MuiFormControl-root':{
            margin:'0px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          }
        }
      }
    },
    MuiButtonBase:{
      styleOverrides:{
        root:{
          fontFamily:"Montserrat, sans-serif",
          padding:"7px 10px",
          "&:hover": {
            backgroundColor:"#ffbbcc",
            color:"#2F3E46"
          }
        }
      }
    },MuiButton:{
      styleOverrides:{
        root:{
          fontFamily:"Montserrat, sans-serif",
          padding:"7px 10px",
          "&:hover": {
            backgroundColor:"#5E548E",
            color:"#EDF2F4"
          },
          "&:disabled":{
            color:"grey"
          }
        }
      }
    }
    },
  });
  
  const EventService = ["Starter","Launch","Dinner","Dessert"]
  const GuestRange = ["100-200","200-300","300-400","400-500","500-600","600-700","700-800","800-900","900-1000"]



export default function PaymentForm() { 

  const [state,setState] = React.useContext(AuthContext);
  const[dropdownValues,setDropdownValues] = React.useState({});
  const navigate = useNavigate();
  const {email} = useParams();
  const[bookingDetail,setbookingDetail] = React.useState({preference:"",
  requiredCapacity:"",functionType:""})
  const[bookingdate,setBookingDate] = React.useState(dayjs("2023-08-17"))
  const[isdatevalid,setisdatevalid] = React.useState(true);
  const[pricingdetail,setPricingDetail] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const[valid,setvalid] = React.useState(false)
  const[isvalid,setisvalid] = React.useState(false);
  const siderbarT = state.siderbarToggle;
  const[bookeddate,setBookedDate] = React.useState([])
  const[validprice,setValidPrice] = React.useState("");

  const {$d} = bookingdate
  console.log(bookingdate)
  console.log("Valid:"+valid)

  const config = {      
    headers:{                                                                                                 
      Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token")),
      "Content-Type" : "application/json"
    }
  }

  const handleDropdownChange = (event)=> {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
}

const eventValuesNext = ()=> {
  for(let item in eventNames){
    if(bookingDetail.functionType == item){
      for(let i in eventNames[item]){
        if(bookingDetail.preference == i){
          return eventNames[item][i]
        }
      }
    }
  }  
}

function validateRecipe(){
  for(let value of pricingdetail){
    for(let item in value){
      if(item == "recipeMenu" && dropdownValues?.recipeList){
        if((dropdownValues?.recipeList.length) == (value["recipeMenu"].length)){
        console.log(dropdownValues?.recipeList.length+"+"+(value["recipeMenu"]).length)
        const valone = value[item].sort()
        const valtwo = dropdownValues?.recipeList.sort()
        return JSON.stringify(valone) == JSON.stringify(valtwo)
        }
  }}
  }
}



  console.log(validateRecipe())
  eventValuesNext()

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };
  
  console.log(bookingDetail.functionType)

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


    React.useEffect(()=>{
    let val = true
     async function getPricingDetail(){
      if(val){
      try{
        let request = await fetch(`http://localhost:8888/client-/getPricing/${email}`,{
          method:"GET",
          headers:{
            Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
        }});
      let response = await request.json()
      setPricingDetail((prevValue)=>prevValue = response.data)
        console.log(response)
      }catch(err){
        console.log(err)
      }
      }
      }
      getPricingDetail()
      return ()=> {
        val = false
      }
      },[])

    React.useEffect(()=>{
      let val = true
      async function getBookedDate(){
        if(val){
        try{
          const request = await fetch(`http://localhost:8888/client-/bookedDate/${email}`,{
            method:"GET",
            headers:{
              Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token"))
          }
          });
          const response = await request.json()
          setBookedDate((prevValue) => prevValue = response.data)
          const getDate = bookeddate.filter((item,index)=>{
            return item === `${bookingdate.$y}-${'0'+(bookingdate.$M+1)}-${bookingdate.$D}` 
          })
             console.log(getDate)
             if(bookeddate.includes(getDate[0])){
              setisdatevalid(false)
            }else{
              setisdatevalid(true)
          }
          console.log("DateValidation:"+isdatevalid)
          console.log(response)
        }catch(error){
          console.log(error)
        }
      }
      }
      getBookedDate()
      return ()=> {
        val = false
      }
    },[isdatevalid,valid])

    React.useEffect(()=>{
      let val = true
      function handleCheck(){
        if(val){
        const checkThis = pricingdetail.filter((item) => {
          return item.functionName === bookingDetail.functionType && 
          parseInt(item.guestRange) === parseInt(bookingDetail.requiredCapacity) &&
          item.preference === bookingDetail.preference && 
          validateRecipe()
        })
        console.log(checkThis)
        if(checkThis[0]){
          setValidPrice((prevValue) => prevValue = checkThis[0]?.priceRange)
          setisvalid((prevValue)=> prevValue = true)
          }else{
            setisvalid((prevValue)=> prevValue = false)
          }
      }
      } 
      handleCheck()
      return ()=> {
        val = false
      }
    },[bookingDetail.functionType,bookingDetail.preference,
      bookingDetail.requiredCapacity,dropdownValues.recipeList])
    
    console.log(dropdownValues)
    console.log("SelectionValidity"+isvalid)
    console.log(pricingdetail)
    console.log("Valid Price"+":"+validprice)


    const submitHandler = async(e) =>{
    e.preventDefault();
    try{
      const request = await fetch(
        `http://localhost:8888/client-/book-venue/${email}/${JSON.parse(sessionStorage.getItem("email"))}`,
        {
          method: "POST", 
          headers: {
          Authorization : 'Bearer' +" "+ JSON.parse(sessionStorage.getItem("token")),
          "Content-Type": "application/json"
          },
          body: JSON.stringify({...bookingDetail,bookingDate:$d,...dropdownValues})
          }
        )
        const response = await request.json()
        setvalid((prevValue) => prevValue = true)
        setOpen((prevValue) => prevValue = true)
        console.log(response)
    }catch(error){
      if(error){
        alert("Capacity Exceeded!")
      }else{
      console.log(error)
      setvalid((prevValue) => prevValue = false)
      setOpen((prevValue) => prevValue = true)
      }
    }
    console.log({...bookingDetail,bookingDate:$d,...dropdownValues})
    }

  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <ThemeProvider theme={theme}>
    <SnackbarComponent setopen={open} funcopen={setOpen} setvalid={valid}/>
    <form id='venue_booking_form' onSubmit={submitHandler} siderbarT={siderbarT}>
    <Grid container spacing={2} sx={{
          display:'flex',
          flexDirection:'column',
          justifyContent:'center',
          gap:'5px',
          marginTop:'40px',
          marginBottom:'40px'
          }}>
          <Grid item xs={6} lg={4}>
        <DatePickerComponent arrayitem={bookingDetail} label={"PickDate"} value={bookingdate} 
        setClick={setvalid} setTerm={setBookingDate}/>
        </Grid>
        <Grid item xs={12} lg={4}>
          <RoleDropdown
              select
              disabled={bookingDetail.bookingDate !== "" ? false : true}
              label="GuestRange"
              name="guest"
              sx={{cursor: bookingDetail.bookingDate == "" ? 'not-allowed' : 'pointer'}}
              value={bookingDetail.requiredCapacity}
              onChange={(e)=>{
              setbookingDetail((prevValue)=>({...prevValue,requiredCapacity:e.target.value}))
             
              }}
              variant="outlined"
              required
              > 
              { bookingDetail.bookingDate !== "" && GuestRange.map((value)=>(
                        <MenuItem value={value}
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

              }}>{value}</MenuItem>
                    ))
              }
              </RoleDropdown>
        </Grid>
        <Grid item xs={12} lg={4}>
            <RoleDropdown
              select
              label="EventType"
              onChange={e=>{
                setbookingDetail({...bookingDetail,functionType:e.target.value})
                
              }}
              value={bookingDetail.functionType}
              variant="outlined"
              type="text"
              required
              >
              {["PersonalProgram","FamilyFunction","ProfessionalEvent"].map((item)=>(
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value={item}>{item}</MenuItem>
              ))}
            </RoleDropdown>
          </Grid>
          <Grid item xs={2} lg={4}>
              <FormControl fullWidth>
              <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',
              backgroundColor:'#fff',width:'83px',
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              paddingTop:'3px'}}>Category</InputLabel>
              <Select
                labelId="dropdown1-label"
                id="dropdown0"
                name="recipeList"
                multiple
                required
                InputLabelProps={{
                  style: { fontSize: '13px' ,
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                },
                }}
                variant="outlined"
                disabled={bookingDetail.preference == "" ? true : false}
                value={dropdownValues.recipeList || []}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(',')}
              >
              { bookingDetail.preference !=""  && EventService?.map((value)=>(
             <MenuItem value={`${value}`}>
             <Checkbox checked={dropdownValues[1]?.includes(`${value}`)} />
             <ListItemText primary={`${value}`} />
            </MenuItem>
                    ))
              }
              </Select>
              </FormControl>
              </Grid>
          <Grid item xs={12} lg={4}>
            <RoleDropdown
              select
              label="Preference"
              disabled={bookingDetail.functionType == " " ? true : false}
              onChange={e=>{
                setbookingDetail({...bookingDetail,preference:e.target.value})
                
              }}
              value={bookingDetail.preference}
              variant="outlined"
              type="text"
              required
              >
              {["Vegan","NonVegan"].map((item)=>(
              <MenuItem 
              sx={{
                fontSize:'13px',
                fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
                }}
              value={item}>{item}</MenuItem>))}
              </RoleDropdown>
          </Grid>
          <Grid item xs={2} lg={4}>
              <FormControl fullWidth>
              <InputLabel id="dropdown0-label" sx={{fontSize:'13px',paddingLeft:'4px',
              backgroundColor:'#fff',width:'83px',
              fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
              paddingTop:'3px'}}>Event Types</InputLabel>
              <Select
                labelId="dropdown1-label"
                id="dropdown0"
                name="items"
                multiple
                required
                InputLabelProps={{
                  style: { fontSize: '13px' ,
                  fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',

                },
                }}
                variant="outlined"
                disabled={bookingDetail.preference == "" ? true : false}
                value={dropdownValues.items || []}
                onChange={handleDropdownChange}
                renderValue={(selected) => selected.join(',')}
              >
              { bookingDetail.preference !=""  && eventValuesNext()?.map((value)=>(
             <MenuItem value={`${value}`}>
             <Checkbox checked={dropdownValues[0]?.includes(`${value}`)} />
             <ListItemText primary={`${value}`} />
            </MenuItem>
                    ))
              }
              </Select>
              </FormControl>
              </Grid>

        <div className="book_model_footer" style={{display:'flex',flexDirection:'row',alignItems:"center"}}>
        {state.logstate !== null &&( <Button type="submit" sx={{backgroundColor:"#005F73",fontWeight:"600",
        color:"#EDF2F4", borderRadius:"0px",marginTop:"20px",marginLeft:"20px"}} disabled={isdatevalid ? false : true}>Book</Button>)}
        {isdatevalid ? <div> </div>: 
        <abbr style={{color:"red",fontWeight:"700",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"}}>
          *Date is already Booked
          </abbr>}
      </div>
      <span style={{marginLeft:"20px",fontWeight:"700",backgroundColor:"#f1f1f1",padding:"7px 5px",marginTop:"10px",
      width:"fit-content", borderRadius:"10px 0px 10px 0px",
      fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif"}}>
      {isvalid ? "Payment Amount:"+validprice : "Price Range Not Set for Above Specification!"}
      </span> 
      </Grid>
      </form>
      </ThemeProvider>
      </LocalizationProvider>
      </>
  )
}