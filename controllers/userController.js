const { User, Thought } = require('../models');

module.exports = {

  
    getUsers(req, res) {
        User.find()
        
          .then((users) => res.json(users))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          });
      },

   
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('o__v')
          .populate('thoughts')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          });
      },

    createUser(req, res) {
        User.create(req.body)
          .then((user) => res.json(user))
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },
    
    
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ 
                message: 'No user with that ID' 
              })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ 
            message: 'User and any of their thoughts are deleted' 
          }))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          });
      },

    
    updateUser(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID ' })
            : res.json(user)
        )
        .catch((err) => {
          console.log(err);
          res.status(500).json(err)
        });
    },

    
    
    addFollower(req, res) {
      User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { followers: req.params.followerId } },
      { runValidators: true, new: true }
      )
      .then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },

  
    unFollow(req, res) {
      User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { followers: req.params.followerId } },
      { runValidators: true, new: true }
      )
      .then((user) =>
          !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
  },


};