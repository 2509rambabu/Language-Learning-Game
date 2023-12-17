import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import axios from "axios";
import Navbar from "./navbar";


const Register=()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();

  //takes data from form and sends it to server side for checking and adding it to database 
  const handleFormSubmit = async (values, onSubmitProps) => {
    const response= await axios.post('http://localhost:3000/signup', 
      values
    )
    if(response){
      //sets the state to be logged in
      dispatch(
        setLogin({
          user: response.user,
          token: response.token,
        })
      );
      console.log(response)
      navigate("/");
    }
  };

  return(
    <div>
      <Navbar/>
    
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{ username: '', email:'',password:''}}
    >
      {({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      /* and other goodies */
    })=>(
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input
             type="text"
             name="username"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.username}
           />
        </div>

        <div>
        <label>email</label>
          <input type="text"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}></input>
        </div>

        <label>password</label>
          <input type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}></input>

<button type="submit">
             Submit
           </button>

           
      </form>

    )}
    </Formik>
    </div>
  )

}

export default Register;
