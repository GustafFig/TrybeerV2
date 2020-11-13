const { ObjectId } = require('mongodb');
const { connectTo } = require('./mongoConnection');

const createRoom = async (user1, user2) => connectTo('rooms')
  .then((coll) => coll.insertOne({ users: [user1, user2], messages: [] }));

const getUsersRoom = async ({ email }) => connectTo('rooms')
  .then((coll) => coll.findOne({ 'users.email': email }));

const saveMessage = async (room, user, message, time) => connectTo('rooms')
  .then((coll) => coll.updateOne(
    { _id: ObjectId(room) },
    { $push: { messages: { email: user.email, message, time } } },
  ));

const getRoomById = async (id) => connectTo('rooms')
  .then((coll) => coll.findOne({ _id: ObjectId(id) }));

const getAllRooms = async () => connectTo('rooms')
  .then((coll) => coll.find().toArray());

module.exports = {
  saveMessage,
  createRoom,
  getUsersRoom,
  getRoomById,
  getAllRooms,
};
