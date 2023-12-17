const mongoose=require("mongoose");
const Schema=mongoose.Schema;

//schema for user with username ,email, password as required field .
//rest all data for languages are updated by their activity
const userSchema=new Schema({
    username:{
        type: String,
        required: true,
        min: 2,
        max: 50,
      },
      email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
      },
    password: {
        type: String,
        required: true,
        min: 5,
      },

      //each language has nested object of progress to store thir progress in each level of question 
      //with initial value as 0 for each level
      //marks, totalmarks,attempts,accuracy each with initial value of 0
      //this same schema holds for each of the four languages

    English:{
      progress:{
        type: [],
    default:[0,0,0]
    },
      marks:{
        type: Number,
        default: 0
      },
      totalmarks:{
        type: Number,
        default: 0
      },
      attempts:{
        type: Number,
        default: 0
      },
      accuracy:{
        type: Number,
        default: 0
      }
    },


    Spanish:{
      progress:{
        type: [],
    default:[0,0,0]
    },
      marks:{
        type: Number,
        default: 0
      },
      totalmarks:{
        type: Number,
        default: 0
      },
      attempts:{
        type: Number,
        default: 0
      },
      accuracy:{
        type: Number,
        default: 0
      }
    },


    German:{
      progress:{
        type: [],
    default:[0,0,0]
    },
      marks:{
        type: Number,
        default: 0
      },
      totalmarks:{
        type: Number,
        default: 0
      },
      attempts:{
        type: Number,
        default: 0
      },
      accuracy:{
        type: Number,
        default: 0
      }
    },


    French:{
      progress:{
        type: [],
    default:[0,0,0]
    },
      marks:{
        type: Number,
        default: 0
      },
      totalmarks:{
        type: Number,
        default: 0
      },
      attempts:{
        type: Number,
        default: 0
      },
      accuracy:{
        type: Number,
        default: 0
      }
    }

})

module.exports = mongoose.model('User', userSchema);
