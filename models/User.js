const { Schema, model } = require('mongoose');

// Schema to create User model
// --------------------------

const userSchema = new Schema(
  {
    username:  {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },

    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],


    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual property `friendCounts` that retrieves the length of the user's friends array field on query.
// -----------------------------------------------------------------------------------------------

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });
  
 
// Initialize our User model
// -----------------------
const User = model('User', userSchema);

module.exports = User;
