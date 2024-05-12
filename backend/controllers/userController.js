const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET || 'jsecret', {
    expiresIn: '30d'
  })
}

const decodeJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET || 'jsecret')
}
const sendTokenResponse = async (res, user, message) => {
  const accessToken = generateToken(user);

  res.status(200).json({
    data: { user, access_token: accessToken },
    message,
  });
};

const loginUser = async (req, res) => {
  try {
    const query = { email: req.body.email.toString() };
    const user = await User.findOne(query);

    console.log(req.body.password);
    if (!user) {
      res.status(400).json({message:"User not found, please register first"});
    } else {
      const validated = await bcrypt.compare(req.body.password, user.password);
      if (!validated) {
        res.status(400).json("Wrong credentials");
      } else {
        const { password, ...others } = user._doc;
        console.log(others);
        sendTokenResponse(res, others, "successful");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};



const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Select all except the password field
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const getUserById = async (req, res) => {
  try {
    const userId = req.query.id; // Extract user ID from request parameters
    const user = await User.findById(userId).select('-password'); // Exclude password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.query.id; // Extract user ID from request parameters
    const updateData = req.body; // Extract updated data from request body

    // Update the user in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const  reportGeneration = async (req, res) => {
  try {
    // Total count of admins
    const adminCount = await User.countDocuments({ role: 'ADMIN' });

    // Total count of users
    const userCount = await User.countDocuments({ role: 'USER' });

    // Total count of users registered in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentUserCount = await User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } });
    const recentUsers = await User.find({ createdAt: { $gte: thirtyDaysAgo } }).select('-password');
    // Prepare the report data
    const report = {
      totalAdmins: adminCount,
      totalUsers: userCount,
      recentUserCount: recentUserCount,
      recentUsers:recentUsers
    };

    // Send the report as response
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

const registeredUserCountsByDate = async (req, res) => {
  try {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 7));

    // Generate an array of dates for the last 7 days
    const dateArray = Array.from({ length: 8 }, (_, index) => {
      const date = new Date(sevenDaysAgo);
      date.setDate(date.getDate() + index);
      return date;
    });

    // Convert the dateArray to an array of string dates in the format YYYY-MM-DD
    const dateStringArray = dateArray.map(date => date.toISOString().split('T')[0]);

    // Group users by registration date and count the number of registrations for each day
    const registrationCounts = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo } // Filter users created in the last 7 days
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      }
    ]);

    // Initialize an object to store the counts for each day
    const countsMap = {};
    dateStringArray.forEach(dateString => {
      countsMap[dateString] = 0; // Initialize count to 0 for each day
    });

    // Update the counts with the actual counts from the database
    registrationCounts.forEach(item => {
      countsMap[item._id] = item.count;
    });

    // Format the data into an array of objects with date and count properties
    const formattedData = dateStringArray.map(dateString => ({
      date: dateString,
      count: countsMap[dateString]
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

}

module.exports = { loginUser, registerUser, getAllUsers, getUserById, updateUser, deleteUser ,reportGeneration,registeredUserCountsByDate};
