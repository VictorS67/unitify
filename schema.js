const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema(
//     {
//         username: {
//             type: String,
//             required: true
//         }
//     }
// )

const userSchema = new mongoose.Schema( 
    {
        userid:{
        type:ObjectId,
        required: true
        },
        userName:{
            type:String,
            equired: true
        },
        email:{
            type: String,
            required: true
        },
        avatarImage:{
            // dont know
        },
        championSig:{
            type:String,
            required: true
        },
        backgroundImage:{
            //type unknown
            required:false
        },
        fontSize:{
            type:Number,
            required:false
        },
        //Palette etcs unkown
    }
)

const rankSchema = new mongoose.Schema(
    {
        userId:{
            type:ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        rankNumber:{
            type:Number,
            required: true
        },
        likeNUmber:{
            type:Number,
            required:true
        },
        timeStamp:{
            type:Date,
            required:true
        }
    }
)

const mileSchema = new mongoose.Schema(
    {
        userId:{
            type:ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        miles:{
            type:Number,
            required:true
        },
        timeStamp:{
            type:Date,
            required:true
        }
    }
)

const transportationSchema = new mongoose.Schema(
    {
        userId:{
            type:ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        transportationKind:{
            type: String,
            required:true
        },
        GPS:{
            type:String,
            required:true
        },
        speed:{
            type: number,
            required: true
        },
        timeStamp:{
                    type:Date,
                    required:true
         }
    }
)

const questionnaireSchema = new mongoose.Schema(
    {
        userId:{
            type:ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        timeStamp:{
            type:Date,
            required:true
        }
    }
)

module.exports = {
    userSchema: userSchema
    }
   