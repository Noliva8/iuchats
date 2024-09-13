const connection = require('../config/connection');
const { User, Thought } = require('../models');
const thoughtData = require('./thoughtData.json');
const userData = require('./userData.json');



connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

    // Delete the collections if they exist
    let thoughtsData = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsData.length) {
      await connection.dropCollection('thoughts');
    }

   let usersData = await connection.db.listCollections({ name: 'users' }).toArray();
   console.log(usersData)
    if (usersData.length) {
      await connection.dropCollection('users');
    }
     const seedingData = async () => {
    await Thought.insertMany(thoughtData);
    await User.insertMany(userData);

 } ;

 seedingData()
    })


// Add thoughs and users to the collection and await the results
// ---------------------------------
//  const seedingData = async () => {
//     await Thought.create(thoughtData);
//     await User.create(userData);

//  } ;

//  seedingData()
     
 