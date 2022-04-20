const { Schema, model } = require('mongoose');
var { isEmail } = require('validator');

const userSchema = new Schema({
        
        username: { 
                type: String, 
                unique: true,  
                required: true,
                trim: true,
        },
        email: { 
                type: String, 
                unique: true, 
                required: true,
                validate: [ isEmail, 'Please provide a valid email.' ]
        },
        thoughts: [
                {
                        type: Schema.Types.ObjectId,
                        ref: 'Thought',

                },
         ],
        followers: [
                {
                        type: Schema.Types.ObjectId,
                        ref: 'User',

                },
        ]
},
        {
        toJSON: {
          virtuals: true,
        },
        }
);


userSchema.virtual('followerCount').get(function () {
        return this.followers.length;
    });


const User = model('User', userSchema);

const handleError = (err) => console.error(err);


module.exports = User;