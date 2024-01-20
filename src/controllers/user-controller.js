const UserService = require("../services/user-service");
const userService = new UserService();
const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      message: "Successfully Created a new user",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(200).json({
      message: "Successfully signed in a user",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-acces-token"];
    const response = userService.isAuthenticated(token); // {email: "", id:"", iat:"", uat: ""} but suppose if user created a token for 1 day, and then deletes his account, then token should also not work --> more logic is involved so we'll write this logic in service layer

    return res.status(200).json({
      message: "User is authenticated and token is valid",
      data: response,
      success: true,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error,
    });
  }
};
module.exports = {
  create,
  signIn,
  isAuthenticated,
};
