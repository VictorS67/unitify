const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectID;
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
        userName: {
            type: String,
            equired: true
        },
        email: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        },
        avatarImage: {
            // dont know
        },
        // championSig:{
        //     type:String,
        //     required: true
        // },
        // backgroundImage:{
        //     //type unknown
        //     required:false
        // },
        // fontSize:{
        //     type:Number,
        //     required:false
        // },
        //Palette etcs unkown
    }
)

const rankSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        rankNumber: {
            type: Number,
            required: true
        },
        likeNUmber: {
            type: Number,
            required: true
        },
        timeStamp: {
            type: Date,
            required: true
        }
    }
)

const mileSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        miles: {
            type: Number,
            required: true
        },
        timeStamp: {
            type: Date,
            required: true
        }
    }
)

const transportationSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        transportationKind: {
            type: String,
            required: true
        },
        GPS: {
            type: String,
            required: true
        },
        speed: {
            type: Number,
            required: true
        },
        timeStamp: {
            type: Date,
            required: true
        }
    }
)

const questionnaireSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            required: true
        },
        //If username unique, we can also save username here
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        },
        timeStamp: {
            type: Date,
            required: true
        }
    }
)



// https://mongoosejs.com/docs/geojson.html
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const locationSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true
    },
    location: {
        type: pointSchema,
        required: true
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updatedAt'
        }
    }

);

module.exports = {
    userSchema: userSchema,
    locationSchema: locationSchema, 
    rankSchema: rankSchema,
    mileSchema: mileSchema, 
    transportationSchema: transportationSchema, 
    questionnaireSchema: questionnaireSchema
}
