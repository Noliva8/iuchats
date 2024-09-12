const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../../controllers/userController');

// /api/users
// -----------
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
// ------------------
router.route('/:userId').get(getSingleUser);



// /api/users/:userId/thought
// -------------------------
router.route('/userId/thought').delete(deleteUser);





module.exports = router;
