// import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import Navbar from "./navbar";

const Login=()=>{
    const dispatch = useDispatch();
  const navigate = useNavigate();

  // takes data from form and send it to server using post request to authenticate the user
  const handleFormSubmit = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    // console.log(response)
    const loggedIn = await response.json();
    onSubmitProps.resetForm();

    if(loggedIn){
      // changes state of the website to be logged in
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
        
      );
      navigate("/");
      // console.log(loggedIn.user)
      
    }
  };

  return(
    <div>
    <Navbar/>
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={{  email:'',password:''}}
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

export default Login;
