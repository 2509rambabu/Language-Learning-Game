import {CssBaseline,Box, Button, Container,IconButton} from '@mui/material'
import { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux"
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const ProfilePage=()=>{

    const navigate = useNavigate();
  const user=useSelector((state)=>state.user);
//   const { id } = useParams();
  const [userdata,setuserdata]=useState([]);

  useEffect(async()=>{
    const response=await axios.get(`http://localhost:3000/user/${user._id}`);
    setuserdata(response.data);
  },[])

    return(
        <Box>
            This is a profile page

{userdata && userdata!=[] &&
        <Container>
            <Box>
                <h2>English</h2>
                Total questions attempted:   {userdata.English.attempts}
                Total questions correct:  {userdata.English.accuracy}
                Marks obtained: {userdata.English.marks}
                Total marks attempted:{userdata.English.totalmarks}
            </Box>

            <Box>
                <h2>French</h2>
                Total questions attempted:   {userdata.French.attempts}
                Total questions correct:  {userdata.French.accuracy}
                Marks obtained: {userdata.French.marks}
                Total marks attempted:{userdata.French.totalmarks}
            </Box>

            <Box>
                <h2>German</h2>
                Total questions attempted:   {userdata.German.attempts}
                Total questions correct:  {userdata.German.accuracy}
                Marks obtained: {userdata.German.marks}
                Total marks attempted:{userdata.German.totalmarks}
            </Box>

            <Box>
                <h2>French</h2>
                Total questions attempted:   {userdata.French.attempts}
                Total questions correct:  {userdata.French.accuracy}
                Marks obtained: {userdata.French.marks}
                Total marks attempted:{userdata.French.totalmarks}
            </Box>
            
        </Container>
}
        </Box>

    )
}

export default ProfilePage;
