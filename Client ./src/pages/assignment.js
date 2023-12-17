import axios from 'axios';
import { useState } from "react";
import Navbar from './navbar';
import {useDispatch,useSelector} from "react-redux"

//main page for quiz 

const Assignment=()=>{
    const user=useSelector((state)=>state.user);

    const [language,setlanguage]=useState("");
    const [selected,setselected]=useState(false);
    const [quiz,setquiz]=useState([]);
    const [level,setlevel]=useState("Easy");
    const [choice, setchoice] = useState("1")

    //handles changes in selected option
  const onOptionChange = e => {
    setchoice(e.target.value)
  }

  //change language in which user prefers to make their quiz
    const handleChange = (e) => {
        setlanguage(e.target.value);
        // console.log(language);
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(language);
        setselected(true);
        const st=null;
        const response= await axios.get(`http://localhost:3000/assignment/${user._id}/${language}/${level}/${st}`);
        console.log(response)
        setquiz(response.data);
      };

      //handles evalution of question and asks server for next question on the basis of evalution
      const handlequiz=async(e)=>{
        e.preventDefault();
        let st=-1;
        console.log(quiz.correct);
        if(quiz.correct==choice){
          st=true;
        }
        else
        st=false;
          let response;
          if(st!=-1){
            //send server request on evalution
          response= await axios.get(`http://localhost:3000/assignment/${user._id}/${language}/${level}/${st}`)
        setlevel(response.data.level);
        setquiz(response.data);
          } 
      }

    return(
        <div>
          <Navbar></Navbar>
        <h2>
            Select a language
        </h2>
        <form>
        <select name="language" id="language-select" onChange={handleChange}>
        <option value="">--Please choose an option--</option>
        <option value="English">English</option>
        <option value="Spanish">Spanish</option>
        <option value="German">German</option>
        <option value="French">French</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
      </form>


    {selected && quiz!=[] &&
<form>
          <div>
          {quiz.question}
          </div>
          <input
        type="radio"
        name="language"
        value="1"
        onChange={onOptionChange}
      />
      <label htmlFor="Option1">{quiz.option1}</label>

      <input
        type="radio"
        name="language"
        value="2"
        onChange={onOptionChange}
      />
      <label htmlFor="Option1">{quiz.option2}</label>

      <button onClick={handlequiz}>Next question</button>
      </form>

      

}
    

      </div>

        

    )
}

export default Assignment;
