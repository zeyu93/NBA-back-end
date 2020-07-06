const User = require("../Schemas/Users.js");
const schema = require("../validation")
const Joi = require('@hapi/joi');

const handleRegister = async (req, res, bcrypt) => {
  // const { error } = Joi.validate(req.body, schema);
  const { error }= schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { email, password } = req.body;
  console.log(email,password)
  const emailExist = await User.exists({ email });
  console.log(emailExist)
  if (emailExist) {
    return res.status(400).json({ message: "Email already exist" });
  }

  const hash = await bcrypt.hashSync(password);
  const newUser = new User({
    email,
    password: hash
  });


  newUser.save().then(data => {
    res.json(data);
  });
};

module.exports = {
  handleRegister: handleRegister
};
