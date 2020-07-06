const User = require("../Schemas/Users.js");
const Joi = require("@hapi/joi");
const schema = {
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string().required().password
};

const handleSignin = async (req, res, bcrypt) => {
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const { email, password } = req.body;
  const user = await User.find({ email });
  if (!user) {
    return res.status(400).json({ message: "Email doesn't exist" });
  }
  //check for password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "password incorrect" });
};

module.exports = {
  handleSignin: handleSignin
};
