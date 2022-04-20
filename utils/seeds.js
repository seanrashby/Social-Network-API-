const connection = require('../config/connection');
const { Post, User } = require('../models');
const getRandomName = require('./data');

console.log(getRandomName());
connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Post.deleteMany({});
  await User.deleteMany({});