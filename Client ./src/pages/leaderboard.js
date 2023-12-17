
import {CssBaseline,Box, Button, Container,IconButton} from '@mui/material'
import { useState,useEffect } from "react";
import Navbar from "./navbar";
import axios from 'axios';

const Leaderboard=()=>{

    const [lang,setlang]=useState("English");
    const [data,setdata]=useState([]);

    // change the state of language's leaderboard to be seen
    const handleChange=(e)=>{
        setlang(e.target.value);
        console.log(lang);
    }

    // handles sideefects whenever 'lang' changes its value and fetch neew data
    useEffect(()=>{
        async function fetchData(){
            try{
                const response=await axios.get(`http://localhost:3000/${lang}`);
        setdata(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchData();
        
      },[lang])
     

    return (
<div>
    <Navbar></Navbar>
    <h1>Leaderboard</h1>

//form element to changes leaderboard
<form>
    <label for="language">Choose Language Leaderboard:</label>
<select id="language" name="language" onChange={handleChange}>
<option value="English">English</option>
             <option value="Spanish">Spanish</option>
             <option value="French">French</option>
             <option value="German">German</option>    
</select>
</form>

//shows users in leaderboard
{data && data.map() && data.map((user)=>{
    return (
        <h3>
            {user.username}
        </h3>
    )
})}

</div>
    )
}

export default Leaderboard;
