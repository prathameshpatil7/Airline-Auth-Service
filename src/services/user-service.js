const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserRepository = require("../repository/user-repository");
const { JWT_KEY } = require("../config/serverConfig");
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log("Something went wrong on service layer");
      throw error;
    }
  }

  async signIn(data) {
    try {
      // step 1-> fetch the user using the email
      const user = await this.userRepository.getByEmail(data.email);
      if (user) {
        // step 2-> if user founds, then compare incoming plain password with stores encrypted password
        let isValidPassword = this.checkPassword(data.password, user.password);
        if (!isValidPassword) {
          throw { error: "Invalid Password" };
        } else {
          // step 3-> if passwords match, then create a token and send it to the user
          const token = this.createToken({
            email: user.email,
            id: user.id,
          });
          return token;
        }
      } else {
        throw { error: "User not found" };
      }
    } catch (error) {
      console.log("Something went wrong in signing in user");
      throw error;
    }
  }

  createToken(user) {
    try {
      let token = jwt.sign(user, JWT_KEY, { expiresIn: "1d" }); //expires in 24 hours
      return token;
    } catch (error) {
      console.log("Something went wrong in token creation");
      throw error;
    }
  }

  verifyToken(token) {
    try {
      let response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log("Something went wrong in token verification");
      throw error;
    }
  }

  checkPassword(userInputPlainpassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainpassword, encryptedPassword);
    } catch (error) {
      console.log("Something went wrong in password verification");
      throw error;
    }
  }
}

module.exports = UserService;
