const router = require("express").Router();
const user = require("../model/user");
const { registerValidation, loginValidation } = require("../validation");
const bycrpt = require("bcryptjs");
//VALIDATION

// const Joi = require("@hapi/joi");

// const schema = Joi.object({
//   name: Joi.string().min(6).required(),
//   email: Joi.string().min(6).required().email(),
//   password: Joi.string().min(6).required(),
// });

////REGISTER
router.post("/register", async (req, res) => {
  //VALIDATES DATA
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // IF USER EXIST

  const userExist = await user.findOne({ email: req.body.email });
  if (userExist) return res.status(400).send("userExist");

  //HASH PASSWORD
  const hash = await bycrpt.genSalt(10);
  const hashedPassword = await bycrpt.hash(req.body.password, hash);

  // CREATING NEW USER

  const data = new user({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await data.save();
    res.send(savedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

////LOGIN

router.post("/login", async (req, res) => {
  //LOGIN VALIDATION

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // IF USER DOESNT EXIST

  const userExist = await user.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("userDoesntExist");

  // CHECK PASSWORD
  console.log(userExist);
  const validPassword = await bycrpt.compare(
    req.body.password,
    userExist.password
  );
  if (!validPassword) return res.status(400).send("inValidPassword");

  const data = await new user({
    email: req.body.email,
    password: req.body.password,
  });

  try {
    res.send("Logged in");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
