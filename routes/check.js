const router = require("express").Router();
const verify = require("./verify");
router.get("/", verify, (req, res) => {
  res.send({
    title: "Show this if the user is verified",
  });
});

module.exports = router;
