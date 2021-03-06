const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { validateUserInput, validateLoginInput } = require("../../Utils/validators");
const { SECRET_KEY } = require("../../config");


async function generateToken(user){
  return await jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}
module.exports = {
  Mutation: {
    async login(_, {username, password}){
      const {errors, valid} = validateLoginInput(username, password)
      if(!valid){
        throw new UserInputError('Must not be empty', {errors})
      }
    
      const user = await User.findOne({username})
      if(!user){
         errors.general = 'User not found'
         throw new UserInputError('User not found', {errors})
      }
      const match = await bcrypt.compare(password, user.password)
      if(!match){
        errors.general = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', {errors})
      }
      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      const user = await User.findOne({ username });
      const { valid, errors } = validateUserInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email: email,
        username: username,
        password: password,
        created: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res)
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  
  },
};
