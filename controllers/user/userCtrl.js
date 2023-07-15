const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const expressAsyncHandler = require("express-async-handler");

//Register a User
const userRegisterCtrl = expressAsyncHandler(async (req, res) => {
  // prevent duplicate registration of user
  const userFound = await User.findOne({ email: req.body.email });
  console.log(userFound);

  if (userFound) throw new Error("User already exists ");
  try {
    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

//Login user Controllers
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the user by email
  const userFound = await User.findOne({ email });
  //check if the password is correc match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//----------------------------------------------------------------
//fetch all users
//----------------------------------------------------------------
const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
};
