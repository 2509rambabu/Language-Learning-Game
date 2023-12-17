//home page

import Navbar from "./navbar"
import { Container,Box } from "@mui/material";

const Home=()=>{
    return(
        <div>
            <Box sx={{}}>
            <Navbar></Navbar>
            </Box>
            <Box sx={{display:"flex", justifyContent:"center",alignItems:"center", marginTop:"15%",    fontSize: "3em",
    color: "crimson",
    padding: "2em",
    backgroundColor: "#B8A4A4",
    marginLeft: "2em",
    marginRight: "2em",
    width: "fitContent",
    backgroundImage: "url('https://images.unsplash.com/photo-1701122651126-612199155676?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D')",
    }}>
            Welcome to Language Learning App
            </Box>

        </div>
        
    )
}
export default Home;
