const { User, Thought } = require('../models');
const { Types } = require('mongoose');

module.exports = {

  
    getThoughts(req, res) {
        Thought.find()
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },

    
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('o__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    
   
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { thoughts: thought._id } },
              { new: true }
          );
          })

          .then((user) =>
            !user
              ? res.status(404).json({
                message: 'Received thought, but no user found'
              })
            : res.json('Thought Created')
          )
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : User.deleteMany({ _id: { $in: thought.reaction } })
          )
          .then(() => res.json({ message: 'Thought and any reactions associated are now deleted' }))
          .catch((err) => {
            console.log(err);
            res.status(500).json(err)
          });
      },

    
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(course)
          )
          .catch((err) => res.status(500).json(err));
      },

      
      addReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Oops -- No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

      
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'Oops -- No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },

};