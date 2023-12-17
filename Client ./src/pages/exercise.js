import {Formik,Field } from "formik";
import {useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from "./navbar";
// import {  useSelector } from "react-redux";

//add new quizes by admin
const Exercise = () => {
    // const navigate = useNavigate();

    const handleFormSubmit=async (values, onSubmitProps)=>{
      console.log(values)
    const response= await axios.post('http://localhost:3000/new', 
    values
    )
    if(response){
      console.log(response);
      // navigate("/");
    }
    }

    return(

    <div>
      <Navbar></Navbar>
     <Formik
       initialValues={{  question:'',option1:'', option2:''}}
       onSubmit={handleFormSubmit}
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
       }) => (
         <form onSubmit={handleSubmit}>
            <div>
            <label >Language</label>
           
<Field as="select" name="language">
<option value="select">select</option>
             <option value="English">English</option>
             <option value="Spanish">Spanish</option>
             <option value="French">French</option>
             <option value="German">German</option>             
           </Field>

            </div>
            
           <div>
           <label>question</label>
           <textarea
             type="text"
             name="question"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.question}
           />
           </div>

           <div>
           <label>option1</label>
           <input
             type="text"
             name="option1"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.option1}
           />

           </div>

           <div>
           <label>option2</label>
           <input
             type="text"
             name="option2"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.option2}
           />
           </div>


          <label>correct answer</label>
           <div>
            <Field as="select" name="correct">
            <option value="select">select</option>
             <option value="1">1</option>
             <option value="2">2</option>           
           </Field>
            </div>


          <label>level</label>
            <div>
            <Field as="select" name="level">
            <option value="select">select</option>
             <option value="Easy">Easy</option>
             <option value="Medium">Medium</option>
             <option value="Hard">Hard</option>            
           </Field>
            </div>


           <button type="submit">
             Submit
           </button>
         </form>
       )}
     </Formik>
    </div>
    )
  };
  
  export default Exercise;
