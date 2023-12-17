//server side
const express=require("express");
const mongoose=require("mongoose");
// const path=require("path");
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require ("jsonwebtoken");
const User=require("./models/user");
const Exercise=require("./models/exercise");
const user = require("./models/user");

//mongoDb acts as database manager
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/language');
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connectin error:"));
db.once("open",async()=>{
    console.log("Database connected");
})

//server and routes are managed by express
const app=express();

//JSON string is converted to JSON object
app.use(express.json());
//pars the URL-encoded data with the querystring library
app.use(express.urlencoded({ extended: false }));

//allow cross-origion request service i.e. interacts with messages from different port
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))

 //it add new quiz in the database
 app.post('/new', async (req, res)=>{
    // console.log(req.body);
    try{
    const {language,question,option1,option2,level,correct}=req.body;
    const newex=new Exercise({
        language,question,option1,option2,level,correct
    }) 
    // console.log(newex)
    await newex.save();
    console.log(language);
    res.send("success");
}catch (err) {
    res.status(404).json({ message: err.message });
  }
});

//get request to send back quizes related to a particular language
// app.get('/assignment/:lang',async(req,res)=>{
//     try {
//         const { lang } = req.params;
//         const exercise = await Exercise.find({ language: lang}).exec();
//         res.send(exercise);
//       } catch (err) {
//         res.status(404).json({ message: err.message });
//       }
// })

//get request to send back data of a language sorted as per there score%
app.get('/:lang',async(req,res)=>{
    try{
        const {lang}=req.params;
        const data=await User.find({});
        if(lang=="English")
        (data).sort((a,b)=> (-a.English.marks/a.English.totalmarks+c.English.marks/b.English.totalmarks))

        if(lang=="German")
        (data).sort((a,b)=> (-a.German.marks/a.German.totalmarks+c.German.marks/b.German.totalmarks))

        if(lang=="Spanish")
        (data).sort((a,b)=> (-a.Spanish.marks/a.Spanish.totalmarks+c.Spanish.marks/b.Spanish.totalmarks))

        if(lang=="French")
        (data).sort((a,b)=> (-a.French.marks/a.French.totalmarks+c.French.marks/b.French.totalmarks))

        // console.log(data);
        res.send(data);
    }catch (err) {
        res.status(404).json({ message: err.message });
      }
})


