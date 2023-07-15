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

module.exports = {
  userRegisterCtrl,
};
