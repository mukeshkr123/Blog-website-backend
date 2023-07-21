const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");
const validateMongoId = require("../../utils/validateMongodbID");

// Register a User
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User already exists");
  }

  try {
    const user = await User.create({ firstName, lastName, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login User Controller
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.isPasswordMatched(password))) {
    const { _id, firstName, lastName, profilePhoto, isAdmin } = user;

    res.json({
      _id,
      firstName,
      lastName,
      email,
      profilePhoto,
      isAdmin,
      token: generateToken(_id),
    });
  } else {
    res.status(401).json({ error: "Invalid login credentials" });
  }
});

// Fetch all Users
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Fetch User Details
const fetchUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongoId(id);

  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user details" });
  }
});

// Fetch User Profile Details
const fetchUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  validateMongoId(id);

  try {
    const userProfile = await User.findById(id);
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Update User Profile
const updateUserProfileCtrl = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const userProfile = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          bio: req.body.bio,
        },
      },
      { new: true }
    );

    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// Update Password
const updatePasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await user.isPasswordMatched(currentPassword);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect current password" });
    }

    user.password = newPassword;
    const updatedUser = await user.save();

    res.json({ message: "Password changed successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to change password" });
  }
});

// following
const followUserCtrl = expressAsyncHandler(async (req, res) => {
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if loginuser id aleready exists in the following
  const targetUser = await User.findById(followId);

  //check if already following
  const alreadyfollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyfollowing) throw new Error("you have already following this user");
  // find the user you want to follow and update its followers field
  await User.findByIdAndUpdate(followId, {
    $push: { followers: loginUserId },
  }),
    {
      new: true,
    };

  //2. find the login user and update its following field

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    {
      new: true,
    }
  );

  res.json("Followed User Successfully");
});

// unfollow the user
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unfollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unfollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    {
      new: true,
    }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unfollowId },
    },
    {
      new: true,
    }
  );
  res.json("You have successfully unfollowed this user");
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  fetchUserCtrl,
  fetchUserProfileCtrl,
  updateUserProfileCtrl,
  updatePasswordCtrl,
  followUserCtrl,
  unfollowUserCtrl,
};
