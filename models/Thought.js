const { Schema, Types, model } = require('mongoose');


const reactionSchema = new Schema({
       
        reactionId: {
                type: Schema.Types.ObjectId,
                default: () => new Types.objectId(),

        },

        reactionBody: {
                type: String,
                required: true,
                maxlength: [280, "Keep it simple! Max reaction is 280 characters"],

        },
        username:  { 
                type: String, 
                required: true 
        },
        createdAt: { 
                type: Date, 
                default: Date.now,
                get: function () {
                        return this.toLocaleString();
                },
        },

},     
{
        id: false,
}
);




const thoughtSchema = new Schema({
        thoughtText: { 
                type: String, 
                required: true ,
                minlength: [1, "No thoughts entered - get your thoughts added! "],
                maxlength: [280, "Keep it simple! Max thought is 280 characters"],
        },
        createdAt: { 
                type: Date, 
                default: Date.now,
                get: function () {
                        return this.toLocaleString();
                },
        },
        username:  { 
                type: String, 
                required: true 
        },
        reactions: [ reactionSchema ],
       },
       {
        toJSON: {
            virtuals: true,
        },
        id: false,
      }       
       );
        

       thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
      });
        
       const Thought = model('Thought', thoughtSchema);


       const handleError = (err) => console.error(err);
        
        
       module.exports = Thought;