//get request to send back quize related to a particular language according to there progress and past evalution
app.get('/assignment/:id/:lang/:level/:st',async(req,res)=>{
    try {
        const { lang,level,st,id} = req.params;
        const curruser=await user.findById(id)
        let exercise;
        let quiz;
        
        //calculates marks on the basis of level and adds any of 0,1,3,5 marks
        if(st!="null"){
        if(level=="Easy"){
            curruser.English.totalmarks+=1;
            if(st=="true"){
                curruser.English.accuracy++;
                curruser.English.marks+=1;
            }
        }

        if(level=="Medium"){
            curruser.English.totalmarks+=3;
            if(st=="true"){
                curruser.English.accuracy++;
                curruser.English.marks+=3;
            }
        }

        if(level=="Hard"){
            curruser.English.totalmarks+=5;
            if(st=="true"){
                curruser.English.marks+=5;
                curruser.English.accuracy++;
            }
        }
}

//logic for next quiz question for user
//if they answer easy then medium then hard until they finish all hard questions
//if they fail to answer hard question then medium then easy one until they fail to answeer all easy ones
//progess marks the amount of questions attempted in each leevls and add update it in user profile
        if(st=='null'){
            exercise = await Exercise.find({ language: lang, level:"Easy" }).exec();
            if(exercise.length<curruser.English.progress[0]){
                exercise= await Exercise.find({ language: lang, level:"Medium" }).exec();
            if(exercise.length<curruser.English.progress[1]){
                exercise= await Exercise.find({ language: lang, level:"Hard" }).exec();
                if(exercise.length<curruser.English.progress[2]){
                    quiz=[];
                }
                else{
                    quiz=exercise[curruser.English.progress[2]];
                    curruser.English.progress[2]++;
                }
            }
        }
        else{
            quiz=exercise[curruser.English.progress[0]];
                    curruser.English.progress[0]++;
        }
        }

        if(level=="Easy" && st=="true" ){
        exercise = await Exercise.find({ language: lang, level:"Medium" }).exec();
        if(exercise.length<curruser.English.progress[1]){
            exercise= await Exercise.find({ language: lang, level:"Hard" }).exec();
            if(exercise.length<curruser.English.progress[2]){
                quiz=[];
            }
            else{
                quiz=exercise[curruser.English.progress[2]];
                curruser.English.progress[2]++;
            }
        }
        else{
            quiz=exercise[curruser.English.progress[1]];
            curruser.English.progress[1]++;
        }
        }

        else if(level =='Medium' && st=="true"){
            exercise = await Exercise.find({ language: lang, level:"Hard" }).exec();
            if(exercise.length<curruser.English.progress[2]){
                quiz=[];
            }
            else{
                quiz=exercise[curruser.English.progress[2]];
                curruser.English.progress[2]++;
            }
        }

        else if(level =='Hard' && st=="true"){
            exercise = await Exercise.find({ language: lang, level:"Hard" }).exec();
            if(exercise.length<curruser.English.progress[2]){
                quiz=[];
            }
            else{
                quiz=exercise[curruser.English.progress[2]];
                curruser.English.progress[2]++;
            }
        }

        else if(level =='hard' && st=="false"){
            exercise = await Exercise.find({ language: lang, level:"Medium" }).exec();
            if(exercise.length<curruser.English.progress[1]){
                exercise= await Exercise.find({ language: lang, level:"Easy" }).exec();
                if(exercise.length<curruser.English.progress[0]){
                    quiz=[];
                }
                else{
                    quiz=exercise[curruser.English.progress[0]];
                    curruser.English.progress[0]++;
                }
            }
            else{
                quiz=exercise[curruser.English.progress[1]];
                curruser.English.progress[1]++;
            }
        }

        else if(level =='Medium' && st=="false"){
            exercise = await Exercise.find({ language: lang, level:"Easy" }).exec();
            if(exercise.length<curruser.English.progress[0]){
                quiz=[];
            }
            else{
                quiz=exercise[curruser.English.progress[0]];
                curruser.English.progress[0]++;
            }

        }

        else if(level =='Easy' && st=="false"){
            exercise = await Exercise.find({ language: lang, level:"Easy" }).exec();
            console.log(exercise.length,curruser.English.progress[0])
            if(exercise.length<curruser.English.progress[0]){
                quiz=[];
            }
            else{
                quiz=exercise[curruser.English.progress[0]];
                curruser.English.progress[0]++;
            }
        }

        else{
            quiz=[];
        }
        if(quiz!=[]){
            curruser.English.attempts++;
        }
        await user.findByIdAndUpdate(id,curruser);
        console.log(quiz)
        res.send(quiz);
      } catch (err) {
        res.status(404).json({ message: err.message });
      }
})

//get request to send a user profile data
app.get("/user/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const curruser=user.findById(id);
        // console.log(curruser)
        res.send(curruser);
    }
    catch (err) {
        res.status(404).json({ message: err.message });
      }
})

//post request to sign up a user by taking their data
app.post("/signup",async(req,res)=>{
    try{
      const{username,password,email}=req.body;
      const salt=await bcrypt.genSalt();
      const passwordHash=await bcrypt.hash(password,salt);
  
      const newuser=new User({
        username,email,password:passwordHash
      })
    //   console.log(newuser)
      const savedUser=await newuser.save();
    //   console.log(savedUser)
      const token=jwt.sign({id:savedUser._id},"secret");
      res.send({token,savedUser});
    }
    catch(err){
      res.send(err);
    }
  })

  //post request to authenticate user login 
app.post("/login",async(req,res)=>{
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
      console.log(user)
      const token = jwt.sign({ id: user._id }, "secret");
      // console.log(token)
      // delete user.password;
      res.status(200).json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  })

 app.listen(3000, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", 3000);
});

