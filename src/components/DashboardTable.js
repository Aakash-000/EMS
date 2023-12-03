import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography, createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { AdminData, VenueData } from "./TableData";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import SnackbarComponent from "./SnackbarComponent";

const theme = createTheme({
    components:{
        MuiTableCell:{
            styleOverrides:{
                root:{
            fontSize:'13px',
            fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
            }
            }
        }
    }
});


const TableContent = (props)=> {

  const [open, setOpen] = useState(false);
  const[valid,setvalid] = useState(false)
  const navigate = useNavigate()

  const handleToClose = (event, reason) => {
    if ("clickaway" == reason) return;
    setOpen(false);
  };
  
  const handleAcceptance = async(id)=> {
    if(props.type=="ADMIN"){
    try{
        let request = await fetch(`http://localhost:8888/admin-/update/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
      },body: JSON.stringify({status:0})
      })
      let response = await request.json()
      setvalid(true)
      setOpen(true)
      console.log(response)
    }catch(error){
      setvalid(false)
      setOpen(true)
      console.log(error)
    }
  }else if(props.type == "VENUE"){
    try{
      let request = await fetch(`http://localhost:8888/venue-/response/${id}`,{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
          Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
      },body: JSON.stringify({status:1})
      })
      let response = await request.json()
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }
  }

  const handleRejection = async(id)=> {
    if(props.type=="ADMIN"){
      try{
        let request = await fetch(`http://localhost:8888/admin-/update/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
        },body: JSON.stringify({status:2})
        })
        let response = await request.json()
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }else if(props.type == "VENUE"){
      try{
        let request = await fetch(`http://localhost:8888/venue-/response/${id}`,{
          method:"PUT",
          headers:{
            "Content-Type":"application/json",
            Authorization : "Bearer" +" "+ JSON.parse(sessionStorage.getItem("token"))
        },body: JSON.stringify({status:2})
        })
        let response = await request.json()
        console.log(response)
      }catch(error){
        console.log(error)
      }
    }
  }

  return(
    <ThemeProvider theme={theme}>   
    <SnackbarComponent setopen={open} funcopen={setOpen} setvalid={valid}/>
    <Typography variant="h6" fontSize="large" gutterBottom>
          Latest Requests
    </Typography> 
    <TableContainer component={Paper} className="table" sx={{boxShadow:'none'}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Request ID</TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "" : props.type == "ADMIN" ? "Image" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "BookingDate" : props.type == "ADMIN" ? "VenueName" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "EventType" : props.type == "ADMIN" ? "UserName" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "RequiredCapacity" : props.type == "ADMIN" ? "Email" : " "}
              </TableCell>
              <TableCell className="tableCell">
            {props.type == "VENUE" ? "ItemsSelected" : props.type == "ADMIN" ? "CitizenshipNo" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "Category" : props.type == "ADMIN" ? "" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "Preference" : props.type == "ADMIN" ? "Contact" : " "}
              </TableCell>
            <TableCell className="tableCell">
            {props.type == "VENUE" ? "ClientName" : props.type == "ADMIN" ? "Address" : " "}
              </TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{fontFamily:'system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'}}>
          {props.data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell" sx={{cursor:"pointer"}} onClick={()=>{ navigate(`/dashboard/list/detail/${props.type == "ADMIN" && row.email }`)}}>
              {props.type == "VENUE" ?
                ""
                : props.type == "ADMIN" ? <img src={row.filePath} style={{width:"40px",height:"40px"}} alt="Image"/>
                : ""}
                </TableCell>
              <TableCell className="tableCell">
                {props.type == "VENUE" ? row.bookingDate : props.type == "ADMIN" ? row.venueName : " "}
                </TableCell>
              <TableCell className="tableCell">
              {props.type == "VENUE" ? row.eventType: props.type == "ADMIN" ? row.userName : " "}
                </TableCell>
              <TableCell className="tableCell">
              {props.type == "VENUE" ? row.requiredCapacity: props.type == "ADMIN" ? row.email : " "}
              </TableCell>
              <TableCell className="tableCell" style={{width:"fit-content"}}>
              {props.type == "VENUE" ? <span>{row?.items+","}</span> : 
              props.type == "ADMIN" ? row.citizenShipNo : " "}
              </TableCell>
              <TableCell className="tableCell">
              {props.type == "VENUE" ? 
              <span>
              {row?.recipeMenu+","} 
              </span> 
              : 
              props.type == "ADMIN" ? " ": ""}
              </TableCell>
              <TableCell className="tableCell">
              {props.type == "VENUE" ? row.preference: props.type == "ADMIN" ? row.mobile_no : " "}
              </TableCell>
              <TableCell className="tableCell">
              {props.type == "VENUE" ? row.userC.name: props.type == "ADMIN" ? row.city_name : " "}
              </TableCell>
              <TableCell className="tableCell" sx={{display:'flex',flexDirection:'row',alignItems:'center',gap:'10px'}}>
              <span onClick={()=>handleAcceptance(row.id)} style={{cursor:'pointer',padding:'7px 5px',fontWeight:"600",backgroundColor:'#15616D',color:"#f5f5f5"}}>Accept</span>                
              <span onClick={()=>handleRejection(row.id)} style={{cursor:'pointer',padding:'7px 5px',fontWeight:"600",backgroundColor:'#9A8C98',color:"#f5f5f5"}}>Reject</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  )
}

const DashboardTable = (props) => {

  switch(props.type){
      case "VENUE":
      return (<TableContent data={VenueData()} type={props.type}/>)
      break;
      case "ADMIN":
      return <TableContent data={AdminData()} type={props.type}/>
      break;
      default:
      break;
  }
  return 
};

export default DashboardTable;
