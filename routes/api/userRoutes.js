const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  // deleteUserWithAssociatedThoughts,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

                       // api/users
// ------------------------------------------------------------------

// /api/users
// -----------
router.route('/').get(getUsers).post(createUser);


// /api/users/:userId
// ------------------
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// --------------------------------------------------------------------------------------------------------



// /api/users/:userId/thought
// -------------------------
// router.route('/:userId/thought').delete(deleteUserWithAssociatedThoughts);


// /api/users/:userId/friends/:friendId
// -----------------------------------

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;
