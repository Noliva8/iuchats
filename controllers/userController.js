const { User, Thought } = require('../models');

module.exports = {

  // Function to get all users
  // --------------------------
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate('friends')
          .populate('thoughts')
      res.json(users);

    } catch (err) {
      res.status(500).json(err);
    }
  },

   // create a new user
  // ------------------
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Function to get a single user
  // ----------------------------
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
         .populate('friends')
          .populate('thoughts');
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },



  // function to update the user
  // -------------------------
   async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
 

  // Delete a user 
  // -------------

 async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });
           await Thought.deleteMany({ _id: { $in: user.thoughts } });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json({ message: 'User deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // // Delete a user and associated thought
  // // -------------------------------------
  // async deleteUserWithAssociatedThoughts(req, res) {
  //   try {
  //     const user = await User.findOneAndDelete({ _id: req.params.userId });

  //     if (!user) {
  //       return res.status(404).json({ message: 'No user with that ID' });
  //     }

  //     await Thought.deleteMany({ _id: { $in: user.thoughts } });
  //     res.json({ message: 'User and associated thoughts deleted!' })
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  //  Function to add a new friend to a user's friend list
  // ---------------------------------------------------

  async addFriend(req, res){
    try{
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

    res.json(user);

    }
     
    catch(err){
      res.status(500).json(err);
    }
     
  },

  // function to remove friend on user
  // --------------------------------
async deleteFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId},
        { $pull: { friends:req.params.friendId }  },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res.status(404).json({ message: 'No friend with this ID!' });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },




};


