
import {Box, Typography,IconButton,Button} from "@mui/material"
import {LightMode,Person} from "@mui/icons-material"
import {useDispatch,useSelector} from "react-redux"
import { setMode, setLogout } from "../state";
import { useNavigate } from "react-router-dom";

const Navbar=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user);

    return(
        <Box sx={{display:'flex'}}>

            {/* home button */}
            <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#8f3d5b"
          onClick={() => navigate("/")}
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
          }}
        >
          Home 
        </Typography>

        //Leaderboard button
        <Button sx={{margin: '5px'}} onClick={() => navigate("/Leaderboard")}>
        Leaderboard
        </Button>

        
          {/* changes mode b/w dark and light mode */}
        <IconButton sx={{margin: '5px'}} onClick={()=>dispatch(setMode())}>
            <LightMode/>
        </IconButton>

          //login anf signup button when no user in logged in the page
        {user==null && (
            <Box display={"flex"}>
            <Button sx={{margin: '5px'}} onClick={() => navigate("/Login")}>
            Login
        </Button>
        <Button sx={{margin: '5px'}} onClick={() => navigate("/Signup")}>
            Signup
        </Button>
        </Box>
        )}

//Assignments and logout page when user is logged in
{user!=null && (
        <Box>
            <Button sx={{margin: '5px'}} onClick={() => navigate("/Assignment")}>
        Assignments
        </Button>
            <Button sx={{margin: '5px'}} onClick={() => dispatch(setLogout())}>
            Logout
        </Button>
        </Box>
    )}

{/* profile page */}
{user!=null && (
    <IconButton sx={{marginLeft:"10em"}} onClick={() => navigate("/Profile")}>
        <Person/>
    </IconButton>
    )}

{/* admin can only add new quix in the database through this button */}
{user!=null && user.username=="Admin" &&
<Box>
            <Button sx={{margin: '5px'}} onClick={() => navigate("/Exercise")}>
        New Exercise
        </Button>
        </Box>
}


        </Box>
        

        
    )
    
}

export default Navbar;
