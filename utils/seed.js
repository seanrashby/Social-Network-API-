const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { users, thoughts } = require('./data.json');


connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Access Granted');

  
  await User.deleteMany({});

  
  await Thought.deleteMany({});



  
  await User.collection.insertMany(users);

  
  await Thought.collection.insertMany(thoughts);

 
  await User.collection.findOneAndUpdate(
    { _id: users[0]._id },
    { $addToSet: { followers: users[1]._id, thoughts: thoughts[0]._id } }
  );
  await User.collection.findOneAndUpdate(
    { _id: users[1]._id },
    { $addToSet: { followers: users[0]._id, thoughts: thoughts[1]._id } }
  );


 
  console.table(users);
  console.table(thoughts);
  console.info('Data Seeded');
  process.exit(0);
});