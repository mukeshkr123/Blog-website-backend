const User = require("../../model/user/User");

//Register a User
const userRegisterCtrl = async (req, res) => {
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
};

module.exports = {
  userRegisterCtrl,
};
