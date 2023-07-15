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
    console.log(error);
  }
});

//Login user Controllers
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //find the user by email
  const userFound = await User.findOne({ email });
  if (userFound) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

module.exports = {
  userRegisterCtrl,
  loginUserCtrl,
};
