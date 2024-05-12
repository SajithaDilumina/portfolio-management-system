const express = require('express');
const router = express.Router();
const { loginUser,registeredUserCountsByDate, registerUser,getAllUsers,getUserById,updateUser,deleteUser,reportGeneration } = require("../controllers/userController");

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

// Get all users route
router.route('/users').get(getAllUsers);
router.get('/', getUserById);
router.put('/', updateUser);
router.delete('/', deleteUser);
router.get('/generate-report', reportGeneration);
router.get('/chart', registeredUserCountsByDate);


module.exports = router;